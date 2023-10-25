'use strict';

angular.module('myApp', [
  'ngRoute',
  'myApp.login',
  'myApp.cadastro',
  'myApp.users',
  'myApp.home',
  'myApp.meusdados',
  'myApp.version'
])
// Define o serviço AuthService
.service('AuthService', function() {
  this.isLoggedIn = function() {
      return !!localStorage.getItem('auth');
  };

  this.login = function(token) {
      localStorage.setItem('auth', token);
  };

  this.logout = function() {
      localStorage.removeItem('auth');
      localStorage.removeItem('userId');
  };

  this.getUserId = function() {
      const token = localStorage.getItem('auth');
      if (!token) return null;

      // Decodificar o token para obter o ID do usuário
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      return tokenPayload.userId; // Substitua "userId" pela chave correta
  };
})
.config(['$locationProvider', '$routeProvider', '$httpProvider', function($locationProvider, $routeProvider, $httpProvider) {
  $locationProvider.hashPrefix('!');

  // Define o interceptor de requisições HTTP
  const requestInterceptor = ['$q', '$rootScope', '$injector', 'AuthService',
  function ($q, $rootScope, $injector, AuthService) {
    const interceptorInstance = {
      request: function (config) {

        const token = localStorage.getItem('auth');

        config.headers.Authorization = 'Bearer ' + token;
      
       
        return config || $q.when(config);
      }
    };
    return interceptorInstance;
  }];

$httpProvider.interceptors.push(requestInterceptor);

  $routeProvider.otherwise({redirectTo: '/login'});
}])
// Adiciona um ouvinte para o evento $routeChangeStart
.run(['$rootScope', '$location', 'AuthService', function($rootScope, $location, AuthService) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
        // Se a próxima rota requer autenticação e o usuário não está logado,
        // impede a navegação para a rota e redireciona para a página de login
        if (nextRoute.requiresAuthentication && !AuthService.isLoggedIn()) {
            event.preventDefault(); /* prevent navigation to route */
            $location.path('/login');
        }
    });
}]);
