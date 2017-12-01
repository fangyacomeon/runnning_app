angular.module('runPlannerApp')

.controller('MapController', function($scope, $sce, ResultHandler) {

  $scope.lat = ResultHandler.route.startLat || 37.7875176;
  $scope.lng = ResultHandler.route.startLng || -122.3998;
  $scope.routeNum = Math.floor(Math.random() * 4);

  $scope.reroute = function() {
    if ($scope.routeNum < 3) {
        $scope.routeNum++;
    } else {
        $scope.routeNum = 0;
    }
    console.log('the thingy');
    $scope.directionsHTML;
  }

  $scope.upCoord = {lat:ResultHandler.route.upCoordLat,lng:ResultHandler.route.upCoordLng};
  $scope.rightCoord = {lat: ResultHandler.route.rightCoordLat,lng: ResultHandler.route.rightCoordLng};
  $scope.downCoord = {lat: ResultHandler.route.downCoordLat,lng: ResultHandler.route.downCoordLng};

  // generates google map with directions from given coordinates
  $scope.directionsSrc = function() {
    return 'https://www.google.com/maps/embed/v1/directions?origin=' + $scope.lat + ',' + $scope.lng + '&destination=' + $scope.lat + ',' + $scope.lng + '&waypoints=' + $scope.upCoord.lat[$scope.routeNum] + ',' + $scope.upCoord.lng[$scope.routeNum] + '|' + $scope.rightCoord.lat[$scope.routeNum] + ',' + $scope.rightCoord.lng[$scope.routeNum] + '|' + $scope.downCoord.lat[$scope.routeNum] + ',' + $scope.downCoord.lng[$scope.routeNum] + '&mode=walking&key=AIzaSyCBVw8evllNw1FaR2OXfFQvmJ-8jBpKWAI&zoom=14&center=' + $scope.lat + ',' + $scope.lng;
}
  console.log("result.map.js line 17: directions source api request", $scope.directionsSrc);

  // sets google map html for result.map.js
  $scope.directionsHTML = function() {
    return '<iframe frameborder="0" align="center"style="border:0" src="' + $scope.directionsSrc() + '"></iframe>';
}

  $scope.htmlSafe = function(data) {
    return $sce.trustAsHtml(data);
  }
})

.filter('toTrusted', function($sce) {
    return function(value) {
        return $sce.trustAsHtml(value);
    };
});


