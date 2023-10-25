'use strict';

angular.module('myApp.cadastro', ['ngRoute'])

.directive('cadastro', function() {
  return {
    restrict: 'E',
    templateUrl: 'pages/cadastro/cadastro.html',
    controller: 'CadastroController',
    controllerAs: 'vm'
  };
})

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/cadastro', {
      templateUrl: 'pages/cadastro/cadastro.html',
      controller: 'CadastroController', 
      requeresAuthentication: true
    });
  }])

  .controller('CadastroController', ['$scope', '$http', '$location', '$timeout', function ($scope, $http, $location, $timeout) {

    $scope.usuario = {};
    const url = "http://localhost:8080/usuarios";
  
    $scope.cadastrarUsuario = async () => {
      url: url;
      const body = JSON.stringify({
        nome: $scope.usuario.nome,
        email: $scope.usuario.email,
        senha: $scope.usuario.senha,
        login: $scope.usuario.login,
        confirmeSenha: $scope.usuario.confirmeSenha
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
          $scope.message = "Usuário cadastrado com sucesso";
          $timeout(function() {
            if(!$scope.$$phase) {
              // safe to use $apply()
              $scope.$apply(function() {
                $scope.message = null;
              });
            }
          }, 5000);
    
          // Limpa todos os campos após o cadastro bem-sucedido
          if(!$scope.$$phase) {
            // safe to use $apply()
            $scope.$apply(function() {
              $scope.usuario = {};
            });
          }
        } else {
          $scope.message = "Não foi possível cadastrar o usuário, já existe um usuário com este email ou login!" + response.statusText;
          $timeout(function() {
            if(!$scope.$$phase) {
              // safe to use $apply()
              $scope.$apply(function() {
                $scope.message = null;
              });
            }
          }, 5000);
        }
      } catch (error) {
        $scope.message = "Erro na solicitação: " + error;
        $timeout(function() {
          if(!$scope.$$phase) {
            // safe to use $apply()
            $scope.$apply(function() {
              $scope.message = null;
            });
          }
        }, 5000);
      }
    };
    
    $scope.redirectToLogin = function() {
      $location.path('/login');
    };
    


  }]);
  