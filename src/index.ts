import {backgroundColors, fontColors} from './colors';
import {Console, init, setBgColor, setFontColor} from './initialyser';

// init(Console.Warn);
//
// console.warn('warning body');
//
// setFontColor(Console.Warn, fontColors.yellow);
// setBgColor(Console.Warn, backgroundColors.cyan);
// console.warn('works?');
//
// setBgColor(Console.Warn, backgroundColors.red);
// console.warn({hi: 'there'});

export {
  Console,
  backgroundColors,
  fontColors,
  init,
  setBgColor,
  setFontColor,
};
