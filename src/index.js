// @flow
const http = require('http');
const app = require('./app');
const config = require('./config');
const connection = require('./db/connection');

process.on('unhandledRejection', ex => {
  process.exit(1);
});

process.on('uncaughtException', ex => {
  process.exit(1);
});

const start = async () => {
  let db;

  try {
    db = await connection.getInstance();

    const port = config.app.port || 3000;
    const server = http.createServer(app);
    server.listen(port, () => {
      const addr = server.address();
      console.log(
        `Reactor API is up and running at ${addr.address} and port number ${port}`
      );
    });
  } catch (err) {
    console.error(err);

    process.on('SIGINT', async () => {
      await db.close();

      console.log('Mongodb connection was closed on app termination');
      process.exit();
    });

    process.exit(1);
  }
};

start();
