import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { initialize } from 'polyfill-checker'

initialize();

[1, 2, 3].find(n => n === 2)

new Promise(resolve => resolve())

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
