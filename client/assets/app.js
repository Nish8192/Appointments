var app = angular.module('app', ['ngRoute', 'ngCookies']);
app.config(function ($routeProvider) {
	$routeProvider
  .when('/', { templateUrl: 'partials/login.html'})
  .when('/appointments', {templateUrl:'partials/appointments.html'})
  .when('/new_appointment', {templateUrl: 'partials/new_appointment.html'})
  .otherwise({
    redirectTo: '/'
  });

});
