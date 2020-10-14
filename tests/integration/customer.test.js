const request = require('supertest');
const expect = require('chai').expect;
const server = require('../../src/app');
const dbConnection = require('../../src/db/connection');

describe('/api/v1/customer', () => {
  afterEach(function(done) {
    dbConnection
      .getDb()
      .collection('customers')
      .deleteMany({})
      .then(() => {
        done();
      });
  });

  describe('GET /', () => {
    it('should return all customers', async () => {
      await dbConnection
        .getDb()
        .collection('customers')
        .insertMany([
          { fullName: 'Pezhman Parsaee' },
          { fullName: 'john Doe' }
        ]);

      const res = await request(server).get('/api/v1/customer');

      expect(res.status).to.equal(200);
      expect(res.body.status).to.equal(true);
      expect(Array.isArray(res.body.payload)).to.equal(true);
      expect(res.body.payload.length).to.equal(2);
    });
  });
});
