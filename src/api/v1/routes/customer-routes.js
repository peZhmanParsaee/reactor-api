const express = require('express');
const router = express.Router();

const CustomerController = require('../controllers/customer-controller');
const customerController = new CustomerController();

router.get('/', customerController.getAll);

router.get('/search', customerController.search);

module.exports = router;
