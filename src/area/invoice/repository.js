const ObjectID = require('mongodb').ObjectID;

const dbConnection = require('../../db/connection');
const opStatusGenerator = require('../../common/helpers/op-status-generator');
const { COLLECTIONS } = require('../../common/enums');
const {
  getCurrectTimeStamp,
  addToTimestampAndFormatJalaali
} = require('../../common/helpers/date-time-helper');

function makeInvoiceRepository({ dbConnection }) {
  async function getAll() {
    const db = dbConnection.getDb();

    const invoices = await db
      .collection(COLLECTIONS.INVOICES)
      .find()
      .toArray();

    return invoices;
  }

  async function getPage({ offset, limit, fromDate, toDate, invoiceType }) {
    const db = dbConnection.getDb();

    let res = [];

    let filter = {};

    if (fromDate != null && toDate != null) {
      const fromDateStartOfDay = Math.floor(fromDate / 86400) * 86400;
      const toDateEndOfDay = Math.ceil(toDate / 86400) * 86400;
      filter = {
        createdAt: {
          $gte: fromDateStartOfDay / 1000,
          $lt: toDateEndOfDay / 1000
        }
      };
    } else if (fromDate != null) {
      const fromDateStartOfDay = Math.floor(fromDate / 86400) * 86400;
      filter = {
        createdAt: {
          $gte: fromDateStartOfDay / 1000
        }
      };
    } else if (toDate != null) {
      const toDateEndOfDay = Math.ceil(toDate / 86400) * 86400;
      filter = {
        createdAt: {
          $lt: toDateEndOfDay / 1000
        }
      };
    }

    switch (invoiceType) {
      case 'INVOICES':
        const invoices = await db
          .collection(COLLECTIONS.INVOICES)
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
          const selectedCustomer = await db
            .collection(COLLECTIONS.CUSTOMERS)
            .findOne({ _id: ObjectID(invoice.customerId) });
          res.push({
            ...invoice,
            customerName: selectedCustomer.fullName,
            deliverAtFormatted: addToTimestampAndFormatJalaali({
              // jalaaliDate: invoice.date,
              timestamp: invoice.createdAt,
              outFormat: 'dddd jDD jMMMM ساعت HH',
              addValue: invoice.deliverAfter,
              addUnit: invoice.deliverAfterTimeUnit
            })
          });
        }

        break;

      case 'INVOICE_ITEMS':
        const invoicesRes = await db
          .collection(COLLECTIONS.INVOICES)
          .find(filter)
          // .skip(offset)
          // .limit(limit)
          .toArray();

        const invoicesItems = [];

        for (const invoice of invoicesRes) {
          for (const product of invoice.products) {
            const selectedCustomer = await db
              .collection(COLLECTIONS.CUSTOMERS)
              .findOne({ _id: ObjectID(invoice.customerId) });
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

    return res || [];
  }

  async function add(invoice) {
    const db = dbConnection.getDb();

    let res = await db.collection(COLLECTIONS.INVOICES).insertOne({
      ...invoice,
      createdAt: getCurrectTimeStamp() / 1000
      // createdAt: new Date().getTime()
    });

    return opStatusGenerator({
      status: res.result.ok === 1,
      payload: res.result.ok === 1 ? res.ops[0] : null
    });
  }

  async function getNewInvoiceNo() {
    const db = dbConnection.getDb();

    let res = await db.collection(COLLECTIONS.LAST_INVOICE_NO).findOne();

    await db
      .collection(COLLECTIONS.LAST_INVOICE_NO)
      .update({ _id: res._id }, { $set: { invoiceNo: res.invoiceNo + 1 } });

    return res.invoiceNo + 1;
  }

  return {
    getAll,
    getPage,
    add,
    getNewInvoiceNo
  };
}

const repo = makeInvoiceRepository({ dbConnection });

module.exports = makeInvoiceRepository({ dbConnection });
module.exports.makeInvoiceRepository = makeInvoiceRepository;
