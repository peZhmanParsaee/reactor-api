const expect = require('chai').expect;
const db = require('../../db');

const deps = { db };

var invoiceService = require('../../../src/services/db-services/invoice-service').invoiceService(
  deps
);

describe('invoiceService.getAll()', function() {
  it('should return a list of invoices correctly', async () => {
    var invoiceResult = await invoiceService.getAll();
    console.log('invoice result: ', invoiceResult);
    expect(invoiceResult.status).to.equal(true);
    expect(invoiceResult.payload).to.be.an('array');
    expect(invoiceResult).to.have.property('payload');
  });
});
