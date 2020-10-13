const { getDb } = require('../../db/connection');
const { COLLECTIONS } = require('../../common/enums');

function makeGetAllCustomers({ getDb, COLLECTIONS }) {
  return async () => {
    const customers = await getDb()
      .collection(COLLECTIONS.CUSTOMERS)
      .find()
      .toArray();

    return customers;
  };
}

function makeSearchCustomers({ getDb, COLLECTIONS }) {
  return async customerName => {
    const query = { fullName: { $regex: customerName, $options: 'i' } };

    const customers = await getDb
      .collection(COLLECTIONS.CUSTOMERS)
      .find(query)
      .toArray();

    return customers;
  };
}

module.exports = {
  makeGetAllCustomers,
  makeSearchCustomers,
  getAllCustomers: makeGetAllCustomers({ getDb, COLLECTIONS }),
  searchCustomers: makeSearchCustomers({ getDb, COLLECTIONS })
};
