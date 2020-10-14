const dbConnection = require('../../db/connection');
const { COLLECTIONS } = require('../../common/enums');

function makeGetAll({ dbConnection }) {
  return async function getAll() {
    const db = dbConnection.getDb();

    const products = await db
      .collection(COLLECTIONS.PRODUCTS)
      .find()
      .toArray();

    return products;
  };
}

function makeAdd({ dbConnection }) {
  return async function add(product) {
    const db = dbConnection.getDb();

    const res = await db.collection(COLLECTIONS.PRODUCTS).insertOne(product);

    return res.result.ok === 1;

    // return opStatusGenerator({
    //   status: res.result.ok === 1,
    //   payload: res.result.ok === 1 ? res.ops[0] : null
    // });
  };
}

module.exports = {
  getAll: makeGetAll({ dbConnection }),
  add: makeAdd({ dbConnection }),
  makeGetAll,
  makeAdd
};
