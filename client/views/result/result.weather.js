angular.module('runPlannerApp')

  .controller('WeatherController', function($scope, ResultHandler) {

    $scope.celsius = ResultHandler.weather.celsius;
    $scope.fahrenheit = ResultHandler.weather.fahrenheit;
    $scope.humidity = ResultHandler.weather.humidity;
    $scope.wind = ResultHandler.weather.wind;
    $scope.weather = ResultHandler.weather.weather;
  });
