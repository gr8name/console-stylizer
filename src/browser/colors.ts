import {ColorsPalette} from '../types/colorsPalette';

export const resetCode = '\x1b[0m';
export const browserStyleCode = '%c';

export const fontColors: Map<ColorsPalette, string> = new Map([
  [ColorsPalette.black, 'color: black;'],
  [ColorsPalette.blue, 'color: blue;'],
  [ColorsPalette.cyan, 'color: cyan;'],
  [ColorsPalette.default, ''],
  [ColorsPalette.green, 'color: green;'],
  [ColorsPalette.magenta, 'color: magenta;'],
  [ColorsPalette.red, 'color: red;'],
  [ColorsPalette.white, 'color: white;'],
  [ColorsPalette.yellow, 'color: yellow;'],
]);

export const backgroundColors: Map<ColorsPalette, string> = new Map([
  [ColorsPalette.black,   'background-color: black;'],
  [ColorsPalette.blue,    'background-color: blue;'],
  [ColorsPalette.cyan,    'background-color: cyan;'],
  [ColorsPalette.default, ''],
  [ColorsPalette.green,   'background-color: green;'],
  [ColorsPalette.magenta, 'background-color: magenta;'],
  [ColorsPalette.red,     'background-color: red;'],
  [ColorsPalette.white,    'background-color: white;'],
  [ColorsPalette.yellow,  'background-color: yellow;']
]);
