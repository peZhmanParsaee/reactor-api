const dbConnection = require('../../data-layer/mongodb-singleton-connection');
const opStatusGenerator = require('../../infrastructures/helpers/op-status-generator');

const CustomerService = (function() {
  async function getAll() {
    const db = dbConnection.getDb();
    const res = await db.collection('customers')
      .find().toArray();
    
    return opStatusGenerator({
      status: true,
      payload: res
    });
  }

  async function search(customerName) {
    const db = dbConnection.getDb();
    const query = { fullName: { '$regex': customerName, '$options' : 'i' } };
    const customers = await db.collection('customers')
      .find(query)
      .toArray();
    
    return opStatusGenerator({
      status: true,
      payload: customers
    });
  }

  return {
    getAll,
    search
  }
})();

module.exports = CustomerService;
