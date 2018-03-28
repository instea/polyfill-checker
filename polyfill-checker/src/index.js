import defaultConfig from './defaultConfig'
import { makeLogger } from './utils'
import data from './data'
import monkeyPatchBuiltins from './monkeyPatchBuiltins'

export function injectChecker(config = {}) {
  config = Object.assign({}, defaultConfig, config)
  const logger =
    config.logger ||
    makeLogger({ level: config.logLevel, prefix: config.logPrefix })
  config = Object.assign({}, config, { logger })
  logger.info('Initializing Polyfill checker...')
  monkeyPatchBuiltins(data, config)
  logger.info('Polyfill checker initialized')
}
