import { makeLogger } from './utils'
import data from './data'
import monkeyPatchBuiltins from './monkeyPatchBuiltins'

const defaultConfig = {
  logLevel: 'info',
  logPrefix: '[PCH]',
  minBrowsers: {
    chrome: 60,
    chrome_android: 60,
    edge: true,
    edge_mobile: true,
    firefox: 54,
    firefox_android: 54,
    ie: 9,
    opera: 48,
    opera_android: 48,
    safari: 10,
    safari_ios: 10,
    webview_android: 4.1,
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
