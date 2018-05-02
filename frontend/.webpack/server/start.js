const server = require('./server')

let options = JSON.parse(process.argv[2])
new server(options).start();