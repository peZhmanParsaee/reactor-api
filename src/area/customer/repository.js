const dbConnection = require('../../db/connection');
const { COLLECTIONS } = require('../../common/enums');

const makeCustomerRepository = function(dependencies) {
  async function getAll() {
    const db = dependencies.dbConnection.getDb();

    const customers = await db
      .collection(COLLECTIONS.CUSTOMERS)
      .find()
      .toArray();

    return customers;
  }

  async function search(cusomerName) {
    const db = dependencies.dbConnection.getDb();

    const query = { fullName: { $regex: customerName, $options: 'i' } };

    const customers = await db
      .collection(COLLECTIONS.CUSTOMERS)
      .find(query)
      .toArray();

    return customers;
  }

  return {
    getAll,
    search
  };
};

const customerRepo = makeCustomerRepository({ dbConnection });

module.exports = customerRepo;
exports.makeCustomerRepository = makeCustomerRepository;
