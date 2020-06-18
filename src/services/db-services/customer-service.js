const dbConnection = require('../../data-layer/mongodb-singleton-connection');
const opStatusGenerator = require('../../infrastructures/helpers/op-status-generator');

const makeCustomerService = function(dependencies) {

  async function getAll() {
    const db = dependencies.dbConnection.getDb();
    
    const customers = await db.collection('customers')
      .find().toArray();
    
    return opStatusGenerator({
      status: true,
      payload: customers
    });
  }

  async function search(customerName) {
    const db = dependencies.dbConnection.getDb();

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
};

const customerServiceDependencies = {
  dbConnection
};
const customerService = makeCustomerService(customerServiceDependencies);

module.exports = customerService;
