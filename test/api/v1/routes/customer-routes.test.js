'use strict';

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
          expect(err).toEqual(null);
          expect(Array.isArray(res.body)).toEqual(true);
          done();
        });
    });
  });
});
