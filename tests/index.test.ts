import {fontColors} from '../src/colors';
import {ConsoleType} from '../src/consoleType';
import {init, setFontColor} from '../src/initialyser';

test('console is stylized', () => {
  const consoleSpy = console.log = jest.fn();
  init(ConsoleType.Log);
  
  setFontColor(ConsoleType.Log, fontColors.yellow);
  console.log('test message');
  
  // const calls = consoleSpy.mock.calls;

  expect(consoleSpy).toHaveBeenCalledTimes(2);
});
