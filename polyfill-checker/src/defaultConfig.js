export default {
  // log levels: debug, info, warn, error, fatal
  logLevel: 'info',
  // log prefix
  logPrefix: '[PCH]',
  // minimum browser versions to which will be built-ins checked,
  // true means all versions
  minBrowsers: {
    chrome: '60',
    chrome_android: '60',
    edge: true,
    edge_mobile: true,
    firefox: '54',
    firefox_android: '54',
    ie: '9',
    opera: '48',
    opera_android: '48',
    safari: '10',
    safari_ios: '10',
    webview_android: '4.1',
  },
  // list of excluded builtins (usually list of included polyfills)
  // as string: Array.prototype.find
  // as function: name => name.startsWith('Set')
  exclude: [],
}
