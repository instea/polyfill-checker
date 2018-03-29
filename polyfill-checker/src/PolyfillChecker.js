import downgradeBuiltins from './downgradeBuiltins'
import data from './data'
import { makeLogger } from './utils'
import monkeyPatchBuiltins from './monkeyPatchBuiltins'
import defaultConfig from './defaultConfig'
import Reporter from './Reporter.js'

export default class PolyfillChecker {
  constructor(config = {}) {
    config = Object.assign({}, defaultConfig, config)
    config.minBrowsers = Object.assign(
      {},
      defaultConfig.minBrowsers,
      config.minBrowsers
    )
    this.logger =
      config.logger ||
      makeLogger({ level: config.logLevel, prefix: config.logPrefix })
    this.ctx = { config, logger: this.logger }
    this.reporter = new Reporter(this.ctx)
    this.ctx.reporter = this.reporter
    this.config = config
  }

  // Inject polyfill checker to JS enviroment
  injectChecker() {
    this.logger.info('Initializing checker injection...')
    monkeyPatchBuiltins(data, this.ctx)
    this.logger.info('checker injection initialized')
  }

  downgradeMode() {
    this.logger.info('Initializing downgrade mode...')
    downgradeBuiltins(data, this.ctx)
    this.logger.info('Downgrade mode initialized')
  }
}
