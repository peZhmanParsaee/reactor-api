const lastInvoiceNoService = require('../../../services/db-services/last-invoice-no-service');
const invoiceService = require('../../../services/db-services/invoice-service')
  .default;
const NumberHelper = require('../../../infrastructures/helpers/number-helper');

function InvoiceController() {}

InvoiceController.prototype.getNewInvoiceNo = async (req, res, next) => {
  try {
    const opStatus = await lastInvoiceNoService.getNewInvoiceNo();
    res.json(opStatus);
  } catch (err) {
    next(err);
  }
};

InvoiceController.prototype.add = async (req, res, next) => {
  try {
    const invoice = req.body;
    const opStatus = await invoiceService().add(invoice);
    res.json(opStatus);
  } catch (err) {
    next(err);
  }
};

InvoiceController.prototype.getList = async (req, res, next) => {
  try {
    if (req.query.offset && req.query.limit) {
      const offset = NumberHelper.convertToInt(req.query.offset);
      const limit = NumberHelper.convertToInt(req.query.limit);
      const fromDate =
        req.query.fromDate && req.query.fromDate != 'null'
          ? req.query.fromDate
          : null;
      const toDate =
        req.query.toDate && req.query.toDate != 'null'
          ? req.query.toDate
          : null;
      const invoiceType = req.query.invoiceType;
      const opStatus = await invoiceService().getPage({
        offset,
        limit,
        fromDate,
        toDate,
        invoiceType
      });
      return res.json(opStatus);
    }

    const opStatus = await invoiceService().getAll();
    return res.json(opStatus);
  } catch (err) {
    next(err);
  }
};

module.exports = InvoiceController;
