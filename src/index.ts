import {cachedInit} from './config';
import {setBgColor, setFontColor} from './propertySetters';
import {ColorsPalette} from './types/colorsPalette';
import ConsoleType from './types/consoleType';

cachedInit(ConsoleType.Warn, {bgColor  : ColorsPalette.magenta, fontColor: ColorsPalette.yellow});

console.warn('works?');

cachedInit(ConsoleType.Warn, {bgColor: ColorsPalette.yellow, fontColor: ColorsPalette.magenta});

console.warn({hi: 'there'});

export {
  ConsoleType,
  ColorsPalette,
  cachedInit as init,
  setBgColor,
  setFontColor,
};
