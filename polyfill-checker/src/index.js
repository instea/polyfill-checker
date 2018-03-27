import { makeLogger } from './utils'
import data from './data'
import monkeyPatchBuiltins from './monkeyPatchBuiltins'

const defaultConfig = {
  logLevel: 'info',
  logPrefix: '[PCH]',
  minBrowsers: {
    chrome: true,
    chrome_android: true,
    edge: true,
    edge_mobile: true,
    firefox: 32,
    firefox_android: 32,
    ie: 10,
    nodejs: true,
    opera: true,
    opera_android: true,
    safari: 8,
    safari_ios: 8,
    webview_android: true,
  },
  exclude: [],
}

export function initialize(config = {}) {
  config = Object.assign({}, defaultConfig, config)
  const logger =
    config.logger ||
    makeLogger({ level: config.logLevel, prefix: config.logPrefix })
  config = Object.assign({}, config, { logger })
  logger.info('Initializing Polyfill checker...')
  monkeyPatchBuiltins(data, config)
  logger.info('Polyfill checker initialized')
}
