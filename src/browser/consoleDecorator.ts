import {backgroundColors, fontColors} from '../node/colors';
import {ConsoleConfigType} from '../types/ConfigType';
import {browserStyleCode} from './colors';

export type Logger = (message?: any, ...otherParams: any[]) => void;

/**
 * Function used for console stylizing in browser environment
 */
export const browserConsoleDecorator = (
  logger: Logger,
  config: ConsoleConfigType
) => function(...args: any[]) {
  const bgColor: string   = backgroundColors.get(config.bgColor);
  const fontColor: string = fontColors.get(config.fontColor);
  
  const [message, ...restArgs] = args;
  
  const textMessage = typeof message === 'object' ? JSON.stringify(message) : message;
  
  logger.apply(
    this,
    Array.prototype.slice.call([
                                 browserStyleCode + textMessage,
                                 bgColor + fontColor,
                                 ...restArgs
                               ])
  );
};

export default browserConsoleDecorator;
