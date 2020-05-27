const dbContext = require('../../data-layer/db-context');
const opStatusGenerator = require('../../infrastructures/helpers/op-status-generator');

const CustomerService = (function() {
  async function getAll() {
    const { db } = await dbContext.connect();
    const res = await db.collection('customers')
      .find().toArray();
    
    return opStatusGenerator({
      status: true,
      payload: res
    });
  }

  async function search(customerName) {
    const { db } = await dbContext.connect();
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
