const dbContext = require('../../data-layer/db-context');
const opStatusGenerator = require('../../infrastructures/helpers/op-status-generator');
const { COLLECTIONS } = require("../../infrastructures/models/enums.json");
const { getCurrectTimeStamp, formatJalaaliDate, addToJalaaliDate, addToTimestampAndFormatJalaali } = require("../../infrastructures/helpers/date-time-helper");
const ObjectID = require('mongodb').ObjectID;

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
    let res = [];
    
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
        const invoices = await db.collection(COLLECTIONS.INVOICES)
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
        
        for (const invoice of invoices) {
          const selectedCustomer = await db.collection(COLLECTIONS.CUSTOMERS).findOne({ _id: ObjectID(invoice.customerId) });
          res.push({
            ...invoice,
            customerName: selectedCustomer.fullName,
            deliverAtFormatted: addToTimestampAndFormatJalaali({
              // jalaaliDate: invoice.date, 
              timestamp: invoice.createdAt,
              outFormat:'dddd jDD jMMMM ساعت HH',              
              addValue: invoice.deliverAfter, 
              addUnit: invoice.deliverAfterTimeUnit
            })
          });
        }
      
        break;

      case 'INVOICE_ITEMS':        
        const invoicesRes = await db.collection(COLLECTIONS.INVOICES)
          .find()
          .skip(offset)
          .limit(limit)
          .toArray();
        
        for (const invoice of invoicesRes) {
          for (const product of invoice.products) {
            const selectedCustomer = await db.collection(COLLECTIONS.CUSTOMERS).findOne({ _id: ObjectID(invoice.customerId) });
            res.push({
              invoiceId: invoice._id,
              invoiceNo: invoice.no,
              productName: product.name,
              customerName: selectedCustomer.fullName
            });
          }
        }
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
