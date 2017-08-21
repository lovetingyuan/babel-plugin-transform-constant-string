const babel = require('babel-core')
const path = require('path')

babel.transformFile(path.resolve(__dirname, './actual.js'), {
  "plugins": [
    ["../../../src", { export: true, name: 'ff' }]
  ],
}, (err, ret) => {
  console.log(err, ret && ret.code)
})
