import {Color} from '../types/colorsPalette';
import {ConfigType} from '../types/ConfigType';
import ConsoleType from '../types/consoleType';
import {browserStyleCode} from './colors';

export type Logger = (message?: any, ...otherParams: any[]) => void;

/**
 * Function used for console stylizing in browser environment
 */
export const browserConsoleDecorator = (
  logger: Logger,
  consoleType: ConsoleType,
  config: ConfigType
) => function(...args: any[]) {
  const bgColor: Color = config.get(consoleType).bgColor;
  const fontColor: Color = config.get(consoleType).fontColor;
  
  const [message, ...restArgs] = args;
  
  const textMessage = typeof message === 'object' ? JSON.stringify(message) : message;
  
  logger.apply(
    this,
    Array.prototype.slice.call([
                                 browserStyleCode + textMessage,
                                 bgColor.toString() + fontColor.toString(),
                                 ...restArgs
                               ])
  );
};

export default browserConsoleDecorator;
