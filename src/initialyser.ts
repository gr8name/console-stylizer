import {IColor, resetCode} from './colors';
import {config} from './config';
import {ConsoleType} from './consoleType';
import getEnv from './defineEnv';
import {Environment} from './environment';

type Logger = (message?: any, ...otherParams: any[]) => void;

/**
 * Function used for console stylizing in node environment
 */
const nodeConsoleDecorator = (logger: Logger, consoleType: ConsoleType) => function(...args: any[]) {
  const env = Environment.Node;
  const bgColor = config[consoleType].bgColor[env];
  const fontColor = config[consoleType].fontColor[env];

  logger.apply(this, Array.prototype.slice.call([bgColor, fontColor, ...args, resetCode]));
};

/**
 * Function used for console stylizing in browser environment
 */
const browserConsoleDecorator = (logger: Logger, consoleType: ConsoleType) => function(...args: any[]) {
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
export const setFontColor = (consoleType: ConsoleType, color: IColor) => {
  if (color) {
    config[consoleType].fontColor = color;
  }
};

/**
 * Function that changes font background color in stylizerConfig
 */
export const setBgColor = (consoleType: ConsoleType, color: IColor) => {
  if (color) {
    config[consoleType].bgColor = color;
  }
};

/**
 * Function that initialise styles for selected logger
 */
export const init = function(consoleType: ConsoleType, showStylizationNotification?: boolean) {
  const logger = console[consoleType];
  const env = getEnv();
  
  if (showStylizationNotification) {
    // envNotification(env);
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
