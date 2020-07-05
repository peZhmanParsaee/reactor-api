const express = require('express');

const router = express.Router();
const productService = require('../../../services/db-services/product-service');

router.get('/', productService.getAll);

router.post('/', productService.add);

module.exports = router;
