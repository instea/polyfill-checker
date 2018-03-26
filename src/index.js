import data from './data'
import monkeyPatchBuiltins from './monkeyPatchBuiltins'

export function initialize(config) {
  console.log('Initializing Polyfill checker...')
  monkeyPatchBuiltins(data, config)
  console.log('Polyfill checker initialized')
}
