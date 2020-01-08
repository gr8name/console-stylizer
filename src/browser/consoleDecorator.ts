import {ConsoleConfigType} from '../types/configType';
import {backgroundColors, fontColors} from './colors';
import {browserStyleCode} from './colors';

const decoratedArgsGenerator = (config: ConsoleConfigType) => {
  // TODO: cash result with same config
  const bgColor: string   = config.bgColor ? backgroundColors.get(config.bgColor) : '';
  const fontColor: string = config.fontColor ? fontColors.get(config.fontColor) : '';
  
  return function(...args: any[]) {
    const [message, ...restArgs] = args;
    const textMessage = typeof message === 'object' ? JSON.stringify(message) : message;
    
    return Array.prototype.slice.call([browserStyleCode + textMessage, bgColor + fontColor, ...restArgs]);
  };
};

export default decoratedArgsGenerator;
