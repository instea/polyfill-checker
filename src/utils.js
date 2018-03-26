export function get(target, path) {
  return path.reduce((acc, key) => acc[key], target)
}
