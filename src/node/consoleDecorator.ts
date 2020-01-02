import {ConsoleConfigType} from '../types/configType';
import {backgroundColors, fontColors, resetCode} from './colors';

export type Logger = (message?: any, ...otherParams: any[]) => void;

const decoratedArgsGenerator = (config: ConsoleConfigType) => {
  // TODO: cash result with same config
  const bgColor: string   = backgroundColors.get(config.bgColor);
  const fontColor: string = fontColors.get(config.fontColor);
  
  return function(...args: any[]) {
    return Array.prototype.slice.call([bgColor, fontColor, ...args, resetCode]);
  };
};

export default decoratedArgsGenerator;
