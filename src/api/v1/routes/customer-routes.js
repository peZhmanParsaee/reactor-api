const express = require('express');
const customerService = require('../../../services/db-services/customer-service');

const router = express.Router();

router.get('/', customerService.getAll);

router.get('/search', customerService.search);

module.exports = router;
