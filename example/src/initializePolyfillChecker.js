if (process.env.NODE_ENV !== 'production') {
  const { PolyfillChecker } = require('polyfill-checker')
  const config = {
    exclude: [
      name => name.indexOf('Set') === 0,
      name => name.indexOf('Map') === 0,
      name => name.indexOf('Symbol') === 0,
    ],
  }
  const checker = new PolyfillChecker(config)
  checker.injectChecker()
  //checker.downgradeMode()
  window.__pch = checker
}
