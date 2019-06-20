export interface IColor {
  node: string;
  browser: string;
}

export interface IColorsPalette {
  [propName: string]: IColor;
}

export const resetCode = '\x1b[0m';

export const fontColors: IColorsPalette = {
  black: {
    browser: 'color: black;',
    node: '\x1b[30m'
  },
  blue: {
    browser: 'color: blue;',
    node: '\x1b[34m'
  },
  cyan: {
    browser: 'color: cyan;',
    node   : '\x1b[36m'
  },
  default: {
    browser: '',
    node   : resetCode
  },
  green: {
    browser: 'color: green;',
    node   : '\x1b[32m'
  },
  magenta: {
    browser: 'color: magenta;',
    node   : '\x1b[35m'
  },
  red: {
    browser: 'color: red;',
    node: '\x1b[31m'
  },
  white: {
    browser: 'color: white;',
    node   : '\x1b[37m'
  },
  yellow: {
    browser: 'color: yellow;',
    node   : '\x1b[33m'
  }
};

export const backgroundColors: IColorsPalette = {
  black  : {
    browser: 'background-color: black;',
    node   : '\x1b[40m'
  },
  blue   : {
    browser: 'background-color: blue;',
    node   : '\x1b[44m'
  },
  cyan   : {
    browser: 'background-color: cyan;',
    node   : '\x1b[46m'
  },
  default: {
    browser: '',
    node   : resetCode
  },
  green  : {
    browser: 'background-color: green;',
    node   : '\x1b[42m'
  },
  magenta: {
    browser: 'background-color: magenta;',
    node   : '\x1b[45m'
  },
  red    : {
    browser: 'background-color: red;',
    node   : '\x1b[41m'
  },
  white  : {
    browser: 'background-color: white;',
    node   : '\x1b[47m'
  },
  yellow : {
    browser: 'background-color: yellow;',
    node   : '\x1b[43m'
  }
};

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
