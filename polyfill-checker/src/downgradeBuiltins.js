import { get } from './utils'
import { patchUnsupportedBuiltins } from './patchUnsupportedBuiltins'

function makeDowngradePatchers({ logger }) {
  return {
    patchConstructor(path, name) {
      const fullPath = path.concat(name)
      const featureName = fullPath.join('.')
      const parent = get(window, path)
      logger.debug('downgrading constructor: ' + featureName)
      delete parent[name]
    },
    patchMethod(path, name) {
      const fullPath = path.concat(name)
      const featureName = fullPath.join('.')
      const parent = get(window, path)
      logger.debug('downgrading method: ' + featureName)
      delete parent[name]
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
