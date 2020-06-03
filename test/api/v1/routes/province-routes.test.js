const request = require('supertest');
const expect = require('chai').expect;

const app = require('../../../../src/app');

describe('Provinces routes test /api/v1/province', function() {
  describe('GET /api/v1/province', function() {
    it('should return HTTP 200 with provinces list in the database', function(done) {
      request(app)
        .get('/api/v1/province')
        .expect('Content-Type', /application\/json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          expect(err).to.equal(null);
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal(true);
          expect(Array.isArray(res.body.payload)).to.equal(true);

          done();
        });
    });
  });

  describe('POST /api/v1/province', function() {
    it('should return HTTP 404', function(done) {
      request(app)
        .post('/api/v1/province')
        .expect(404, done);
    });
  });
});
