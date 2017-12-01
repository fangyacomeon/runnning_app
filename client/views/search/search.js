angular.module('runPlannerApp')

.controller('SearchController', function($scope, $state, Search, ResultHandler) {

  $scope.useSearchToGetResult = function() {
    $scope.addressError = false;
    $scope.distanceError = false;
    $scope.genderError = false;
    if ($scope.search) {
      if (!$scope.search.start) {
        $scope.addressError = true;
      }
      if (!$scope.search.distance) {
        $scope.distanceError = true;
      }
      if (!$scope.search.gender) {
        $scope.genderError = true;
      }
      if (!$scope.addressError && !$scope.distanceError && !$scope.genderError) {
        Search.getZipCode($scope.search)
        .then(function(zipCode) {
          Search.getWeather(zipCode)
          .then(function(weather) {
            ResultHandler.setWeather(weather);
            console.log(weather);
            Search.getClothing($scope.search.gender, weather)
            .then(function(clothing) {
              ResultHandler.setClothing(clothing);
              $state.go('result');
            })
          })
        })
        Search.getRoute($scope.search)
        .then(function(route) {
          ResultHandler.setRoute(route);
        })
      }
    } else {
      $scope.addressError = true;
      $scope.distanceError = true;
      $scope.genderError = true;
    }
  }
});
