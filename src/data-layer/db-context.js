const MongoClient = require('mongodb').MongoClient;
const config = require('../config');

class Connection {
  constructor(uri, name) {
    this.db = null;
    this.uri = uri;
    this.name = name;
  }

  connect() {
    console.log(JSON.stringify(config));
    if (this.db) {
      return Promise.resolve(this.db);
    } else {
      return MongoClient.connect(this.uri)
        .then(client => {
          this.db = client.db(this.name);
          return this.db;
        });
    }
  }
}

module.exports = new Connection(config.db.url, config.db.name);
