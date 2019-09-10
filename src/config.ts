import {backgroundColors, fontColors, IColor} from './colors';
import {ConsoleType} from './consoleType';

type Config = {
  [propName in ConsoleType]: {
    bgColor: IColor,
    fontColor: IColor
  };
};

const initialiseStylizeConfig = (): Config => {
  return Object.keys(ConsoleType).reduce(
    (initialConfig: any, consoleType: string) => {
      return {
        ...initialConfig,
        [consoleType.toString().toLowerCase()]: {
          bgColor  : backgroundColors.default,
          fontColor: fontColors.default
        }
      };
    },
    {}
  ) as Config;
};

/**
 * Config used for console stylizing
 * @type {Config}
 */
export const config = initialiseStylizeConfig();
