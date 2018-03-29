const crapPolyfills = ['Object.assign', 'Promise', 'fetch']
export function createReactAppPreset(name) {
  // eslint-disable-next-line
  if (name === 'Uint8Array' && process.env.NODE_ENV !== 'production') {
    // HRM in dev mode uses this builtin
    return true
  }
  return crapPolyfills.some(p => name.indexOf(p) === 0)
}
