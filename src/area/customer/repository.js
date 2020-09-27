const { db } = require('../../db/connection');
const { COLLECTIONS } = require('../../common/enums');

function makeGetAllCustomers({ db, COLLECTIONS }) {
  return async () => {
    const customers = await db
      .collection(COLLECTIONS.CUSTOMERS)
      .find()
      .toArray();

    return customers;
  };
}

function makeSearchCustomers({ db, COLLECTIONS }) {
  return async customerName => {
    const query = { fullName: { $regex: customerName, $options: 'i' } };

    const customers = await db
      .collection(COLLECTIONS.CUSTOMERS)
      .find(query)
      .toArray();

    return customers;
  };
}

module.exports = {
  makeGetAllCustomers,
  makeSearchCustomers,
  getAllCustomers: makeGetAllCustomers({ db, COLLECTIONS }),
  searchCustomers: makeSearchCustomers({ db, COLLECTIONS })
};
