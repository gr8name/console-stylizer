import EnvironmentType from '../types/environmentType';

/*
  Logs current environment type to console
 */
export function envNotification(env: string) { console.log('running under ' + env.toString()); }

/*
  Function that defines code environment (node|browser|unknown)
 */
const getEnv = (): EnvironmentType => {
  const isBrowser = new Function(
    'try {return this===window;}catch(e){ return false;}');
  const isNode = new Function(
    'try {return this===global;}catch(e){return false;}');
  
  if (isBrowser()) {
    return  EnvironmentType.Browser;
  } else if (isNode()) {
    return EnvironmentType.Node;
  } else {
    return EnvironmentType.Unknown;
  }
};

export default getEnv;
