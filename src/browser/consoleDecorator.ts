import {ConsoleConfigType} from '../types/configType';
import {backgroundColors, fontColors} from './colors';
import {browserStyleCode} from './colors';

const decoratedArgsGenerator = (config: ConsoleConfigType) => {
  // TODO: cash result with same config
  const bgColor: string   = backgroundColors.get(config.bgColor);
  const fontColor: string = fontColors.get(config.fontColor);
  
  return function(...args: any[]) {
    console.log({args});
    const [message, ...restArgs] = args;
    const textMessage = typeof message === 'object' ? JSON.stringify(message) : message;
    console.log({message, restArgs, bgColor, fontColor});
    return Array.prototype.slice.call([browserStyleCode + textMessage, bgColor + fontColor, ...restArgs]);
  };
};

export default decoratedArgsGenerator;
