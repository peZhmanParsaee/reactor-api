const supertest = require('supertest');
const expect = require('chai').expect;

const app = require('../../../../src/app');

describe('Customer routes test /api/v1/customer', function () {
  describe('GET /api/v1/customer', function () {
    it('should return all customers', function (done) {
      supertest(app)
        .get('/api/v1/customer')
        .expect('Content-Type', /application\/json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(err).to.equal(null);

          expect(res.status).to.equal(200);
          expect(Array.isArray(res.body.payload)).to.equal(true);
          expect(res.body.status).to.equal(true);
          
          done();
        });
    });
  });

  describe('GET /api/v1/customer/search', function () {
    it('should serach some customers', function (done) {
      supertest(app)
        .get('/api/v1/customer/search?q=xxx')
        .expect('Content-Type', /application\/json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(err).to.equal(null);

          expect(res.status).to.equal(200);
          expect(Array.isArray(res.body.payload)).to.equal(true);
          expect(res.body.status).to.equal(true);
          
          done();
        });
    });
  });
});
