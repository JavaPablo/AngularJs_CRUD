// app.factory('AuthService', ['$http', function($http) {
//     var service = {};

//     service.login = function(credentials) {
//         return $http.post('http://localhost:8080/login', credentials);
//     };

//     service.setToken = function(token) {
//         localStorage.setItem('token', token);
//     };

//     service.getToken = function() {
//         return localStorage.getItem('token');
//     };

//     service.checkAuth = function() {
//         var token = service.getToken();
//         return token ? true : false;
//     };

//     return service;
// }]);
