import {browserStyleCode, resetCode} from './colors';
import {config} from './config';
import {ConsoleType} from './consoleType';
import {Environment} from './environment';

export type Logger = (message?: any, ...otherParams: any[]) => void;

/**
 * Function used for console stylizing in node environment
 */
export const nodeConsoleDecorator = (logger: Logger, consoleType: ConsoleType) => function(...args: any[]) {
    const env = Environment.Node;
    const bgColor = config[consoleType].bgColor[env];
    const fontColor = config[consoleType].fontColor[env];
    
    logger.apply(this, Array.prototype.slice.call([bgColor, fontColor, ...args, resetCode]));
  };

/**
 * Function used for console stylizing in browser environment
 */
export const browserConsoleDecorator = (logger: Logger, consoleType: ConsoleType) => function(...args: any[]) {
    const env = Environment.Browser;
    const bgColor: string   = config[consoleType].bgColor[env];
    const fontColor: string = config[consoleType].fontColor[env];
    
    const [message, ...restArgs] = args;
    
    const textMessage = typeof message === 'object' ? JSON.stringify(message) : message;
    logger.apply(this, Array.prototype.slice.call([browserStyleCode + textMessage, bgColor + fontColor, ...restArgs]));
  };
