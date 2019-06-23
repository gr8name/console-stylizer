/*
  Logs current environment type to console
 */
import {Environment} from './environment';

export function envNotification(env: string) { console.log('running under ' + env.toString()); }

/*
  Function that defines code environment (node|browser|unknown)
 */
const getEnv = (): string => {
  const isBrowser = new Function(
    'try {return this===window;}catch(e){ return false;}');
  const isNode = new Function(
    'try {return this===global;}catch(e){return false;}');
  
  let env: string = null;
  
  if (isBrowser()) {
    env = Environment.Browser;
  } else if (isNode()) {
    env = Environment.Node;
  } else {
    env = Environment.Unknown;
  }
  
  // envNotification(env);
  return env;
};

export default getEnv;
