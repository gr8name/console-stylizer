/**
 * Function for printing stylized test message.
 */
exports.tstMsg = function () {
  console.log(
    '%c test message',
    'font-weight: bold;' +
      'font-size: 50px;' +
      'color: red;' +
      'text-shadow: 3px 3px 0 rgb(217,31,38), 6px 6px 0 rgb(245,221,8), 9px 9px 0 rgb(5,148,68), 12px 12px 0 rgb(42,21,113);'
  );
};
