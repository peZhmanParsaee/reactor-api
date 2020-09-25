const repository = require('./repository');

function getAll({ repository }) {
  return async function(req, res, next) {
    try {
      const customers = await repository.getAll();

      res.json({
        status: true,
        payload: customers
      });
    } catch (err) {
      return next(err);
    }
  };
}

function search({ repository }) {
  return async function(req, res, next) {
    try {
      const customers = await repository.search(req.query.q);

      res.json({
        status: true,
        payload: customers
      });
    } catch (err) {
      return next(err);
    }
  };
}

module.exports = {
  getAll: getAll({ repository }),
  search: search({ repository })
};
