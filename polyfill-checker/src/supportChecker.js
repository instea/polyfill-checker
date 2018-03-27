function parseVersion(version) {
  if (typeof version === 'boolean') {
    return version
  }
  return parseInt(version, 10)
}
export function makeSupportChecker({ logger }) {
  /**
   * Checks and finds browsers where feature is not supported
   * comparing to minBrowsers.
   */
  return function findUnsupportedBrowsers(
    minBrowsers,
    supportedBrowsers,
    featureName
  ) {
    if (!supportedBrowsers) {
      logger.debug('missing compatibility data, skipping: ' + featureName)
      return []
    }
    function filterUnsupported(browserKey) {
      const descriptor = supportedBrowsers[browserKey]
      if (Array.isArray(descriptor)) {
        logger.debug(
          'unsupported descriptor, skipping:',
          featureName,
          descriptor
        )
        return false
      }
      const suppVersion = parseVersion(descriptor.version_added)
      const minVersion = minBrowsers[browserKey]
      if (!minVersion) {
        return false
      }
      if (suppVersion === false || suppVersion === null) {
        return true
      }
      if (suppVersion === true) {
        return false
      }
      return suppVersion > minVersion
    }

    function toSupportEntries(browserKey) {
      const descriptor = supportedBrowsers[browserKey]
      return {
        browser: browserKey,
        version_added: parseVersion(descriptor.version_added),
        min_version: minBrowsers[browserKey],
      }
    }
    return Object.keys(supportedBrowsers)
      .filter(filterUnsupported)
      .map(toSupportEntries)
  }
}
