import ConfigType from '../types/configType';
import ConsoleType from '../types/consoleType';
import {resetCode} from './colors';

export type Logger = (message?: any, ...otherParams: any[]) => void;

/**
 * Function used for console stylizing in node environment
 */
const nodeConsoleDecorator = (
  logger: Logger,
  consoleType: ConsoleType,
  config: ConfigType
) => function(...args: any[]) {
  const bgColor   = config[consoleType].bgColor;
  const fontColor = config[consoleType].fontColor;
  
  Promise.resolve().then(() => {
    logger.apply(
      this,
      Array.prototype.slice.call([bgColor, fontColor, ...args, resetCode])
    );
  });
};

export default nodeConsoleDecorator;
