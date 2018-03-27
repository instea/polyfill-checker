export function get(target, path) {
  return path.reduce((acc, key) => acc[key], target)
}

const logLevels = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
  fatal: 4,
}

export function makeLogger({ level, prefix = '' }) {
  level = logLevels[level]
  const debug = (...args) =>
    level <= logLevels.debug && console.log(prefix, ...args)
  const info = (...args) =>
    level <= logLevels.info && console.log(prefix, ...args)
  const warn = (...args) =>
    level <= logLevels.warn && console.warn(prefix, ...args)
  const error = (...args) =>
    level <= logLevels.error && console.error(prefix, ...args)
  return { debug, info, warn, error }
}
