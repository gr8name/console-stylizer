import getEnv from './defineEnv';
import {Color, ColorsPalette} from './types/colorsPalette';
import {ConfigProps, ConfigType} from './types/configType';
import ConsoleType from './types/consoleType';

let consoleConfig: ConfigType = null;

/**
 * Function for initialising and updating consoleConfig
 */
const setStylizeConfig = (consoleType: ConsoleType, bgColor: Color, fontColor: Color): ConfigType => {
  if (!consoleConfig) {
    consoleConfig = new Map();
  }
  
  consoleConfig.set(consoleType, {
    bgColor,
    fontColor
  });

  return consoleConfig;
};

/**
 * Function for setting color properties in consoleConfig
 */
const setProperty = (property: ConfigProps, consoleType: ConsoleType, value: any) => {
  if (value) {
    const config = consoleConfig.get(consoleType);
    
    if (config && config[property]) {
      config[property] = value;
    } else {
      throw new Error('No such property in config found');
    }
  } else {
    throw new Error('No value for config update specified');
  }
};

/**
 * Function that changes font color  in stylizerConfig
 */
export const setFontColor = (consoleType: ConsoleType, color: Color) => {
  setProperty(ConfigProps.fontColor, consoleType, color);
};

/**
 * Function that changes font background color in stylizerConfig
 */
export const setBgColor = (consoleType: ConsoleType, color: Color) => {
  setProperty(ConfigProps.bgColor, consoleType, color);
};

/**
 * Function that initialise styles for selected logger
 */
export const init = function(
  consoleType: ConsoleType,
  fontColor?: Color,
  backgroundColor?: Color,
  showStylizationNotification?: boolean
) {
  const logger = console[consoleType];
  const environment = getEnv();
  const moduleSpecifier = `./${environment}/index`;

  console.log(moduleSpecifier, 'path');
  
  import(moduleSpecifier).then((module) => {
    const {getConsoleDecorator, backgroundColors, fontColors} = module.default;
    
    // TODO: remove default colors
    // tslint:disable-next-line:max-line-length
    setStylizeConfig(consoleType, backgroundColor || backgroundColors.get(ColorsPalette.magenta), fontColor || fontColors.get(ColorsPalette.yellow));

    const decorator = getConsoleDecorator(logger, consoleType, consoleConfig);
    
    if (logger && decorator) {
      console[consoleType] = decorator;
  
      consoleConfig.get(consoleType).initialLogger = logger;
  
      if (showStylizationNotification) {
        console.log(`console.${consoleType} is stylised\n`);
      }
    } else {
      throw new Error('Styling Error');
    }
    
    console.warn('styled init');
    
    return logger;
  }).catch((e) => {
    console.log('!!! Unhandled error !!!');
    console.log(e);
  });
};
