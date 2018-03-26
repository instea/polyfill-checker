const bcd = require('mdn-browser-compat-data');
const fs = require('fs')

console.log('building data...')
const builtins = bcd.javascript.builtins
fs.writeFileSync('./src/data/mdnData.json', JSON.stringify(builtins, null, 2))

console.log('building data done')
