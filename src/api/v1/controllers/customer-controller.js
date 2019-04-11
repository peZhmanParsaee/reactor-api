const CustomerService = require('../../../services/db-services/customer-service');
const _customerService = new CustomerService();

function CustomerController() {}

CustomerController.prototype.getAll = async (req, res, next) => {
  try {
    const opStatus = await _customerService.getAll();
    res.json(opStatus);
  } catch (err) {
    next(err);
  }
}

CustomerController.prototype.search = async (req, res, next) => {
  try {
    const customerName = req.query.q;
    const opStatus = await _customerService.search(customerName);
    res.json(opStatus);
  } catch (error) {
    next(error);    
  }
}

module.exports = CustomerController;
