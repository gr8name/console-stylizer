import {backgroundColors, fontColors} from './colors';
import getEnv, {Environment} from './defineEnv';

/**
 * Function for printing stylized test message.
 */
// @ts-ignore
// export const tstMsg = () => {
//   getEnv();
//
//   console.log(
//     '%c test message',
//     'font-weight: bold;' +
//       'font-size: 50px;' +
//       'color: red;' +
//       'text-shadow: ' +
//       '3px 3px 0 rgb(217,31,38), ' +
//       '6px 6px 0 rgb(245,221,8), ' +
//       '9px 9px 0 rgb(5,148,68), ' +
//       '12px 12px 0 rgb(42,21,113);'
//   );
//
//   console.log('\x1b[36m%s\x1b[0m', 'I am cyan');
//   console.log('\x1b[33m%s\x1b[0m', 'I am yellow');
// };
//
// tstMsg();

const config = {
  bgColor: backgroundColors.red,
  fontColor: fontColors.magenta,
};

const nodeConsoleDecorator = (logger, env) => function() {
  const resetCode = '\x1b[0m';
  const bgColor = config.bgColor[env];
  const fontColor = config.fontColor[env];
  
  logger.call(this, bgColor + fontColor + 'Warning!!!(extra text) ' + resetCode + getEnv());
  logger.apply(this, Array.prototype.slice.call(arguments));
};

const browserConsoleDecorator = (logger, env) => function() {
  const bgColor   = config.bgColor[env];
  const fontColor = config.fontColor[env];
  
  logger.call(this, '%c' + 'Warning!!!(extra text)', bgColor + fontColor, getEnv());
  logger.apply(this, Array.prototype.slice.call(arguments));
};

export const initWarn = function() {
  const warn     = console.warn;
  
  const env = getEnv();
  
  if (env === Environment.Node) {
    console.warn = nodeConsoleDecorator(warn, env);
  } else if (env === Environment.Browser) {
    console.warn = browserConsoleDecorator(warn, env);
  }
};

initWarn();

console.warn('warning body');
console.warn('works?');
console.warn({hi: 'there'});

// exports.tstMsg = tstMsg;
