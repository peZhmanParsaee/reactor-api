const dbConnection = require('../src/data-layer/mongodb-singleton-connection');

beforeEach(function(done) {
  dbConnection.getInstance()
    .then(() => {
      done();
    });
});

afterEach(function(done) {
  dbConnection.getInstance()
    .then(dbInstance => {
      dbInstance.close()
        .then(() => {
          done();
        });
    });
});
