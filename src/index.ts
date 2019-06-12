import getEnv from './defineEnv';

/**
 * Function for printing stylized test message.
 */
// @ts-ignore
export const tstMsg = () => {
  getEnv();
  
  console.log(
    '%c test message',
    'font-weight: bold;' +
      'font-size: 50px;' +
      'color: red;' +
      'text-shadow: ' +
      '3px 3px 0 rgb(217,31,38), ' +
      '6px 6px 0 rgb(245,221,8), ' +
      '9px 9px 0 rgb(5,148,68), ' +
      '12px 12px 0 rgb(42,21,113);'
  );
  
  console.log('\x1b[36m%s\x1b[0m', 'I am cyan');
  console.log('\x1b[33m%s\x1b[0m', 'I am yellow');
};

tstMsg();
// exports.tstMsg = tstMsg;

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
