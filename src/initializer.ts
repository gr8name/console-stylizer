import {IColor} from './colors';
import {config} from './config';
import {
  browserConsoleDecorator,
  Logger,
  nodeConsoleDecorator
} from './consoleDecorators';
import {ConsoleType} from './consoleType';
import getEnv from './defineEnv';
import {Environment} from './environment';

export const getDecoratorFn = (logger: Logger, consoleType: ConsoleType, environment: Environment) => {
  const stringEnv = environment.toString();
  
  if (stringEnv.startsWith(Environment.Browser.toString())) {
    return browserConsoleDecorator(logger, consoleType);
  } else if (stringEnv.startsWith(Environment.Node.toString())) {
    return nodeConsoleDecorator(logger, consoleType);
  }
};

/**
 * Function that changes font color  in stylizerConfig
 */
export const setFontColor = (consoleType: ConsoleType, color: IColor) => {
  if (color) {
    config[consoleType].fontColor = color;
  }
};

/**
 * Function that changes font background color in stylizerConfig
 */
export const setBgColor = (consoleType: ConsoleType, color: IColor) => {
  if (color) {
    config[consoleType].bgColor = color;
  }
};

/**
 * Function that initialise styles for selected logger
 */
export const init = function(consoleType: ConsoleType, showStylizationNotification?: boolean) {
  const logger = console[consoleType];
  const environment = getEnv();
  const decorator = getDecoratorFn(logger, consoleType, environment);
  
  if (showStylizationNotification) {
    console.log(`console.${consoleType} is stylised`);
    console.log();
  }

  if (logger && decorator) {
    console[consoleType] = decorator;
    return decorator;
  }

  return null;
};
