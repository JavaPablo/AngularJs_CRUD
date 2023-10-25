'use strict';

angular.module('myApp.users', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/users', {
    templateUrl: 'pages/users/users.html',
    controller: 'UsersController',
    requiresAuthentication: true
  });
}])

.controller('UsersController',  ['$scope', '$http', '$location','AuthService', function ($scope, $http, $location, AuthService) {

  (() => {
    'use strict'
    const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.forEach(tooltipTriggerEl => {
      new bootstrap.Tooltip(tooltipTriggerEl)
    })
  })()


//   $scope.applyFilters = function() {
//     $scope.filteredUsers = $scope.users.filter(function(user) {
//         return (user.name.toLowerCase().includes($scope.nameFilter.toLowerCase()) || user.email.toLowerCase().includes($scope.emailFilter.toLowerCase()));
//     });

//     $scope.currentPage = 0;
    
//     $scope.calculateTotalPages();
// };

// $scope.clearFilters = function() {
//   $scope.currentPage = 0;
//     $scope.nameFilter = '';
//     $scope.emailFilter = '';

//     $scope.applyFilters();
// };


$scope.listUsuario = []; 
$scope.pageSize = 5;



// AQUI FAZ A BUSCA PASSANDO ESSES PARAMETROS ==================
var queryParameters = {
  nome: '',
  email: ''
};

$scope.applyFilters = function() {
  queryParameters.nome = $scope.nameFilter;
  queryParameters.email = $scope.emailFilter;

  if(!queryParameters.nome != '') {
    $scope.fetchUsers();
  } else if(!queryParameters.email != '') {
    $scope.fetchUsers();
  }
  
};

$scope.clearFilters = function() {
  queryParameters.nome = '';
  queryParameters.email = '';
  $scope.nameFilter = ''; // Limpar a caixa de filtro
  $scope.emailFilter = ''; // Limpar a caixa de filtro
  $scope.fetchUsers();
};


$scope.fetchUsers = function(page) {
  page = $scope.currentPage || 0; 

  var apiUrl = 'http://localhost:8080/usuarios?tamanho=' + $scope.pageSize +
      '&pagina=' + page +
      '&nome=' + queryParameters.nome +
      '&email=' + queryParameters.email;
  
  $http.get(apiUrl)
    .then(function(response) {
      $scope.listUsuario = response.data;
    })
    .catch(function(error) {
      console.error('Erro ao buscar dados de usuários:', error);
    });
};

// AQUI FAZ A BUSCA PASSANDO ESSES PARAMETROS ==================


  // $scope.fetchUsers = function(page) {
  //   page = $scope.currentPage || 0; 

  //   var apiUrl = 'http://localhost:8080/usuarios?tamanho=' + $scope.pageSize + '&pagina=' + page;
    
  //   $http.get(apiUrl)
  //     .then(function(response) {
  //       $scope.listUsuario = response.data;
  //     })
  //     .catch(function(error) {
  //       console.error('Erro ao buscar dados de usuários:', error);
  //     });
  // };

  
  $scope.fetchUsers();

  $scope.updatePageSize = function() {
    $scope.fetchUsers(); 
  };















  // $scope.users = [
  //   { name: 'Usuário 1', email: 'user1@example.com', login: 'user1', perfil: 'Perfil A' },
  //   { name: 'Usuário 2', email: 'user2@example.com', login: 'user2', perfil: 'Perfil B' },
  //   { name: 'Usuário 3', email: 'user3@example.com', login: 'user3', perfil: 'Perfil C' },
  //   { name: 'Usuário 4', email: 'user4@example.com', login: 'user4', perfil: 'Perfil A' },
  //   { name: 'Usuário 5', email: 'user1@example.com', login: 'user1', perfil: 'Perfil A' },
  //   { name: 'Usuário 6', email: 'user2@example.com', login: 'user2', perfil: 'Perfil B' },
  //   { name: 'Usuário 7', email: 'user3@example.com', login: 'user3', perfil: 'Perfil C' },
  //   { name: 'Usuário 8', email: 'user4@example.com', login: 'user4', perfil: 'Perfil A' },
  //   { name: 'Usuário 9', email: 'user1@example.com', login: 'user1', perfil: 'Perfil A' },
  //   { name: 'Usuário 10', email: 'user2@example.com', login: 'user2', perfil: 'Perfil B' },
  //   { name: 'Usuário 11', email: 'user3@example.com', login: 'user3', perfil: 'Perfil C' },
  //   { name: 'Usuário 12', email: 'user4@example.com', login: 'user4', perfil: 'Perfil A' },
  //   { name: 'Usuário 13', email: 'user1@example.com', login: 'user1', perfil: 'Perfil A' },
  //   { name: 'Usuário 14', email: 'user2@example.com', login: 'user2', perfil: 'Perfil B' },
  //   { name: 'Usuário 15', email: 'user3@example.com', login: 'user3', perfil: 'Perfil C' },
  //   { name: 'Usuário 16', email: 'user4@example.com', login: 'user4', perfil: 'Perfil A' },
  //   { name: 'Usuário 17', email: 'user1@example.com', login: 'user1', perfil: 'Perfil A' },
  //   { name: 'Usuário 18', email: 'user2@example.com', login: 'user2', perfil: 'Perfil B' },
  //   { name: 'Usuário 19', email: 'user3@example.com', login: 'user3', perfil: 'Perfil C' },
  //   { name: 'Usuário 20', email: 'user4@example.com', login: 'user4', perfil: 'Perfil A' },
  //   { name: 'Usuário 21', email: 'user1@example.com', login: 'user1', perfil: 'Perfil A' },
  //   { name: 'Usuário 22', email: 'user2@example.com', login: 'user2', perfil: 'Perfil B' },
  //   { name: 'Usuário 23', email: 'user3@example.com', login: 'user3', perfil: 'Perfil C' },
  //   { name: 'Usuário 24', email: 'user4@example.com', login: 'user4', perfil: 'Perfil A' },
  //   { name: 'Usuário 25', email: 'user5@example.com', login: 'user5', perfil: 'Perfil B' }
  // ];

   


























  
  // Variáveis para controlar a paginação
  $scope.currentPage = 0;
  $scope.itemsPerPage = $scope.pageSize; // Quantidade de itens por página
  $scope.totalItems = $scope.listUsuario.length;
  $scope.selectedItemsPerPage = $scope.itemsPerPage;

  $scope.nextPage = function() {
    $scope.currentPage++;
    $scope.fetchUsers();
  };
  
  // Função para voltar para a página anterior
  $scope.prevPage = function() {
    if ($scope.currentPage > 0) {
      $scope.currentPage--;
      $scope.fetchUsers();
    }
  };

  // Função para calcular o índice inicial e final dos itens a serem exibidos
  $scope.pagination = function () {
    var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
    var end = begin + $scope.itemsPerPage;
    return $scope.filteredUsers.slice(begin, end);
};

  // Função para calcular o número total de páginas
  $scope.pageCount = function() {
    return Math.ceil($scope.totalItems / $scope.itemsPerPage);
  };

  $scope.updateItemsPerPage = function() {
    $scope.currentPage = 0;
    $scope.pageSize = $scope.selectedItemsPerPage;
    $scope.fetchUsers();
};

  
 $scope.calculateTotalPages = function() {
  $scope.totalPages = Math.ceil($scope.filteredUsers.length / $scope.itemsPerPage);
  if ($scope.currentPage > $scope.totalPages) {
    $scope.currentPage = $scope.totalPages;
  }
};


  // Função para definir a quantidade de itens a serem exibidos por página
  $scope.setItemsPerPage = function(itemsPerPage) {
    $scope.itemsPerPage = itemsPerPage;
    $scope.currentPage = 1; // Reiniciar para a primeira página quando a quantidade de itens por página é alterada
  };

  $scope.setPage = function (page) {
    if (page >= 1 && page <= $scope.pageCount()) {
        $scope.currentPage = page;
    }
};

  // Inicializar o filtro de pesquisa vazio
  $scope.filter = '';

  // Aplicar um filtro à lista de usuários
  $scope.filteredUsers = $scope.listUsuario;

  $scope.$watch('filter', function (newVal, oldVal) {
      if (newVal !== oldVal) {
          $scope.filteredUsers = $scope.listUsuario.filter(function (user) {
              return user.name.toLowerCase().includes($scope.filter.toLowerCase()) ||
                  user.email.toLowerCase().includes($scope.filter.toLowerCase());
          });
          $scope.currentPage =  $scope.filteredUsers.pageable.pageNumber + 1; // Reiniciar para a primeira página quando o filtro é aplicado
          $scope.totalItems = $scope.filteredUsers.totalPages;
      }
  });

  
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