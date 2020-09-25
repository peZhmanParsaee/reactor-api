const repository = require('./repository');
const opStatusGenerator = require('../../common/helpers/op-status-generator');
const addProductBuilder = require('./builder/add-builder');

function getAll({ repository }) {
  return async function(req, res, next) {
    try {
      const provinces = await repository.getAll();

      res.json({
        status: true,
        payload: provinces
      });
    } catch (err) {
      next(err);
    }
  };
}

function add({ repository, addProductBuilder }) {
  return async function(req, res, next) {
    try {
      const viewModel = addProductBuilder
        .setName(req.body.name)
        .setStock(req.body.stock)
        .setUnitPrice(req.body.setUnitPrice)
        .build();

      // req.check('name')
      //   .notEmpty().withMessage('نام محصول اجباری است')
      //   .isLength({ min: 2, max: 50 }).withMessage('نام محصول تنها میتواند 2 تا 50 کاراکتر طول داشته باشد');

      // req.check('stock')
      //   .notEmpty().withMessage('موجودی اجباری است')
      //   .matches(/^[1-9]{1}[0-9]{0,6}$/).withMessage('موجودی باید یک عدد باشد');

      // req.check('unitPrice')
      //   .notEmpty().withMessage('قیمت واحد اجباری است')
      //   .matches(/^[1-9]{1}[0-9]{0,5}$/).withMessage('قیمت واحد باید یک عدد باشد');

      // const validationResult = await req.getValidationResult();

      // if ((!validationResult.isEmpty())) {
      //   const opStatus1 = opStatusGenerator({
      //     status: false,
      //     payload: res.body,
      //     errors: validationResult.array()
      //   });
      //   console.dir(opStatus1);
      //   return res.json(opStatus1);
      // }

      const newProduct = viewModel;
      const opStatus = await productService.add(newProduct);
      res.json(opStatus);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = {
  getAll: getAll({ repository }),
  add: add({ repository, addProductBuilder })
};
