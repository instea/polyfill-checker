if (process.env.NODE_ENV !== 'production') {
  const { PolyfillChecker, createReactAppPreset } = require('polyfill-checker')
  const config = {
    exclude: [createReactAppPreset],
  }
  const checker = new PolyfillChecker(config)
  checker.downgradeMode()
  // checker.injectChecker()
  window.__pch = checker
}
