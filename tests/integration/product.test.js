const request = require('supertest');
const expect = require('chai').expect;

const app = require('../../src/app');
const dbConnection = require('../../src/db/connection');

describe('/api/v1/product', () => {
  afterEach(function(done) {
    dbConnection
      .getDb()
      .collection('products')
      .deleteMany({})
      .then(() => {
        done();
      });
  });

  describe('GET /', () => {
    it('should return all products', async () => {
      await dbConnection
        .getDb()
        .collection('products')
        .insertMany([
          { name: 'product1', numberInStock: 10, unitPrice: 10 },
          { name: 'product2', numberInStock: 6, unitPrice: 19.99 },
          { name: 'product3', numberInStock: 2, unitPrice: 39.99 }
        ]);

      const res = await request(app).get('/api/v1/product');

      expect(res.status).to.equal(200);
      expect(Array.isArray(res.body)).to.equal(true);
      expect(res.body.length).to.equal(3);
      expect(res.body.some(p => p.name === 'product1')).to.equal(true);
      expect(res.body.some(p => p.name === 'product2')).to.equal(true);
      expect(res.body.some(p => p.name === 'product3')).to.equal(true);
    });
  });
});
