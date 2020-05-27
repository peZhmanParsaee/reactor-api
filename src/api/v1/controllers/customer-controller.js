const customerService = require('../../../services/db-services/customer-service');

function CustomerController() {}

CustomerController.prototype.getAll = async (req, res, next) => {
  try {
    const opStatus = await customerService.getAll();
    res.json(opStatus);
  } catch (err) {
    next(err);
  }
};

CustomerController.prototype.search = async (req, res, next) => {
  try {
    const customerName = req.query.q;
    const opStatus = await customerService.search(customerName);
    res.json(opStatus);
  } catch (error) {
    next(error);    
  }
};

module.exports = CustomerController;
