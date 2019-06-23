import {backgroundColors, fontColors} from './colors';
import {ConsoleType} from './consoleType';
import {init, setBgColor, setFontColor} from './initializer';

// console.warn('warning body');
// init(ConsoleType.Warn, true);
//
// setFontColor(ConsoleType.Warn, fontColors.yellow);
// setBgColor(ConsoleType.Warn, backgroundColors.cyan);
// console.warn('works?');
// console.warn('yes');
//
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
