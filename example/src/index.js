import './initializePolyfillChecker'
import './polyfills'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

new Promise(resolve => resolve())

const arr = [1, 2, 3]
arr.find(n => n === 2)

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
