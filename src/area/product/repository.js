const dbConnection = require('../../db/connection');
const opStatusGenerator = require('../../common/helpers/op-status-generator');
const { COLLECTIONS } = require('../../common/enums');

const makeProductRepository = function(dependencies) {
  async function getAll() {
    const db = dependencies.dbConnection.getDb();

    const res = await db
      .collection(COLLECTIONS.PRODUCTS)
      .find()
      .toArray();

    return opStatusGenerator({
      status: true,
      payload: res
    });
  }

  async function add(product) {
    const db = dependencies.dbConnection.getDb();

    const res = await db.collection(COLLECTIONS.PRODUCTS).insertOne(product);

    return opStatusGenerator({
      status: res.result.ok === 1,
      payload: res.result.ok === 1 ? res.ops[0] : null
    });
  }

  return {
    getAll,
    add
  };
};

const repository = makeProductRepository({ dbConnection });

module.exports = repository;
exports.makeProductRepository = makeProductRepository;
