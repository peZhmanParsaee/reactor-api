const LastInvoiceNoService = require('../../../services/db-services/last-invoice-no-service');
const InvoiceService = require('../../../services/db-services/invoice-service');
const NumberHelper = require('../../../infrastructures/helpers/number-helper');
const _lastInvoiceNoService = new LastInvoiceNoService();
const _invoiceService = new InvoiceService();

function InvoiceController() {}

InvoiceController.prototype.getNewInvoiceNo = async (req, res, next) => {
  try {
    const opStatus = await _lastInvoiceNoService.getNewInvoiceNo();
    res.json(opStatus);
  } catch (err) {
    next(err);
  }
}

InvoiceController.prototype.add = async (req, res, next) => {
  try {
    const invoice = req.body;
    const opStatus = await _invoiceService.add(invoice);
    res.json(opStatus);
  } catch (err) {
    next(err);
  }
}

InvoiceController.prototype.getList = async (req, res, next) => {
  try {    

    if (req.query.offset && req.query.limit) {
      const offset = NumberHelper.convertToInt(req.query.offset);
      const limit = NumberHelper.convertToInt(req.query.limit);
      const fromDate = req.query.fromDate;
      const toDate = req.query.toDate;
      const invoiceType = req.query.invoiceType;

      const opStatus = await _invoiceService.getPage({ offset, limit, fromDate, toDate, invoiceType });
      return res.json(opStatus);
    } else {
      const opStatus = await _invoiceService.getAll();
      return res.json(opStatus);
    }    
  } catch (err) {
    next(err);
  }
}

module.exports = InvoiceController;
