if (process.env.NODE_ENV !== 'production') {
  const { PolyfillChecker } = require('polyfill-checker')
  const config = {
    exclude: [
      'Proxy',
      name => name.startsWith('Set'),
      name => name.startsWith('Map'),
      name => name.startsWith('Symbol'),
    ],
  }
  const checker = new PolyfillChecker(config)
  checker.injectChecker()
  window.__pch = checker
}
