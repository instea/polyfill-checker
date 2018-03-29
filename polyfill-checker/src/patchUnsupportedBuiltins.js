import { get, isExcluded } from './utils'
import { makeSupportChecker } from './supportChecker'

const omittedNames = ['Function', 'prototype', 'length', 'NaN', 'Infinity']

function patchBuiltins(name, path, data, options) {
  const {
    ctx: { logger, config: { exclude, minBrowsers } },
    patchers,
  } = options
  const findUnsupported = makeSupportChecker({ logger })

  path = path.slice()
  if (omittedNames.indexOf(name) > -1) {
    logger.debug('omitted: ' + name)
    return
  }
  const parent = get(window, path)
  if (!parent) {
    // skip
    return
  }
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
  Object.keys(data)
    .filter(n => n !== '__compat')
    .forEach(n => {
      patchBuiltins(n, nextPath, data[n], options)
    })
  const suppBrowsers = data.__compat && data.__compat.support
  const unsupported = findUnsupported(minBrowsers, suppBrowsers, featureName)
  const excluded = isExcluded(featureName, exclude)
  if (unsupported.length && !excluded) {
    const data = { unsupported }
    if (typeof subject === 'function' && /^[A-Z]/.test(name)) {
      patchers.patchConstructor(path, name, data)
    } else if (typeof subject === 'function') {
      patchers.patchMethod(path, name, data)
    } else {
      patchers.patchProperty(path, name, data)
    }
  }
}

export function patchUnsupportedBuiltins(data, options) {
  Object.keys(data).forEach(n => patchBuiltins(n, [], data[n], options))
}
