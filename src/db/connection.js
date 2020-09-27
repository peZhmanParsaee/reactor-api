const MongoClient = require('mongodb').MongoClient;
const config = require('../config');

module.exports = (function() {
  let connectionInstance;
  let db;

  function getInstance() {
    return new Promise(function(resolve, reject) {
      if (connectionInstance) {
        return resolve(connectionInstance);
      }

      const options = {
        useNewUrlParser: true
      };
      MongoClient.connect(config.db.url, options, function(err, client) {
        if (err) {
          return reject(err);
        }

        connectionInstance = client;
        db = client.db(config.db.name);

        return resolve(connectionInstance);
      });
    });
  }

  function getDb() {
    if (!db) {
      throw new Error('db object is not initialized!');
    }

    return db;
  }

  return {
    getInstance,
    getDb,
    db
  };
})();
