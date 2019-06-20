import {backgroundColors, fontColors, IColor, resetCode} from './colors';
import getEnv, {Environment} from './defineEnv';

type Logger = (message?: any, ...otherParams: any[]) => void;
type Config = { [propName in Console]: {
    bgColor: IColor,
    fontColor: IColor
  }; };

/**
 * Enum used for selecting console logger function
 */
export enum Console {
  Error = 'error',
  Warn = 'warn',
  Log = 'log'
}

const initialiseStylizeConfig = (): Config => {
  return Object.keys(Console).reduce(
    (initialConfig: Config, consoleType: Console) => {
      return {
        ...initialConfig,
        [consoleType.toString().toLowerCase()]: {
          bgColor  : backgroundColors.default,
          fontColor: fontColors.default
        }
      };
    },
    {}
  ) as Config;
};

/**
 * Config used for console stylizing
 * @type {Config}
 */
const config: Config = initialiseStylizeConfig();

/**
 * Function used for console stylizing in node environment
 */
const nodeConsoleDecorator = (logger: Logger, consoleType: Console) => function() {
  const env = Environment.Node;
  const bgColor = config[consoleType].bgColor[env];
  const fontColor = config[consoleType].fontColor[env];
  
  logger.call(this, bgColor + fontColor + 'Warning!!!(extra text) ' + resetCode /*+ getEnv()*/);
  logger.apply(this, Array.prototype.slice.call(arguments));
};

/**
 * Function used for console stylizing in browser environment
 */
const browserConsoleDecorator = (logger: Logger, consoleType: Console) => function() {
  const env = Environment.Browser;
  const bgColor: string   = config[consoleType].bgColor[env];
  const fontColor: string = config[consoleType].fontColor[env];
  
  logger.call(this, '%c' + 'Warning!!!(extra text)', bgColor + fontColor/*, getEnv()*/);
  logger.apply(this, Array.prototype.slice.call(arguments));
};

/**
 * Function that changes font color  in stylizerConfig
 */
export const setFontColor = (consoleType: Console, color: IColor) => {
  if (color) {
    config[consoleType].fontColor = color;
  }
};

/**
 * Function that changes font background color in stylizerConfig
 */
export const setBgColor = (consoleType: Console, color: IColor) => {
  if (color) {
    config[consoleType].bgColor = color;
  }
};

/**
 * Function that initialise styles for selected logger
 */
export const init = function(consoleType: Console) {
  const logger = console[consoleType];
  const env = getEnv();
  console.log(`console.${consoleType} is stylised`);
  console.log();
  
  if (logger && env !== Environment.Unknown) {
    
    switch (env) {
      case Environment.Browser:
        console[consoleType] = browserConsoleDecorator(logger, consoleType); break;
      case Environment.Node:
        console[consoleType] = nodeConsoleDecorator(logger, consoleType); break;
    }
  }
};
