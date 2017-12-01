var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var http = require('http');
var utils = require('./utils.js');
var db = require('./db.js');

app.use(express.static(__dirname + "/../client"));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// use port 3000 on your local environment.
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/../client'));

// API REQUESTS
// get weather data
app.get('/api/weather', function(req, res){
  var zipCode = req.query.zipCode || 94704; // maybe change .data
  var result = {};
  var url = 'http://api.openweathermap.org/data/2.5/weather?zip=' + zipCode + '&APPID=4c6cc98f057ca6adfacf7fba20a94125';
  request(url, function(error, response, body) {
    if (!error && res.statusCode === 200) {
      // result.temp = {'F': Math.round(JSON.parse(body).main.temp), 'C': Math.round(utils.convertToMetric(JSON.parse(body).main.temp))};
      result.temp = {'C': Math.round(JSON.parse(body).main.temp) - 273, 'F': (Math.round(JSON.parse(body).main.temp) - 273) *9/5 +32};
      result.humidity = JSON.parse(body).main.humidity;
      result.wind = JSON.parse(body).wind;
      result.weather = JSON.parse(body).weather[0].main;
      result.zipCode = zipCode;
      res.json(result);
    } else {
      console.error(error);
    }
  });
});

// get geocode latlong data
app.get('/api/route', function(req, res) {
  var startAddress = req.query.start || '611 Mission Street, San Francisco, CA';
  startAddress = startAddress.replace(' ', '+');
  var distance = req.query.distance || 3;
  var coordinates = {};
  var start = 'http://maps.googleapis.com/maps/api/geocode/json?address=' + startAddress + '&key=';

  // check if there is an end address. If no end address, then need to make a route
  if (req.query.end) {
    var destAddress = req.query.end || null;
    destAddress = destAddress.replace(' ', '+');
    var end = 'http://maps.googleapis.com/maps/api/geocode/json?address=' + destAddress + '&key=';
  }

  var getStart = function(callback) {
    return request(start, function(error, response, body) {
      if (!error && res.statusCode === 200) {
        callback(JSON.parse(body).results[0].geometry.location);
      } else {
        console.error(error);
      }
    })
  };

  getStart(function(startPoint) {
      coordinates.start = startPoint;
      if (destAddress) {
        request(end, function(error, response, body) {
          if (!error && res.statusCode === 200) {
            coordinates.end = JSON.parse(body).results[0].geometry.location;
            res.json(coordinates);
          } else {
            console.error(error);
          }
        });
      } else {
        coordinates.wayPoints = [];
        var routeDist = distance/4;
        var upCoord = {};
        var rightCoord = {};
        var downCoord = {};

        // originally only one coordinate. Now multiple, so upCoord is more like a firstCoord.
        upCoord.lat = [
        coordinates.start.lat + utils.latConvert(routeDist), 
        coordinates.start.lat, 
        coordinates.start.lat - utils.latConvert(routeDist), 
        coordinates.start.lat];

        upCoord.lng = [
        coordinates.start.lng,
        coordinates.start.lng + utils.longConvert(routeDist),
        coordinates.start.lng,
        coordinates.start.lng - utils.longConvert(routeDist)
        ];

        rightCoord.lat = [
        upCoord.lat[0], 
        upCoord.lat[1] - utils.latConvert(routeDist), 
        upCoord.lat[2], 
        upCoord.lat[3] + utils.latConvert(routeDist)
        ];

        rightCoord.lng = [
        upCoord.lng[0] + utils.longConvert(routeDist), 
        upCoord.lng[1], 
        upCoord.lng[2] - utils.longConvert(routeDist), 
        upCoord.lng[3]
        ];

        downCoord.lat = [
        rightCoord.lat[0] - utils.latConvert(routeDist),
        rightCoord.lat[1],
        rightCoord.lat[2] + utils.latConvert(routeDist),
        rightCoord.lat[3]
        ];

        downCoord.lng = [
        rightCoord.lng[0],
        rightCoord.lng[1] - utils.longConvert(routeDist),
        rightCoord.lng[2],
        rightCoord.lng[3] + utils.longConvert(routeDist)
        ];

        coordinates.wayPoints.push(upCoord);
        coordinates.wayPoints.push(rightCoord);
        coordinates.wayPoints.push(downCoord);

        res.json(coordinates);
      }
    })
});

// get clothes images
app.get('/api/clothing', function(req, res){
  var weather = req.query.weather;
  var gender = req.query.gender.toLowerCase();
  var tempScore = utils.calcTempScore(req.query);
  db.findOne({gender: gender}, function(err, clothes) {
    if (err) {
      return console.error(err);
    }
    var clothesKey = utils.getTempString(tempScore);
    console.log(clothes[clothesKey]);
    res.json(clothes[clothesKey]);
  });
});

app.listen(port);

exports.app = app;

console.log('Listening on port ' + port);

