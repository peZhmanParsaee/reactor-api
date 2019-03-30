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

module.exports = CustomerController;
