// @flow
const url = require('url');
const dotenv = require('dotenv');
const result = dotenv.config();

if (result.error) {
  throw result.error;
}

function requireFromEnv(key) {
  if (!process.env[key]) {
    console.error(`[APP ERROR] Missing env variable ${key}`);

    return process.exit(1);
  }

  return process.env[key];
}

let dbUrl = requireFromEnv('CONNECTION_STRING');

if (process.env.NODE_ENV === 'test') {
  dbUrl = 'mongodb://localhost:27017/reactor_test';
} else {
  dbUrl = process.env.CONNECTION_STRING || 'mongodb://localhost:27017/reactor';
}

const parsedUrl = url.parse(dbUrl);

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
    url: dbUrl
  },
  jwtKey: process.env.JWT_KEY
};
