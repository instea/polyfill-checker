function monkeyPatchBuiltins() {
  // patch functions
  const origFunction = Array.prototype.find
  Array.prototype.find = function patchedBuiltin(...args) {
    console.warn('Using Array.prototype.find')
    return origFunction.call(this, ...args)
  }

  // patch objects
  const handler = {
    construct(target, argumentsList, newTarget) {
      console.warn('Using Promise constructor')
      return new target(...argumentsList)
    },
  }
  Promise = new Proxy(Promise, handler)
}

export function initialize() {
  console.log('=== Initializing Polyfill checker ===')
  monkeyPatchBuiltins()
}
