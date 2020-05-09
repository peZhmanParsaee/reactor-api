const MongoClient = require('mongodb').MongoClient;
const config = require('../config');

class Connection {
  constructor(uri, name) {
    this.db = null;
    this.connection = null;
    this.uri = uri;
    this.name = name;
  }

  connect() {
    if (this.db && this.connection) {
      return Promise.resolve({ db: this.db, connection: this.connection });
    } else {
      return MongoClient.connect(this.uri, { useNewUrlParser: true })
        .then(connection => {
          this.db = connection.db(this.name);
          this.connection = connection;
          return { db: this.db, connection: this.connection };
        });
    }
  }
}

module.exports = new Connection(config.db.url, config.db.name);
