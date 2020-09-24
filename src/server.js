// @flow
const http = require('http');
const app = require('./app');
const config = require('./config');
const port = config.app.port || 3000;
const dbConnection = require('./data-layer/connection');

dbConnection
  .getInstance()
  .then(dbInstance => {
    // boot the application
    const server = http.createServer(app);
    server.listen(port, () => {
      const addr = server.address();
      console.log(
        `Reactor API is up and running at ${addr.address} and port number ${port}`
      );
    });

    process.on('SIGINT', async () => {
      await dbInstance.close();
      console.log('Mongodb connections was closed on app termination');
      process.exit();
    });
  })
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
