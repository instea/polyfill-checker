import semver from 'semver'

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
      const suppVersion = descriptor.version_added
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
      if (minVersion === true) {
        return true
      }
      return semver.gt(semver.coerce(suppVersion), semver.coerce(minVersion))
    }

    function toSupportEntries(browserKey) {
      const descriptor = supportedBrowsers[browserKey]
      return {
        browser: browserKey,
        version_added: descriptor.version_added,
        min_version: minBrowsers[browserKey],
      }
    }
    return Object.keys(supportedBrowsers)
      .filter(filterUnsupported)
      .map(toSupportEntries)
  }
}
