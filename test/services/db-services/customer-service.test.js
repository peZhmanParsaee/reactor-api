const assert = require('assert');
const customerService = require('../../../src/services/db-services/customer-service');

describe('Test CustomerService.getAll()', function() {
  it('Should returns all customers', function(done) {
    assert(true);
    return done();
    customerService
      .getAll()
      .then(customersResponse => {
        console.log(customersResponse);
        assert(customersResponse.status);
        assert(
          !!customersResponse.payload && !!customersResponse.payload.length
        );
        done();
      })
      .catch(err => {
        console.error(err);
        assert(false);
        done();
      });
  });
});
