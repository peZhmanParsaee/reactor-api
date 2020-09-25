const dbConnection = require('../../db/connection');
const { COLLECTIONS } = require('../../common/enums');

function makeProvinceService({ dbConnection }) {
  async function getAll() {
    const db = dbConnection.getDb();

    const provinces = await db
      .collection(COLLECTIONS.PROVINCES)
      .aggregate([
        {
          $lookup: {
            from: 'cities',
            localField: '_id',
            foreignField: 'provinceId',
            as: 'cities'
          }
        }
      ])
      .toArray();

    return provinces;
  }

  return {
    getAll
  };
}

module.exports = makeProvinceService({
  dbConnection
});
