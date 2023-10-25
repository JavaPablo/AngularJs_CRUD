'use strict';

angular.module('myApp.login', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/login', {
      templateUrl: 'pages/login/login.html',
      controller: 'loginController', 
      requeresAuthentication: false
    });

  }])

  .controller('loginController', ['$scope', '$location', '$http',  '$timeout', function ($scope, $location, $http, $timeout) {

    $scope.usuario = {};
    const url = "http://localhost:8080/login";

    $scope.redirectToHome = async () => {
      const url = "http://localhost:8080/login";
      const body = JSON.stringify({
        login: $scope.login,
        senha: $scope.password
      });
    
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: body
        });
    
        if (response.ok) {
          const data = await response.json();
          
          // Decodificar o token para obter o ID do usuário
          const tokenPayload = JSON.parse(atob(data.token.split('.')[1]));
          const userId = tokenPayload.userId; // Substitua "userId" pela chave correta
    
          localStorage.setItem('auth', data.token);
          localStorage.setItem('userId', userId); // Armazena o ID do usuário
          
          window.location.assign('http://localhost:3000/#!/home');
        } else {
          $scope.errorMessage = "Usuario ou Senha Inválidos!" + response.statusText;
          $timeout(function () {
            $scope.errorMessage = undefined;
          }, 7000);
        }
      } catch (error) {
        $scope.errorMessage = "Erro na solicitação de autenticacao: " + error;
      }
    };
    
    $scope.redirectToCadastro = function() {
      $location.path('/cadastro');
    };
  }]);
