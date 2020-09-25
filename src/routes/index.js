const apiRoute = require('./apis');

function init(app) {
  app.use('/api', apiRoute);
}

module.exports = {
  init
};
