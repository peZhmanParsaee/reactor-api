const express = require('express');
const router = express.Router();

const InvoiceController = require('../controllers/invoice-controller');
const _invoiceController = new InvoiceController();

router.get('/new-invoice-no', _invoiceController.getNewInvoiceNo);

router.post('/', _invoiceController.add);

router.get('/', _invoiceController.getList);

module.exports = router;
