import { initialize } from 'polyfill-checker'

initialize({
  exclude: [
    'Proxy',
    name => name.startsWith('Set'),
    name => name.startsWith('Map'),
    name => name.startsWith('Symbol'),
  ],
})
