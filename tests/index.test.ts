import {ColorsPalette, ConsoleType, stylize} from '../src';
import * as rememerFnCall from '../src/common/rememerFnCall';
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
  
  expect(argsDecorator(textString).toString()).toBe(expectedArgs.toString());
});

test('multiple initialise do not fail', async () => {
  const consoleInfoSpy = jest.spyOn(rememerFnCall, 'rememberCall');
  
  stylize(ConsoleType.Log, {
    bgColor  : ColorsPalette.magenta,
    fontColor: ColorsPalette.yellow,
  });
  
  await stylize(ConsoleType.Log, {
    bgColor  : ColorsPalette.red,
    fontColor: ColorsPalette.green,
  }).then(() => expect(consoleInfoSpy).toBeCalledTimes(2));
});
