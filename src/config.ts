import {applyCachedFuncCalls, rememberCall} from './rememerFnCall';
import staticData from './staticData';
import {ConsoleConfigType, Logger} from './types/configType';
import ConsoleType from './types/consoleType';

function consoleDecorator(logger: Logger, config: ConsoleConfigType, decoratedArgsGenerator: any) {
  const argsDecorator = decoratedArgsGenerator(config);
  staticData.argsGenerator = decoratedArgsGenerator;
  
  return function(...args: any[]) {
    const decoratedArgs = argsDecorator(...args);
    
    logger.apply(this, decoratedArgs);
  };
}

function setStylizeConfig(consoleType: ConsoleType, updateConfig: ConsoleConfigType): ConsoleConfigType {
  staticData.consoleConfig.set(consoleType, updateConfig);

  return updateConfig;
}

export const init = function(
  consoleType: ConsoleType,
  consoleConfig: ConsoleConfigType,
  showStylizationNotification?: boolean,
  otherLogger?: Logger,
  otherCallsID?: number
) {
  const initialLogger = otherLogger || console[consoleType];
  let callsID = otherCallsID;
  if (!otherCallsID) {
    console[consoleType] = rememberCall();
    // @ts-ignore
    callsID = console[consoleType].callsID;
  }

  import(staticData.moduleSpecifier).then((module) => {
    const {decoratedArgsGenerator} = module.default;
    
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
  
    applyCachedFuncCalls(callsID, console[consoleType]);
    
    return initialLogger;
  }).catch((e) => {
    console.log('!!! Unhandled error !!!');
    console.log(e);
  });
};

export const cachedInit = (
  consoleType: ConsoleType,
  consoleConfig: ConsoleConfigType,
  showStylizationNotification?: boolean
) => {
  // @ts-ignore
  if (console[consoleType].isWrapper) {
    console[consoleType] = rememberCall();
    // @ts-ignore
    const callsID = console[consoleType].callsID;
    
    const timerId = setInterval(() => {
      // @ts-ignore
      if (!console[consoleType].isWrapper) {
        clearTimeout(timerId);
        const logger = staticData.consoleConfig.get(consoleType);
        init(consoleType, consoleConfig, showStylizationNotification, logger && logger.initialLogger, callsID);
      }
    }, 10);
  } else {
    init(consoleType, consoleConfig, showStylizationNotification);
  }
};
