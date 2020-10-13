const dbConnection = require('../src/db/connection');

before(function(done) {
  console.log('before');
  dbConnection.getInstance().then(() => {
    done();
  });
});

after(function(done) {
  console.log('after');
  dbConnection.getInstance().then(dbInstance => {
    dbInstance.close(() => {
      done();
    });
  });
});
