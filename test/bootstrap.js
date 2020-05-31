const mongoose = require('mongoose');
const dbConnection = require('./mongodb-singleton-connection');
mongoose.Promise = global.Promise;

before((done) => {
  (async () => {
    const connection = await dbConnection.getInstance();
  })().then(() => {
    done();
  });
});

after((done) => {
  process.kill(process.pid, 'SIGTERM');
  done();
});
