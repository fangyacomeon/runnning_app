angular.module('runPlannerApp')

.controller('ClothingController', function($scope, ResultHandler) {
  // displayed top and bottom clothing is gender specific
  $scope.topCloth = ResultHandler.clothing.top || 'shirt';
  $scope.bottomCloth = ResultHandler.clothing.bottom || 'shorts';
});
