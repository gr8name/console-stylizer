import staticData from './staticData';
import {ColorsPalette} from './types/colorsPalette';
import {ConfigProps} from './types/configType';
import ConsoleType from './types/consoleType';

function setProperty(property: ConfigProps, consoleType: ConsoleType, value: any) {
  console.log('setProperty');
  if (value) {
    const config = staticData.consoleConfig.get(consoleType);
    
    if (config && config[property]) {
      config[property] = value;
    } else {
      throw new Error('No such property in config found');
    }
  } else {
    throw new Error('No value for config update specified');
  }
}

export const setFontColor = (consoleType: ConsoleType, color: ColorsPalette) => {
  setProperty(ConfigProps.fontColor, consoleType, color);
};

export const setBgColor = (consoleType: ConsoleType, color: ColorsPalette) => {
  setProperty(ConfigProps.bgColor, consoleType, color);
};
