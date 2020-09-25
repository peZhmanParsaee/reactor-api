const express = require('express');
const router = express.Router();

const controller = require('../../../area/invoice/controller');

router.get('/new-invoice-no', controller.getNewInvoiceNo);

router.post('/', controller.add);

router.get('/', controller.list);

module.exports = router;
