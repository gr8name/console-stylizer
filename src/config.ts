import getEnv from './defineEnv';
import {Color, ColorsPalette} from './types/colorsPalette';
import ConfigType from './types/configType';
import ConsoleType from './types/consoleType';

let consoleConfig: ConfigType = null;

const initialiseStylizeConfig = (defaultbgColor: Color, defaultFontColor: Color): ConfigType => {
  return Object.keys(ConsoleType).reduce(
    (initialConfig: any, consoleType: string) => {
      return {
        ...initialConfig,
        [consoleType.toString().toLowerCase()]: {
          bgColor  : defaultbgColor,
          fontColor: defaultFontColor
        }
      };
    },
    {}
  ) as ConfigType;
};

/**
 * Function that changes font color  in stylizerConfig
 */
export const setFontColor = (consoleType: ConsoleType, color: Color) => {
  if (color) {
    consoleConfig[consoleType].fontColor = color;
  }
};

/**
 * Function that changes font background color in stylizerConfig
 */
export const setBgColor = (consoleType: ConsoleType, color: Color) => {
  if (color) {
    consoleConfig[consoleType].bgColor = color;
  }
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
  // let isResolved        = false;
  console.log(moduleSpecifier, 'path');
  
  (async function getFirstUser() {
    try {
      const module = await import(moduleSpecifier);
      
      const {consoleDecorator, backgroundColors, fontColors} = module.default;
      
      consoleConfig = initialiseStylizeConfig(
        backgroundColor || backgroundColors.get(ColorsPalette.magenta),
        fontColor || fontColors.get(ColorsPalette.yellow)
      );
      
      const decorator = consoleDecorator(logger, consoleType, consoleConfig);
      
      if (logger && decorator) {
        console[consoleType] = decorator;
        
        if (showStylizationNotification) {
          console.log(`console.${consoleType} is stylised\n`);
        }
      }
      // isResolved = true;
      console.warn('styled init');
      // return decorator;
    } catch (err) {
      console.log('!!! Unhandled promise rejection: Module name not resolved');
    }
  })();
};
