import { makeLogger } from './utils'
import data from './data'
import monkeyPatchBuiltins from './monkeyPatchBuiltins'

const defaultConfig = {
  logLevel: 'info',
}

export function initialize(config = {}) {
  config = Object.assign({}, defaultConfig, config)
  const logger = config.logger || makeLogger({ level: config.logLevel })
  config = Object.assign({}, config, { logger })
  logger.info('Initializing Polyfill checker...')
  monkeyPatchBuiltins(data, config)
  logger.info('Polyfill checker initialized')
}
