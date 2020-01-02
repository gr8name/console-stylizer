import {ColorsPalette} from '../types/colorsPalette';

export const resetCode = '\x1b[0m';
export const browserStyleCode = '%c';

export const fontColors: Map<ColorsPalette, string> = new Map( [
  [ColorsPalette.white, '\x1b[30m'],
  [ColorsPalette.blue, '\x1b[34m'],
  [ColorsPalette.cyan, '\x1b[36m'],
  [ColorsPalette.default, ''],
  [ColorsPalette.green, '\x1b[32m'],
  [ColorsPalette.magenta, '\x1b[35m'],
  [ColorsPalette.red, '\x1b[31m'],
  [ColorsPalette.black, '\x1b[37m'],
  [ColorsPalette.yellow, '\x1b[33m']
]);

export const backgroundColors: Map<ColorsPalette, string> = new Map([
  [ColorsPalette.black, '\x1b[40m'],
  [ColorsPalette.blue, '\x1b[44m'],
  [ColorsPalette.cyan, '\x1b[46m'],
  [ColorsPalette.default, ''],
  [ColorsPalette.green, '\x1b[42m'],
  [ColorsPalette.magenta, '\x1b[45m'],
  [ColorsPalette.red, '\x1b[41m'],
  [ColorsPalette.white, '\x1b[47m'],
  [ColorsPalette.yellow, '\x1b[43m']
]);

/*
Reset = "\x1b[0m"
Bright = "\x1b[1m"
Dim = "\x1b[2m"
Underscore = "\x1b[4m"
Blink = "\x1b[5m"
Reverse = "\x1b[7m"
Hidden = "\x1b[8m"

FgBlack = "\x1b[30m"
FgRed = "\x1b[31m"
FgGreen = "\x1b[32m"
FgYellow = "\x1b[33m"
FgBlue = "\x1b[34m"
FgMagenta = "\x1b[35m"
FgCyan = "\x1b[36m"
FgWhite = "\x1b[37m"

BgBlack = "\x1b[40m"
BgRed = "\x1b[41m"
BgGreen = "\x1b[42m"
BgYellow = "\x1b[43m"
BgBlue = "\x1b[44m"
BgMagenta = "\x1b[45m"
BgCyan = "\x1b[46m"
BgWhite = "\x1b[47m"
 */
