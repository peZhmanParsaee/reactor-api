const dbConnection = require('../src/data-layer/connection');

before(function(done) {
  dbConnection.getInstance().then(() => {
    done();
  });
});

after(function(done) {
  dbConnection.getInstance().then(dbInstance => {
    dbInstance.close(function(err, res) {
      done();
    });
  });
});
