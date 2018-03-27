function parseVersion(version) {
  if (typeof version === 'boolean') {
    return version
  }
  return parseInt(version, 10)
}
export function makeSupportChecker({ logger }) {
  /**
   * Checks if features is supported comparing to minBrowsers.
   */
  return function isFeatureSupported(
    minBrowsers,
    supportedBrowsers,
    featureName
  ) {
    if (!supportedBrowsers) {
      logger.debug('missing compatibility data, skipping: ' + featureName)
      return true
    }
    return Object.keys(supportedBrowsers).every(browserKey => {
      const descriptor = supportedBrowsers[browserKey]
      if (Array.isArray(descriptor)) {
        logger.debug(
          'unsupported descriptor, skipping:',
          featureName,
          descriptor
        )
        return true
      }
      const suppVersion = parseVersion(descriptor.version_added)
      const minVersion = minBrowsers[browserKey]
      if (!minVersion || suppVersion === true || suppVersion === null) {
        return true
      }
      if (suppVersion === false) {
        return false
      }
      return suppVersion <= minVersion
    })
  }
}
