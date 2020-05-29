const dbConnection = require('../../data-layer/mongodb-singleton-connection');
const opStatusGenerator = require('../../infrastructures/helpers/op-status-generator');
const { COLLECTIONS } = require('../../infrastructures/models/enums.json');

const ProvinceService = (function() {
  async function getAll() {
    const db = dbConnection.getDb();

    const res = await db.collection(COLLECTIONS.PROVINCES)
      .aggregate([{ 
        $lookup: {
          from: 'cities',
          localField: '_id',
          foreignField: 'provinceId',
          as: 'cities'
        }
      }
      ]).toArray();
    
    return opStatusGenerator({
      status: true,
      payload: res
    });
  }

  return {
    getAll
  };
})();

module.exports = ProvinceService;
