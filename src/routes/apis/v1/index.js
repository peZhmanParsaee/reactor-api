const express = require('express');
const customerRoutes = require('./customer');
const provinceRoutes = require('./province');
const productRoutes = require('./product');
const invoiceRoutes = require('./invoice');

const router = express.Router();

router.use('/customer', customerRoutes);
router.use('/province', provinceRoutes);
router.use('/product', productRoutes);
router.use('/invoice', invoiceRoutes);

module.exports = router;
