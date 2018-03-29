import { get } from './utils'
import { patchUnsupportedBuiltins } from './patchUnsupportedBuiltins'

function makeDowngradePatchers({ logger }) {
  return {
    patchConstructor(path, name) {
      const fullPath = path.concat(name)
      const featureName = fullPath.join('.')
      const parent = get(window, path)
      logger.debug('downgrading constructor: ' + featureName)
      parent[name] = undefined
    },
    patchMethod(path, name) {
      const fullPath = path.concat(name)
      const featureName = fullPath.join('.')
      const parent = get(window, path)
      logger.debug('downgrading method: ' + featureName)
      parent[name] = undefined
    },
    patchProperty() {
      // TODO: patch getter
    },
  }
}

export default function downgradeBuiltins(data, ctx) {
  const { logger } = ctx
  const patchers = makeDowngradePatchers({ logger })
  const options = { ctx, patchers }
  patchUnsupportedBuiltins(data, options)
}
