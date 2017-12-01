var chai = require('../node_modules/chai/chai.js');
var request = require('supertest');
var db = require('../server/db.js');
var app = require('../server/server.js').app;
var should = require('should');
var assert = chai.assert,  
    expect = chai.expect

describe('API calls', function() {
  
  it('should test call to weather api', function(done) {
    request(app)
    .get('/api/weather')
    .query({zipCode: 60103})
    .expect(200)
    .end(function(error, res) {
      res.body.zipCode.should.exist;
      res.body.zipCode.should.equal('60103');
      res.body.weather.should.exist;
      res.body.weather.should.be.type('string');
      res.body.temp.F.should.exist;
      done(error);
    });
  });

  it('should test call to clothing api', function(done) {
    request(app)
    .get('/api/clothing')
    .query({
      celsius: 34, 
      fahrenheit: 94, 
      gender: 'male', 
      humidity: 39, 
      weather: "Clouds", 
      wind: 20.09
    })
    .expect(200)
    .end(function(error, res) {
      res.body.bottom.should.exist;
      res.body.top.should.exist;

      var imageTestRegex = /^https?:\/\/(?:[a-z\-]+\.)+[a-z]{2,6}(?:\/[^\/#?]+)+\.(?:jpe?g|gif|jpg|png)$/;
      imageTestRegex.test(res.body.bottom).should.equal(true);
      imageTestRegex.test(res.body.top).should.equal(true);
      done(error);
    });
  });
});
