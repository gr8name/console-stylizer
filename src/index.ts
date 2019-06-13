import {backgroundColors, fontColors, IColor} from './colors';
import getEnv, {Environment} from './defineEnv';

/**
 * Config used for console stylizing
 */
const config = {
  bgColor: backgroundColors.red,
  fontColor: fontColors.magenta,
};

/**
 * Function used for console stylizing in node environment
 */
const nodeConsoleDecorator = (
  logger: (message?: any, ...othrParams: any[]) => void,
  env: Environment.Browser|Environment.Node
) => function() {
  const resetCode = '\x1b[0m';
  const bgColor = config.bgColor[env];
  const fontColor = config.fontColor[env];
  
  logger.call(this, bgColor + fontColor + 'Warning!!!(extra text) ' + resetCode + getEnv());
  logger.apply(this, Array.prototype.slice.call(arguments));
};

/**
 * Function used for console stylizing in browser environment
 */
const browserConsoleDecorator = (
  logger: (message?: any, ...otherParams: any[]) => void,
  env: Environment.Browser | Environment.Node
) => function() {
  const bgColor: string   = config.bgColor[env];
  const fontColor: string = config.fontColor[env];
  
  logger.call(this, '%c' + 'Warning!!!(extra text)', bgColor + fontColor, getEnv());
  logger.apply(this, Array.prototype.slice.call(arguments));
};

/**
 * Function that changes font color  in config
 */
const setFontColor = (color: IColor) => {
  if (color) {
    config.fontColor = color;
  }
};

/**
 * Function that changes font background color in config
 */
const setBgColor = (color: IColor) => {
  if (color) {
    config.bgColor = color;
  }
};

/**
 * Function that initialise styles for console.warn logger
 */
export const initWarn = function() {
  const warn = console.warn;
  
  const env = getEnv();
  
  if (env === Environment.Node) {
    console.warn = nodeConsoleDecorator(warn, env);
  } else if (env === Environment.Browser) {
    console.warn = browserConsoleDecorator(warn, env);
  }
};

initWarn();

console.warn('warning body');
setBgColor(backgroundColors.cyan);
console.warn('works?');
setFontColor(fontColors.yellow);
console.warn({hi: 'there'});

// exports.tstMsg = tstMsg;
