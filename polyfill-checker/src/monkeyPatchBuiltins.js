import { makeSupportChecker } from './supportChecker'
import { makePatchers } from './patchers'
import { get } from './utils'

const omittedNames = ['Function', 'prototype', 'length', 'NaN', 'Infinity']

export default function monkeyPatchBuiltins(data, config) {
  const { logger, minBrowsers } = config
  const loggedUsages = {}
  let initialized = false

  function logOnceUsage(featureName) {
    if (loggedUsages[featureName] || !initialized) {
      return
    }
    logger.error('Using ' + featureName)
    loggedUsages[featureName] = true
  }

  const patchers = makePatchers({
    onConstructor: logOnceUsage,
    onMethod: logOnceUsage,
    onProperty: logOnceUsage,
    logger,
  })

  const isSupported = makeSupportChecker({ logger })

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
    const featureName = nextPath.join('.')
    let subject
    try {
      subject = get(window, nextPath)
    } catch (e) {
      logger.debug('forbidden: ' + featureName)
      return
    }
    if (typeof subject === 'undefined') {
      logger.debug('skipping: ' + featureName)
      return
    }
    const suppBrowsers = data.__compat && data.__compat.support
    const isCheckNeeded = !isSupported(minBrowsers, suppBrowsers, featureName)
    if (isCheckNeeded) {
      if (typeof subject === 'function' && /^[A-Z]/.test(name)) {
        patchers.patchConstructor(path, name)
      } else if (typeof subject === 'function') {
        patchers.patchMethod(path, name)
      } else {
        patchers.patchProperty(path, name)
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
