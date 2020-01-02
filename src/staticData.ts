import getEnv from './defineEnv';
import {ConfigType} from './types/configType';
import EnvironmentType from './types/environmentType';

class StaticData {
  public moduleSpecifier: string;
  public argsGenerator: null;
  public consoleConfig: ConfigType;
  
  private readonly environment: EnvironmentType;
  
  constructor() {
    this.environment           = getEnv();
    this.moduleSpecifier       = `./${this.environment}/index`;
    
    this.consoleConfig = new Map();
    this.argsGenerator = null;
  }
}

export default new StaticData();
