// @flow
const url = require('url');
const dotenv = require('dotenv');
const result = dotenv.config();

if (result.error) {
  throw result.error;
}

const parsedUrl = url.parse(
  process.env.CONNECTION_STRING || 'mongodb://localhost:27017/reactor'
);

module.exports = {
  app: {
    env: process.env.NODE_ENV,
    port: process.env.PORT
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
