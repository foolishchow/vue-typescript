const server  = require('./server')
const path = require('path')
const childProcess = require('child_process')
module.exports = (options={})=>{
  childProcess.spawn('node', [
      path.resolve(__dirname, 'start.js'), 
      JSON.stringify(options)
    ],
    {
    cwd:process.cwd(),
    stdio:[0,1,2]
  })
}