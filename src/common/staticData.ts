import {ConfigType} from '../types/configType';

class StaticData {
  public argsGenerator: null;
  public consoleConfig: ConfigType;
  
  constructor() {
    this.consoleConfig = new Map();
    this.argsGenerator = null;
  }
}

export default new StaticData();
