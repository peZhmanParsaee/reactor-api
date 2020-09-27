const { getAllCustomers, searchCustomers } = require('./repository');

function makeGetAll({ repository }) {
  return async (req, res, next) => {
    try {
      const customers = await getAllCustomers();

      res.json({
        status: true,
        payload: customers
      });
    } catch (err) {
      return next(err);
    }
  };
}

function makeSearch({ repository }) {
  return async (req, res, next) => {
    try {
      const customers = await searchCustomers(req.query.q);

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
  makeGetAll,
  makeSearch,
  getAll: makeGetAll({ repository }),
  search: makeSearch({ repository })
};
