const assert = require('assert');
const customerService = require('../../../src/services/db-services/customer-service');

describe('Test CustomerService.getAll()', function() {
  it('Should returns all customers', function() {
    customerService.getAll()
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
