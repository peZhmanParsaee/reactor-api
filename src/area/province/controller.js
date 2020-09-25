// @flow
const repository = require('./repository');

function getAll({ repository }) {
  return async function(req, res, next) {
    try {
      const opStatus = await repository.getAll();
      res.json(opStatus);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = {
  getAll: getAll({ repository })
};
