import {init} from './config';
import {setBgColor, setFontColor} from './propertySetters';
import {ColorsPalette} from './types/colorsPalette';
import ConsoleType from './types/consoleType';

console.warn('warning body');

init(ConsoleType.Warn, {bgColor  : ColorsPalette.magenta, fontColor: ColorsPalette.yellow}, true);

console.warn('works?');

// init(ConsoleType.Warn, {bgColor: ColorsPalette.magenta, fontColor: ColorsPalette.red}, true);

console.warn({hi: 'there'});

export {
  ConsoleType,
  ColorsPalette,
  init,
  setBgColor,
  setFontColor,
};
