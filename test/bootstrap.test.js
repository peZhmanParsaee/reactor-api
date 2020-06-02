const dbConnection = require('../src/data-layer/mongodb-singleton-connection');

before(function(done) {
  dbConnection.getInstance()
    .then(() => {
      done();
    });
});

after(function(done) {
  console.log('after each');
  dbConnection.getInstance()
    .then(dbInstance => {
      dbInstance.close(function(err, res) {
        done();
      });
    });
});
