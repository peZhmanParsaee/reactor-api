const http = require('http');
const app = require('./app');
const config = require('./config');
const port = config.app.port || 3000;

const server = http.createServer(app);

server.listen(port, ()=> {
  const addr = server.address();
  console.log(`port: ${port}`);
  console.log(`API is running at ${addr.address} and port number ${port}`);
});
