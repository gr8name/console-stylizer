import {ConsoleConfigType, Logger} from '../types/configType';
import ConsoleType from '../types/consoleType';
import EnvironmentType from '../types/environmentType';
import getEnv from './defineEnv';
import {applyCachedFuncCalls, rememberCall} from './rememerFnCall';
import staticData from './staticData';

function consoleDecorator(logger: Logger, config: ConsoleConfigType, decoratedArgsGenerator: any) {
  const argsDecorator = decoratedArgsGenerator(config);
  staticData.argsGenerator = decoratedArgsGenerator;
  
  return function(...args: any[]) {
    const decoratedArgs = argsDecorator(...args);
    
    logger.apply(this, decoratedArgs);
    
    return decoratedArgs;
  };
}

function setStylizeConfig(consoleType: ConsoleType, updateConfig: ConsoleConfigType): ConsoleConfigType {
  staticData.consoleConfig.set(consoleType, updateConfig);

  return updateConfig;
}

export const init = function(
  consoleType: ConsoleType,
  consoleConfig: ConsoleConfigType,
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
  
  const environment: EnvironmentType     = getEnv();
  const stylizeFn = (module: any) => {
    const {decoratedArgsGenerator} = module.default;
  
    const config: ConsoleConfigType = setStylizeConfig(consoleType, {initialLogger, ...consoleConfig});
  
    const decorator = consoleDecorator(initialLogger, config, decoratedArgsGenerator);
  
    if (initialLogger && decorator) {
      console[consoleType] = decorator;
    } else {
      throw new Error('Styling Error');
    }
  
    applyCachedFuncCalls(callsID, console[consoleType]);
  
    return initialLogger;
  };
  const stylizeErrFn = (e: Error) => {
    console.log('!!! Unhandled error !!!');
    console.log(e);
  };
  
  const importPromise: Promise<any> = environment === EnvironmentType.Node
    ? import( '../browser/index.js').then(stylizeFn).catch(stylizeErrFn)
    : import( '../browser/index.js').then(stylizeFn).catch(stylizeErrFn);
  
  importPromise.then().catch((e) => {
    console.log('!!! Unhandled error !!!');
    console.log(e);
  });
};

export const cachedInit = (
  consoleType: ConsoleType,
  consoleConfig: ConsoleConfigType,
): Promise<any> | null => {
  // @ts-ignore
  if (console[consoleType].isWrapper) {
    console[consoleType] = rememberCall();
    // @ts-ignore
    const callsID = console[consoleType].callsID;
  
    return new Promise((resolve) => {
      const timerId = setInterval(() => {
        // @ts-ignore
        if (!console[consoleType].isWrapper) {
          clearTimeout(timerId);
          const logger = staticData.consoleConfig.get(consoleType);
          init(
            consoleType,
            consoleConfig,
            logger && logger.initialLogger,
            callsID
          );
          resolve();
        }
      }, 10);
    });
  } else {
    init(consoleType, consoleConfig);
    return Promise.resolve();
  }
};
