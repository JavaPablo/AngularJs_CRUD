'use strict';

angular.module('myApp.meusdados', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/meusdados', {
    templateUrl: 'pages/meusdados/meusdados.html',
    controller: 'MeusdadosController',
    requiresAuthentication: true
  });
}])

.controller('MeusdadosController',  ['$scope', '$http', '$location', '$timeout', 'AuthService', function ($scope, $http, $location, $timeout, AuthService) {
    
  $scope.listUsuario = [];
  const userId = localStorage.getItem('userId');

  // Defina um objeto para armazenar os dados editados do usuário
  $scope.editedUser = {};

  $scope.isEditing = false;

  
    $http.get('http://localhost:8080/usuarios/' + userId)
        .then(function(response) {
            // Atribui os dados do usuário retornados pela consulta para $scope.user
            $scope.user = response.data;

            // Faz uma cópia dos dados do usuário para $scope.editedUser
            $scope.editedUser = angular.copy($scope.user);
        })
        .catch(function(error) {
            console.error('Erro na consulta por Usuario:', error);
        });

    $scope.isEditing = false;

    $scope.editUser = function () {
        $scope.isEditing = true;
    };

    $scope.saveUser = function () {
        // Faz uma solicitação PUT para atualizar os dados do usuário no servidor
        $http.put('http://localhost:8080/usuarios/' + userId, $scope.editedUser)
            .then(function(response) {
                // A atualização foi bem-sucedida
                // Atualize $scope.user com os novos dados do usuário
                $scope.user = angular.copy($scope.editedUser);
      
                $scope.isEditing = false;
                $scope.message = "Seus dados foram atualizados com sucesso!";
                
                // Apaga a mensagem após 5 segundos
                $timeout(function() {
                    $scope.$apply(function() {
                        $scope.message = null;
                    });
                }, 5000);
            })
            .catch(function(error) {
                // Lidere com erros de atualização, se necessário
                console.error('Erro ao salvar os dados do usuário:', error);
                $scope.message = "Ocorreu um erro ao atualizar seus dados.";
                
                // Apaga a mensagem após 5 segundos
                $timeout(function() {
                    $scope.$apply(function() {
                        $scope.message = null;
                    });
                }, 5000);
            });
    };
    
    
    
    

       
    $scope.cancelEdit = function () {
        // Implemente a lógica para cancelar a edição e restaurar os dados originais
        // Pode ser necessário reverter $scope.editedUser para os valores originais

        $scope.isEditing = false;
    };

    $scope.redirectToHome = function() {
        $location.path('/home');
    };

    $scope.redirectToUsers = function() {
        $location.path('/users');
    };

    $scope.redirectToMeusDados = function() {
        $location.path('/meusdados');
      };



      $scope.logout = function() {
        AuthService.logout();
        $location.path('/login');
        console.log(token)
      };

}]);
