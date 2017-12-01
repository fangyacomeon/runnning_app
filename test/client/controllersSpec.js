// run tests with karma start

describe("Unit: Testing Controllers", function() {
  var $scope, $rootScope, $controller, $location, $httpBackend, createController;

  beforeEach(module('runPlannerApp'));

  beforeEach(inject(function($injector) {

    // mock out our dependencies
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    // used for factory testing:
      // Links = $injector.get('Links');
    $location = $injector.get('$location');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function (controller) {
      return $controller(controller, {
        $scope: $scope,
        // used for factory testing:
          // Links: Links,
        $location: $location
      });
    };

  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should have a MapController controller', function() {
    createController('MapController');
    expect($scope.lat).not.to.equal(null);
    expect($scope.lng).not.to.equal(null);
  });

  it('should have a WeatherController controller', function() {
    createController('WeatherController');
    expect($scope.celsius).not.to.equal(null);
    expect($scope.fahrenheit).not.to.equal(null);
  });

  it('should have a ClothingController controller', function() {
    createController('ClothingController');
    expect($scope.topCloth).not.to.equal(null);
    expect($scope.bottomCloth).not.to.equal(null);
  });

});