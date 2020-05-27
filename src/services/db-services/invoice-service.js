const ObjectID = require('mongodb').ObjectID;

const dbContext = require('../../data-layer/db-context');
const opStatusGenerator = require('../../infrastructures/helpers/op-status-generator');
const { COLLECTIONS } = require('../../infrastructures/models/enums.json');
const { getCurrectTimeStamp, addToTimestampAndFormatJalaali } = require('../../infrastructures/helpers/date-time-helper');


const InvoiceService = (function() {
  async function getAll() {
    const { db } = await dbContext.connect();
    const res = await db.collection(COLLECTIONS.INVOICES)
      .find().toArray();
    
    return opStatusGenerator({
      status: true,
      payload: res
    });
  }

  async function getPage({ offset, limit, fromDate, toDate, invoiceType }) {
    const { db } = await dbContext.connect();
    let res = [];
    
    let filter = {};

    if (fromDate != null && toDate != null) {
      const fromDateStartOfDay = Math.floor(fromDate / 86400) * 86400;
      const toDateEndOfDay = Math.ceil(toDate / 86400) * 86400;
      filter = {
        'createdAt': {
          $gte: fromDateStartOfDay / 1000,
          $lt: toDateEndOfDay / 1000
        }
      };
    } else if (fromDate != null) {
      const fromDateStartOfDay = Math.floor(fromDate / 86400) * 86400;
      filter = {
        'createdAt': {
          $gte: fromDateStartOfDay / 1000
        }
      };
    } else if (toDate != null) {
      const toDateEndOfDay = Math.ceil(toDate / 86400) * 86400;
      filter = {
        'createdAt': {
          $lt: toDateEndOfDay / 1000
        }
      };
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
        .find(filter)
      // .skip(offset)
      // .limit(limit)
        .toArray();

      const invoicesItems = [];
        
      for (const invoice of invoicesRes) {
        for (const product of invoice.products) {
          const selectedCustomer = await db.collection(COLLECTIONS.CUSTOMERS).findOne({ _id: ObjectID(invoice.customerId) });
          invoicesItems.push({
            invoiceId: invoice._id,
            invoiceNo: invoice.no,
            productName: product.name,
            customerName: selectedCustomer.fullName
          });
        }
      }

      res = invoicesItems.slice(offset, offset + limit);
    }
    
    return opStatusGenerator({
      status: true,
      payload: res || []
    });
  }

  async function add(invoice) {
    const { db } = await dbContext.connect();
    let res = await db.collection(COLLECTIONS.INVOICES)
      .insertOne({
        ...invoice,
        createdAt: getCurrectTimeStamp() / 1000
        // createdAt: new Date().getTime()
      });
    return opStatusGenerator({
      status: res.result.ok === 1,
      payload: res.result.ok === 1 ? res.ops[0] : null
    });
  }

  return {
    getAll,
    getPage,
    add
  };
})();

module.exports = InvoiceService;
