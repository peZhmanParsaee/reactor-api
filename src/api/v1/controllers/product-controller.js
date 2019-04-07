const ProductService = require('../../../services/db-services/product-service');
const opStatusGenerator = require('../../../infrastructures/helpers/op-status-generator');
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
    req.check('name')
      .notEmpty().withMessage('نام محصول اجباری است')
      .isLength({ min: 2, max: 50 }).withMessage('نام محصول تنها میتواند 2 تا 50 کاراکتر طول داشته باشد');
    
    req.check('stock')
      .notEmpty().withMessage('موجودی اجباری است')
      .matches(/^[0-9]{10}/).withMessage('موجودی باید یک عدد باشد');
    
    req.check('unitPrice')
      .notEmpty().withMessage('قیمت واحد اجباری است')
      .matches(/^[0-9]{10}/).withMessage('قیمت واحد باید یک عدد باشد');
    
    const validationResult = await req.getValidationResult();

    if ((!validationResult.isEmpty())) {
      const opStatus1 = opStatusGenerator({
        status: false,
        payload: res.body,
        errors: validationResult.array()
      });
      return res.json(opStatus1);
    }
    
    const newProduct = req.body;
    const opStatus = await _productService.add(newProduct);
    res.json(opStatus);
  } catch (err) {
    next(err);
  }
}

module.exports = ProductController;
