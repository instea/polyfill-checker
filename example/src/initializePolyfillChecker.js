if (process.env.NODE_ENV !== 'production') {
  const { injectChecker } = require('polyfill-checker')
  window.__pch = injectChecker({
    exclude: [
      'Proxy',
      name => name.startsWith('Set'),
      name => name.startsWith('Map'),
      name => name.startsWith('Symbol'),
    ],
  })
}
