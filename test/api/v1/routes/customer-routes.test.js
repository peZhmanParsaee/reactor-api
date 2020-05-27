const supertest = require('supertest');
const expect = require('chai').expect;
const app = require('../../../../src/app');

describe('Customer routes test /api/v1/customer', function () {
  describe('GET /', function () {
    it('should return all customers', function (done) {
      supertest(app)
        .get('/api/v1/customer')
        .expect('Content-Type', /application\/json/)
        .end((err, res) => {
          if (err) done(err);
          expect(err).to.equal(null);

          expect(res.status).to.equal(200);
          expect(Array.isArray(res.body.payload)).to.equal(true);
          expect(res.body.status).to.equal(true);
          
          done();
        });
    });
  });
});
