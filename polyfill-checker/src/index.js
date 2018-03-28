import defaultConfig from './defaultConfig'
import { makeLogger } from './utils'
import Reporter from './Reporter.js'
import data from './data'
import monkeyPatchBuiltins from './monkeyPatchBuiltins'

/**
Inject polyfill checker to JS enviroment

@return { reporter } instance to reporter
*/
export function injectChecker(config = {}) {
  config = Object.assign({}, defaultConfig, config)
  const logger =
    config.logger ||
    makeLogger({ level: config.logLevel, prefix: config.logPrefix })
  const ctx = { config, logger }
  const reporter = new Reporter(ctx)
  ctx.reporter = reporter
  logger.info('Initializing Polyfill checker...')
  monkeyPatchBuiltins(data, ctx)
  logger.info('Polyfill checker initialized')
  return { reporter }
}
