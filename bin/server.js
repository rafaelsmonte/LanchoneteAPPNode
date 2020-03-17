'use strict'
const http = require('http');
const app = require('../src/app')
const port = normalizePort(process.env.PORT || '3000');
const server = http.createServer(app);
server.listen(port)
console.log('teste on '+port);

function normalizePort(val)
{
  const port = parseInt(val,10);
  if(isNaN(port))
    return val;
  if( port > 0)
    return port;
  return false;

}