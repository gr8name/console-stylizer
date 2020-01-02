import {callStack, rememberCall} from './rememerFnCall';
import staticData from './staticData';
import {ConsoleConfigType, Logger} from './types/configType';
import ConsoleType from './types/consoleType';

function consoleDecorator(
  logger: Logger,
  config: ConsoleConfigType,
  decoratedArgsGenerator: any
) {
  const argsDecorator = decoratedArgsGenerator(config);
  staticData.argsGenerator = decoratedArgsGenerator;
  
  return function(...args: any[]) {
    const decoratedArgs = argsDecorator(...args);
    
    logger.apply(
      this,
      decoratedArgs
    );
  };
}

function setStylizeConfig(consoleType: ConsoleType, updateConfig: ConsoleConfigType): ConsoleConfigType {
  staticData.consoleConfig.set(consoleType, updateConfig);

  return updateConfig;
}

export const init = function(
  consoleType: ConsoleType,
  consoleConfig: ConsoleConfigType,
  showStylizationNotification?: boolean
) {
  const initialLogger = console[consoleType];
  console[consoleType] = rememberCall();

  import(staticData.moduleSpecifier).then((module) => {
    const {decoratedArgsGenerator} = module.default;
    
    // TODO: remove default config
    const config: ConsoleConfigType = setStylizeConfig(consoleType, {initialLogger, ...consoleConfig});
    
    const decorator = consoleDecorator(initialLogger, config, decoratedArgsGenerator);
    
    if (initialLogger && decorator) {
      console[consoleType] = decorator;
  
      if (showStylizationNotification) {
        // TODO: fix stylised notification (call initial logger for console.log)
        console.log(`console.${consoleType} is stylised\n`);
      }
    } else {
      throw new Error('Styling Error');
    }
    
    console.warn('styled init');
    
    callStack.forEach((call: any) => {
      console[consoleType].apply(call.context, call.args);
    });
    
    return initialLogger;
  }).catch((e) => {
    console.log('!!! Unhandled error !!!');
    console.log(e);
  });
};
