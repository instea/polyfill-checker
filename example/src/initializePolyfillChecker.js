if (process.env.NODE_ENV !== 'production') {
  const { injectChecker } = require('polyfill-checker')
  injectChecker({
    exclude: [
      'Proxy',
      name => name.startsWith('Set'),
      name => name.startsWith('Map'),
      name => name.startsWith('Symbol'),
    ],
  })
}
