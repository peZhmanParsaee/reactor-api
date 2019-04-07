const dbContext = require('../../data-layer/db-context');
const opStatusGenerator = require('../../infrastructures/helpers/op-status-generator');
const { COLLECTIONS } = require("../../infrastructures/models/enums.json");
const { getCurrectTimeStamp  } = require("../../infrastructures/helpers/date-time-helper");

class InvoiceService {
  async getAll() {
    const db = await dbContext.connect();
    const res = await db.collection(COLLECTIONS.INVOICES)
                        .find().toArray();
    
    return opStatusGenerator({
      status: true,
      payload: res
    });
  }

  async getPage({ offset, limit, fromDate, toDate, invoiceType }) {
    console.log(`limit: ${limit}, offset: ${offset}`);
    const db = await dbContext.connect();
    let res;
    
    console.log(invoiceType);

    let filter = {};

    console.log(fromDate);
    console.log(toDate);
    console.log(typeof toDate);

    if (fromDate != null && toDate != null) {
      console.log('two')
      filter = {
        createdAt: {
          $gte: fromDate,
          $lt: toDate
        }
      }
    } else if (fromDate != null) {
      filter = {
        createdAt: {
          $gte: fromDate
        }
      }
    } else if (toDate != null) {
      filter = {
        createdAt: {
          $lt: toDate
        }
      }
    }

    console.dir(filter);

    switch (invoiceType) {
      case 'INVOICES':        
        res = await db.collection(COLLECTIONS.INVOICES)
                        // .find(filter)
                        .aggregate([
                          {
                            $match: filter
                          },
                          { 
                            $lookup: {
                              from: COLLECTIONS.CUSTOMERS,
                              localField: '_id',
                              foreignField: 'customerId',
                              as: 'customer'
                           }
                         }
                        ])
                        .skip(offset)
                        .limit(limit)
                        .toArray();
        break;

      case 'INVOICE_ITEMS':        
        res = await db.collection(COLLECTIONS.INVOICES)
          .find()
          .skip(offset)
          .limit(limit)
          .toArray();
    }    
    
    return opStatusGenerator({
      status: true,
      payload: res || []
    });
  }

  async add(invoice) {
    const db = await dbContext.connect();
    let res = await db.collection(COLLECTIONS.INVOICES)
                        .insertOne({
                          ...invoice,
                          createdAt: getCurrectTimeStamp()
                        });
    return opStatusGenerator({
      status: res.result.ok === 1,
      payload: res.result.ok === 1 ? res.ops[0] : null
    });
  }
}

module.exports = InvoiceService;
