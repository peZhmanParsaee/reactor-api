const ProductService = require('../../../services/db-services/product-service');
const _productService = new ProductService();

function ProductController () {}

ProductController.prototype.getAll = async (req, res, next) => {
  try {
    const opStatus = await _productService.getAll();
    res.json(opStatus);
  } catch (err) {
    next(err);
  }
}

ProductController.prototype.add = async (req, res, next) => {
  try {
    const newProduct = req.body;
    const opStatus = await _productService.add(newProduct);
    res.json(opStatus);
  } catch (err) {
    next(err);
  }
}

module.exports = ProductController;
