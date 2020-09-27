const { expect } = require('chai');
const { makeSearchCustomers, makeGetAllCustomers } = require('../repository');
const { COLLECTIONS } = require('../../../common/enums');
const fakeDB = require('./fake-db');

describe('customer repository functions', () => {
  describe('getAllCustomers()', () => {
    it('should return a collection of customers', async () => {
      const getAllCustomers = makeGetAllCustomers({ COLLECTIONS, db: fakeDB });
      const customers = await getAllCustomers();

      expect(customers).to.be.an('array');
      expect(customers.length).to.equal(3);
      expect(customers.map(x => x.fullName)).to.include('Pezhman Parsaee');
    });
  });

  describe('searchCustomers()', () => {
    it('should return array of 1 item if search string Pezhman', async () => {
      const searchCustomers = makeSearchCustomers({ COLLECTIONS, db: fakeDB });

      const q = 'Pezhman';
      const customers = await searchCustomers(q);

      expect(customers).to.be.an('array');
      expect(customers.length).to.equal(1);
      expect(customers.map(x => x.fullName)).to.include('Pezhman Parsaee');
      expect(customers.map(x => x.fullName)).to.not.include('Bjarne Stroustup');
    });
  });
});
