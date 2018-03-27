import { get } from './utils'

export function makePatchers({ onConstructor, onMethod, logger }) {
  function patchConstructor(path, name, data) {
    const fullPath = path.concat(name)
    const featureName = fullPath.join('.')
    logger.debug('patching constructor: ' + featureName)
    const parent = get(window, path)
    const handler = {
      construct(target, argumentsList) {
        onConstructor(featureName, data)
        return new target(...argumentsList)
      },
      get(target, property) {
        onConstructor(featureName, data)
        return target[property]
      },
    }
    parent[name] = new Proxy(parent[name], handler)
  }

  function patchMethod(path, name, data) {
    const fullPath = path.concat(name)
    const featureName = fullPath.join('.')
    logger.debug('patching method: ' + featureName)
    const parent = get(window, path)
    const fn = get(window, fullPath)
    const isPrototype = path[path.length - 1] === 'prototype'
    parent[name] = function patchedBuiltin(...args) {
      onMethod(featureName, data)
      const thisArg = isPrototype ? this : parent
      return fn.apply(thisArg, args)
    }
  }

  function patchProperty() {
    // TODO: patch getter
  }

  return { patchConstructor, patchMethod, patchProperty }
}
