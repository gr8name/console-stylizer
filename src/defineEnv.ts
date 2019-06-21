/*
  Possible environment types
 */
export enum Environment {
  Browser = 'browser',
  Node = 'node',
  Unknown = 'unknown'
}

/*
  Logs current environment type to console
 */
export const envNotification = (env: Environment) => console.log('running under ' + env.toString());

/*
  Function that defines code environment (node|browser|unknown)
 */
const getEnv = (): Environment => {
  const isBrowser = new Function(
    'try {return this===window;}catch(e){ return false;}');
  const isNode = new Function(
    'try {return this===global;}catch(e){return false;}');
  
  let env: Environment = null;
  
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
