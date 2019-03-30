const http = require('http');
const app = require('./app');
const config = require('./config');

const server = http.createServer(app);

server.listen(config.app.port, ()=> {
  const addr = server.address();
  console.log(`API is running at ${addr.address} and port number ${config.app.port}`);
})
