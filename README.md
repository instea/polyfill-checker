# Polyfill checker

Cross browser built-in functions/objects compatibility checker.

[demo](./demo-min.png)

## Installation

```bash
npm install polyfill-checker
```

## Usage

Import and initialize polyfill checker before the application runs:

```js
import { initialize } from 'polyfill-checker'

initialize()
```

`initialize` function takes one optional config parameter, see [defaultConfig](./polyfill-checker/src/defaultConfig.js).

It uses [browser-compat-data](https://github.com/mdn/browser-compat-data) to check browser compatibility.

You can find more in [example project](./example)

## Contributing

Contributions are welcome! Just open an issues with any idea or pull-request if it is no-brainer. Make sure all tests and linting rules pass.
