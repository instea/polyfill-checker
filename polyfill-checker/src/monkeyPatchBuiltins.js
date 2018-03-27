import { get } from './utils'

const omittedNames = ['Function', 'prototype', 'length', 'NaN', 'Infinity']

export default function monkeyPatchBuiltins(data, config) {
  const { logger, minBrowsers } = config
  const loggedKeys = {}
  let initialized = false

  function logOnce(key, ...args) {
    if (loggedKeys[key] || !initialized) {
      return
    }
    logger.error(...args)
    loggedKeys[key] = true
  }

  function patchConstructor(path, name) {
    const fullPath = path.concat(name)
    const fullName = fullPath.join('.')
    logger.debug('patching constructor: ' + fullName)
    const parent = get(window, path)
    const handler = {
      construct(target, argumentsList) {
        logOnce(fullName, 'Using ' + fullName)
        return new target(...argumentsList)
      },
      get(target, property) {
        logOnce(fullName, 'Using ' + fullName)
        return target[property]
      },
    }
    parent[name] = new Proxy(parent[name], handler)
  }

  function patchMethod(path, name) {
    const fullPath = path.concat(name)
    const fullName = fullPath.join('.')
    logger.debug('patching method: ' + fullName)
    const parent = get(window, path)
    const fn = get(window, fullPath)
    const isPrototype = path[path.length - 1] === 'prototype'
    parent[name] = function patchedBuiltin(...args) {
      logOnce(fullName, 'Using ' + fullName)
      const thisArg = isPrototype ? this : parent
      return fn.apply(thisArg, args)
    }
  }

  function patchProperty() {
    // TODO: patch getter
  }

  function checkNeeded(compat, fullName) {
    if (!compat || !compat.support) {
      logger.warn('missing compatibility data, skipping: ' + fullName)
      return false
    }
    return Object.keys(compat.support).some(browserKey => {
      const descriptor = compat.support[browserKey]
      if (Array.isArray(descriptor)) {
        logger.warn('unsupported descriptor, skipping:', fullName, descriptor)
        return false
      }
      const suppVersion = descriptor.version_added
      const minVersion = minBrowsers[browserKey]
      if (!minVersion || suppVersion === true || suppVersion === null) {
        return false
      }
      if (suppVersion === false) {
        return true
      }
      return suppVersion > minVersion
    })
  }

  function patchBuiltins(name, path, data) {
    if (omittedNames.includes(name)) {
      logger.debug('omitted: ' + name)
      return
    }
    const parent = get(window, path)
    if (parent.prototype && name in parent.prototype) {
      // preffer prototype methods
      path.push('prototype')
    }
    if (path[path.length - 1] === name) {
      // sometimes parent contains child with the same name with descriptors
      // e.g. Promise
      path.pop()
    }
    const nextPath = path.concat(name)
    const fullName = nextPath.join('.')
    let subject
    try {
      subject = get(window, nextPath)
    } catch (e) {
      logger.debug('forbidden: ' + fullName)
      return
    }
    if (typeof subject === 'undefined') {
      logger.debug('skipping: ' + fullName)
      return
    }
    if (checkNeeded(data.__compat, fullName)) {
      if (typeof subject === 'function' && /^[A-Z]/.test(name)) {
        patchConstructor(path, name)
      } else if (typeof subject === 'function') {
        patchMethod(path, name)
      } else {
        patchProperty(path, name)
      }
    }
    Object.keys(data)
      .filter(n => n !== '__compat')
      .forEach(n => {
        patchBuiltins(n, nextPath, data[n])
      })
  }

  function initialize() {
    Object.keys(data).forEach(n => patchBuiltins(n, [], data[n]))
  }

  initialize()
  initialized = true
}
