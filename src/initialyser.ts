import {backgroundColors, fontColors, IColor, resetCode} from './colors';
import getEnv, {Environment, envNotification} from './defineEnv';

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
const nodeConsoleDecorator = (logger: Logger, consoleType: Console) => function(...args: any[]) {
  const env = Environment.Node;
  const bgColor = config[consoleType].bgColor[env];
  const fontColor = config[consoleType].fontColor[env];

  logger.apply(this, Array.prototype.slice.call([bgColor, fontColor, ...args, resetCode]));
};

/**
 * Function used for console stylizing in browser environment
 */
const browserConsoleDecorator = (logger: Logger, consoleType: Console) => function(...args: any[]) {
  const env = Environment.Browser;
  const bgColor: string   = config[consoleType].bgColor[env];
  const fontColor: string = config[consoleType].fontColor[env];
  
  const [message, ...restArgs] = args;
  
  const textMessage = typeof message === 'object' ? JSON.stringify(message) : message;
  logger.apply(this, Array.prototype.slice.call(['%c' + textMessage, bgColor + fontColor, ...restArgs]));
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
export const init = function(consoleType: Console, showStylizationNotification?: boolean) {
  const logger = console[consoleType];
  const env = getEnv();
  
  if (showStylizationNotification) {
    envNotification(env);
    console.log(`console.${consoleType} is stylised`);
    console.log();
  }
  
  if (logger && env !== Environment.Unknown) {
    
    switch (env) {
      case Environment.Browser:
        console[consoleType] = browserConsoleDecorator(logger, consoleType); break;
      case Environment.Node:
        console[consoleType] = nodeConsoleDecorator(logger, consoleType); break;
    }
  }
};
