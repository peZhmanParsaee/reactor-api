const { getAllCustomers, searchCustomers } = require('./repository');
const asyncMiddleware = require('../../common/middlewares/async');

function makeGetAll({ getAllCustomers }) {
  return asyncMiddleware(async (req, res) => {
    const customers = await getAllCustomers();

    res.json({
      status: true,
      payload: customers
    });
  });
}

function makeSearch({ searchCustomers }) {
  return asyncMiddleware(async (req, res) => {
    const customers = await searchCustomers(req.query.q);

    res.json({
      status: true,
      payload: customers
    });
  });
}

module.exports = {
  makeGetAll,
  makeSearch,
  getAll: makeGetAll({ getAllCustomers }),
  search: makeSearch({ searchCustomers })
};
