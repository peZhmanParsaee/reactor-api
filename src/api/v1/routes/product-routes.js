const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/product-controller');
const _productController = new ProductController();

router.get('/', _productController.getAll);

router.post('/', _productController.add);


module.exports = router;
