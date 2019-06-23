import {nodeConsoleDecorator} from '../src/consoleDecorators';
import {ConsoleType} from '../src/consoleType';
import {init} from '../src/initializer';

test('initialise console in node', () => {
  const decorator = init(ConsoleType.Warn, true);
  const decoratedConsole = nodeConsoleDecorator(console.warn, ConsoleType.Warn);
  
  expect(decorator).toBeInstanceOf(Function);
  expect(decorator('test string')).toEqual(decoratedConsole('test string'));
});
