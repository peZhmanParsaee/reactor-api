const dbConnection = require('../../data-layer/mongodb-singleton-connection');
const opStatusGenerator = require('../../infrastructures/helpers/op-status-generator');
const { COLLECTIONS } = require('../../infrastructures/models/enums.json');

const ProductService = (function() {
  async function getAll() {
    const db = dbConnection.getDb();
    
    const res = await db.collection(COLLECTIONS.PRODUCTS)
      .find().toArray();
    
    return opStatusGenerator({
      status: true,
      payload: res
    });
  }

  async function add(product) {
    const db = dbConnection.getDb();
      
    const res = await db.collection(COLLECTIONS.PRODUCTS)
      .insertOne(product);
    
    return opStatusGenerator({
      status: res.result.ok === 1,
      payload: res.result.ok === 1 ? res.ops[0] : null
    });
  }

  return {
    getAll,
    add
  };
  
})();

module.exports = ProductService;
