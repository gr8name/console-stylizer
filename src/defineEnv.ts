/*
  Logs current environment type to console
 */
import {Environment} from './environment';

export function envNotification(env: string) { console.log('running under ' + env.toString()); }

/*
  Function that defines code environment (node|browser|unknown)
 */
const getEnv = (): Environment => {
  const isBrowser = new Function(
    'try {return this===window;}catch(e){ return false;}');
  const isNode = new Function(
    'try {return this===global;}catch(e){return false;}');
  
  if (isBrowser()) {
    return  Environment.Browser;
  } else if (isNode()) {
    return Environment.Node;
  } else {
    return Environment.Unknown;
  }
};

export default getEnv;
