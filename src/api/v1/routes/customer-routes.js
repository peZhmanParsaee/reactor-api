const express = require('express');
const router = express.Router();

const CustomerController = require('../controllers/customer-controller');
const _customerController = new CustomerController();

router.get("/", _customerController.getAll);

router.get("/search", _customerController.search);

module.exports = router;
