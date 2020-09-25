const repository = require('./repository');
const NumberHelper = require('../../common/helpers/number-helper');
const listBuilder = require('./builder/list-builder');

function getNewInvoiceNo({ repository }) {
  return async function(req, res, next) {
    try {
      const invoiceNo = await repository.getNewInvoiceNo();

      return res.json({
        status: true,
        payload: invoiceNo
      });
    } catch (err) {
      next(err);
    }
  };
}

function add({ repository }) {
  return async function(req, res, next) {
    try {
      const invoice = req.body;
      const opStatus = await repository.add(invoice);
      res.json(opStatus);
    } catch (err) {
      next(err);
    }
  };
}

function list({ repository, listBuilder }) {
  return async function(req, res, next) {
    try {
      const model = listBuilder
        .setFromDate(req.query.fromDate)
        .setToDate(req.query.toDate)
        .setInvoiceType(req.query.invoiceType)
        .setOffset(req.query.offset)
        .setLimit(req.query.limit)
        .build();

      const invoicesChunk = repository.getPage({
        offset: model.offset,
        limit: model.limit,
        fromDate: model.fromDate,
        toDate: model.toDate,
        invoiceType: model.invoiceType
      });

      return res.json({
        status: true,
        payload: invoicesChunk
      });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = {
  getNewInvoiceNo: getNewInvoiceNo({ repository }),
  add: add({ repository }),
  list: list({ repository, listBuilder })
};
