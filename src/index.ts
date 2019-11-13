import {backgroundColors, fontColors} from './browser/colors';
import {init, setBgColor, setFontColor} from './config';
import ConsoleType from './types/consoleType';

// console.warn('warning body');
init(ConsoleType.Warn, null, null, true);
//
// setFontColor(ConsoleType.Warn, fontColors.yellow);
// setBgColor(ConsoleType.Warn, backgroundColors.cyan);
console.warn('works?');
// console.warn('yes');

// setBgColor(ConsoleType.Warn, backgroundColors.red);
// console.warn({hi: 'there'});

export {
  ConsoleType,
  backgroundColors,
  fontColors,
  init,
  setBgColor,
  setFontColor,
};
