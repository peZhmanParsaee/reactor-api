require('dotenv').config();

module.exports = {
  app: {
    env: process.env.APP_ENV,
    port: process.env.APP_PORT
  },
  db: {
    name: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    url: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/?authMechanism=DEFAULT`
  }
}

