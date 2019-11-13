import {Color} from './colorsPalette';
import ConsoleType from './consoleType';

type ConfigType = {
  [propName in ConsoleType]: {
    bgColor: Color,
    fontColor: Color
  };
};

export default ConfigType;
