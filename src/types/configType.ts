import {ColorsPalette} from './colorsPalette';
import ConsoleType from './consoleType';

type Logger = (message?: any, ...optionalParams: any[]) => void;

enum ConfigProps {
  bgColor = 'bgColor',
  fontColor   = 'fontColor'
}

interface ConsoleConfigType {
  [ConfigProps.bgColor]?: ColorsPalette;
  [ConfigProps.fontColor]?: ColorsPalette;
  initialLogger?: Logger;
}

interface ConfigType extends Map <ConsoleType, ConsoleConfigType> {}

export {ConfigProps, ConsoleConfigType, ConfigType, Logger};
