// @flow
const url = require('url');
const dotenv = require('dotenv');
const result = dotenv.config();

if (result.error) {
  throw result.error;
}

function requireFromEnv(key) {
  if (!process.env[key]) {
    const fgRed = '\x1b[31m';
    console.error(fgRed, `[APP ERROR] Missing env variable ${key}`);

    return process.exit(1);
  }

  return process.env[key];
}

let dbUrl = requireFromEnv('CONNECTION_STRING');

if (requireFromEnv('NODE_ENV') === 'test') {
  dbUrl = 'mongodb://localhost:27017/reactor_test';
}

const parsedUrl = url.parse(dbUrl);

module.exports = {
  app: {
    env: requireFromEnv('NODE_ENV'),
    port: parseInt(requireFromEnv('PORT'), 10)
  },
  db: {
    host: parsedUrl.hostname,
    port: parseInt(parsedUrl.port, 10),
    name: parsedUrl.pathname.substr(1),
    user: parsedUrl.auth ? parsedUrl.auth.split(':')[0] : null,
    password: parsedUrl.auth ? parsedUrl.auth.split(':')[1] : null,
    url: dbUrl
  },
  jwtKey: requireFromEnv('JWT_KEY')
};
