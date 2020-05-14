const assert = require('assert');
const CustomerService = require('../../../src/services/db-services/customer-service');

describe('Test CustomerService.getAll()', function() {
  it('Should returns all customers', function() {
    const _customerService = new CustomerService();

    _customerService.getAll()
      .then(customers => {
        console.log(customers);

        assert(true);
      })
      .catch(err => {
        console.error(err);
        assert(false);
      });
  });
});
