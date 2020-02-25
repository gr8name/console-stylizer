import {ColorsPalette, ConsoleType, stylize} from '../src';
import {backgroundColors, fontColors, resetCode} from '../src/node/colors';
import decoratedArgsGenerator from '../src/node/consoleDecorator';

test('initialise console in node', () => {
  const textString = 'some text';
  
  const config = {
    bgColor  : ColorsPalette.magenta,
    fontColor: ColorsPalette.yellow,
  };
  
  const argsDecorator = decoratedArgsGenerator(config);

  stylize(ConsoleType.Log, config);
  
  const expectedArgs = [
    backgroundColors.get(ColorsPalette.magenta).toString(),
    fontColors.get(ColorsPalette.yellow).toString(),
    textString.toString(),
    resetCode.toString()
  ];
  
  expect(argsDecorator(textString)).toBe(expectedArgs.toString());
});

test('multiple initialise do not fail', () => {
  // @ts-ignore
  const spy = jest.spyOn(stylize, stylize);
  
  stylize(ConsoleType.Log, {
    bgColor  : ColorsPalette.magenta,
    fontColor: ColorsPalette.yellow,
  });
  
  stylize(ConsoleType.Log, {
    bgColor  : ColorsPalette.red,
    fontColor: ColorsPalette.green,
  });
  
  expect(spy).toBeCalledTimes(2);
});
