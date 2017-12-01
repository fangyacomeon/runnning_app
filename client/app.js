// Declare app level module which depends on views, and components
angular.module('runPlannerApp', [
  'ui.router', 'ngSanitize'
])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('search', {
      url: '/',
      templateUrl: 'views/search/search.html',
      controller: 'SearchController'
    })

    .state('result', {
      url: '/result',
      views: {
        // root
        '': {
          templateUrl: 'views/result/result.html',
        },
        // child;
        /** viewname@statename: viewname is the name used in the view directive;  state name is the state's absolute name, e.g. result or contact.item. */
        'weather@result': {
          templateUrl: 'views/result/result.weather.html',
          controller: 'WeatherController'
        },
        // child
        'map@result': {
          templateUrl: 'views/result/result.map.html',
          controller: 'MapController'
        },
        // child
        'clothing@result': {
          templateUrl: 'views/result/result.clothing.html',
          controller: 'ClothingController'
        }
      }
    })
});