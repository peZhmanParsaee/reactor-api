const dbConnection = require('../../data-layer/connection');

const makeCustomerService = function(dependencies) {
  async function getAll(req, res, next) {
    try {
      const db = dependencies.dbConnection.getDb();

      const customers = await db
        .collection('customers')
        .find()
        .toArray();

      return res.json({
        status: true,
        payload: customers
      });
    } catch (err) {
      return next(err);
    }
  }

  async function search(req, res, next) {
    try {
      const db = dependencies.dbConnection.getDb();

      const customerName = req.query.q;

      const query = { fullName: { $regex: customerName, $options: 'i' } };
      const customers = await db
        .collection('customers')
        .find(query)
        .toArray();

      return res.json({
        status: true,
        payload: customers
      });
    } catch (err) {
      return next(err);
    }
  }

  return {
    getAll,
    search
  };
};

const customerService = makeCustomerService({ dbConnection });

module.exports = customerService;
exports.makeCustomerService = makeCustomerService;
