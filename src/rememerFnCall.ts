const callStackMap: Map<any, any> = new Map();
let callID: number = 0;

export function rememberCall() {
  const callStack: object[] = [];
  
  const wrapper = function(...args: any) { // return wrapper fn
    callStack.push({context: this, args});
  };
  
  callStackMap.set(++callID, callStack);
  wrapper.callsID = callID;
  wrapper.isWrapper = true;
  return wrapper;
}

export function applyCachedFuncCalls(callsID: number, func: any) {
  const callStack = callStackMap.get(callsID);

  callStack.forEach((call: any) => {
    func.apply(call.context, call.args);
  });
  
  callStackMap.delete(callsID);
}
