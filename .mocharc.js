process.env.NODE_ENV = 'test';

module.exports = {
  spec: './tests',
  recursive: true,
  require: '@babel/register',
  timeout: 5000
};
