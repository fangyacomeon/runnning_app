angular.module('runPlannerApp')

.factory('Search', function($http) {

  var getZipCode = function(searchInput) {
    return $http({
      method: 'GET',
      url: 'https://maps.googleapis.com/maps/api/geocode/json',
      params: {address: searchInput.start}
    })
    .then(function(response) {
      var zipCodeObj = response.data.results[0].address_components.filter(function(obj){return obj.types[0] === "postal_code"});
      var zipCode = zipCodeObj[0].long_name;
      return zipCode;
    })
  };

  var getWeather = function(zipCode) {
    return $http({
      method: 'GET',
      url: '/api/weather',
      params: {zipCode: zipCode}
    })
    .then(function(response) {
      var weatherData = response.data;
      var weather = {
        celsius: weatherData.temp.C,
        fahrenheit: weatherData.temp.F,
        humidity: weatherData.humidity,
        wind: weatherData.wind.speed,
        weather: weatherData.weather
      }
      return weather;
    })
  }

  var getRoute = function(searchInput) {
    return $http({
      method: 'GET',
      url: '/api/route',
      params: searchInput
    })
    .then(function(response) {
      var routeData = response.data;
      var route = {
        startLat: routeData.start.lat,
        startLng: routeData.start.lng,
        upCoordLat: routeData.wayPoints[0].lat,
        upCoordLng: routeData.wayPoints[0].lng,
        rightCoordLat: routeData.wayPoints[1].lat,
        rightCoordLng: routeData.wayPoints[1].lng,
        downCoordLat: routeData.wayPoints[2].lat,
        downCoordLng: routeData.wayPoints[2].lng
      }
      return route;
    })
  }

  var getClothing = function(gender, weather) {
    var dataForClothing = weather;
    dataForClothing.gender = gender;
    console.log('data sending to clothing api: ', dataForClothing);
    return $http({
      method: 'GET',
      url: '/api/clothing',
      params: dataForClothing
    })
    .then(function(response) {
      return response.data;

    })
  }

  return {
    getZipCode: getZipCode,
    getWeather: getWeather,
    getRoute: getRoute,
    getClothing: getClothing
  };
})


.factory('ResultHandler', function() {
  var weatherObj = {};
  var clothingObj = {};
  var routeObj = {};


  var setWeather = function(resultApi) {
    weatherObj.celsius = resultApi.celsius;
    weatherObj.fahrenheit = resultApi.fahrenheit;
    weatherObj.humidity = resultApi.humidity;
    weatherObj.wind = resultApi.wind;
    weatherObj.weather = resultApi.weather;
  };

  var setClothing = function(resultDb) {
    clothingObj.top = resultDb.top;
    clothingObj.bottom = resultDb.bottom;
  };

  var setRoute = function(resultApi) {
    routeObj.startLat = resultApi.startLat;
    routeObj.startLng = resultApi.startLng;
    routeObj.upCoordLat = resultApi.upCoordLat;
    routeObj.upCoordLng = resultApi.upCoordLng;
    routeObj.rightCoordLat = resultApi.rightCoordLat;
    routeObj.rightCoordLng = resultApi.rightCoordLng;
    routeObj.downCoordLat = resultApi.downCoordLat;
    routeObj.downCoordLng = resultApi.downCoordLng;
  };

  return {
    setWeather: setWeather,
    setClothing: setClothing,
    setRoute: setRoute,
    weather: weatherObj,
    clothing: clothingObj,
    route: routeObj
  }
});