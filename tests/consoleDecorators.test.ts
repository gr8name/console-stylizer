import {
  backgroundColors,
  browserStyleCode,
  fontColors,
  resetCode
} from '../src/colors';
import {
  browserConsoleDecorator,
  nodeConsoleDecorator
} from '../src/consoleDecorators';
import {ConsoleType} from '../src/consoleType';
import {setBgColor, setFontColor} from '../src/initializer';

test('node console is stylized', () => {
  const fontColor = fontColors.yellow;
  const bgColor = backgroundColors.cyan;
  const message = 'decorated test message';
  
  const consoleSpy = console.log = jest.fn(console.log);
  
  const decoratedConsole = nodeConsoleDecorator(consoleSpy, ConsoleType.Log);
  
  setFontColor(ConsoleType.Log, fontColor);
  setBgColor(ConsoleType.Log, bgColor);
  decoratedConsole(message);
  
  expect(consoleSpy).toBeCalled();
  expect(consoleSpy).toBeCalledWith(bgColor.node, fontColor.node, message, resetCode);
});

test('browser console is stylized', () => {
  const fontColor = fontColors.yellow;
  const bgColor = backgroundColors.cyan;
  const message = 'decorated test message';
  
  const consoleSpy = console.log = jest.fn(console.log);
  
  const decoratedConsole = browserConsoleDecorator(consoleSpy, ConsoleType.Log);
  
  setFontColor(ConsoleType.Log, fontColor);
  setBgColor(ConsoleType.Log, bgColor);
  decoratedConsole(message);
  
  expect(consoleSpy).toBeCalled();
  expect(consoleSpy).toBeCalledWith(browserStyleCode + message, bgColor.browser + fontColor.browser);
});
