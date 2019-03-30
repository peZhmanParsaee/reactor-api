const dbContext = require('../../data-layer/db-context');
const opStatusGenerator = require('../../infrastructures/helpers/op-status-generator');
const { COLLECTIONS } = require("../../infrastructures/models/enums.json");

class ProvinceService {
  async getAll() {
    const db = await dbContext.connect();

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
}

module.exports = ProvinceService;
