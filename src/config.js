// @flow
const url = require('url');
require('dotenv').config();

const parsedUrl = url.parse(process.env.CONNECTION_STRING || 'mongodb://localhost:27017/reactor');

module.exports = {
  app: {
    env: process.env.APP_ENV,
    port: process.env.APP_PORT
  },
  db: {
    host: parsedUrl.hostname,
    port: parseInt(parsedUrl.port, 10),
    name: parsedUrl.pathname.substr(1),
    user: parsedUrl.auth ? parsedUrl.auth.split(':')[0] : null,
    password: parsedUrl.auth ? parsedUrl.auth.split(':')[1] : null,
    url: process.env.CONNECTION_STRING
  }
};

