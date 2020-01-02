export const callStack: any[] = [];

export function rememberCall() {
  return function(...args: any) { // return wrapper fn
    callStack.push({context: this, args});
  };
}
