const assert = require('assert');
const customerService = require('../../../src/services/db-services/customer-service');

describe('Test CustomerService.getAll()', function() {
  it('Should returns all customers', function() {
    customerService.getAll()
      .then(customersResponse => {
        assert(customersResponse.status);
        assert(!!customersResponse.payload && !!customersResponse.payload.length)
      })
      .catch(() => {
        assert(false);
      });
  });
});
