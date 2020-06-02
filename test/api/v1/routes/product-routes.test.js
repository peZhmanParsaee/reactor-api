const request = require('supertest');
const should = require('chai').should();

const app = require('../../../../src/app');

describe('Product routes', function() {
  describe('GET /api/v1/product', () => {
    it('should return all products', function(done) {
      request(app)
        .get('/api/v1/product')
        .expect('Content-Type', /application\/json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          should.not.exist(err);
          res.status.should.equal(200);
          res.body.status.should.equal(true);

          done();
        });
    });
  });
});
