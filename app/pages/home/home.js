'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'pages/home/home.html',
    controller: 'HomeController',
    requiresAuthentication: true
  });
}])

.controller('HomeController',  ['$scope', '$http', '$location', 'AuthService', function ($scope, $http, $location, AuthService) {

  $scope.redirectToHome = function() {
    $location.path('/home');
  };

  $scope.redirectToMeusDados = function() {
    $location.path('/meusdados');
  };

  $scope.redirectToUsers = function() {
    $location.path('/users');
  };


  
  $scope.logout = function() {
    AuthService.logout();
    $location.path('/login');
    console.log(token)
  };





}]);