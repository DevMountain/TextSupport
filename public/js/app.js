var app = angular.module('TextSupport', ['firebase', 'ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'templates/main.html',
      controller: 'MainCtrl'
    })
    .when('/support', {
      templateUrl: 'templates/support.html',
      controller: 'SupportCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
});
