var app = angular.module('lexikApp', ['ngMaterial']);

app.controller('main',['$scope','$http', '$mdDialog', function($scope, $http, $mdDialog){

  $scope.listUsers = [];

  $scope.resetSearch = function(){
    $scope.search = "";
  }

  $http({
    method: 'GET',
    url: '/lexik/php/getAllUsers.php'
  }).then(function(response) {
    $scope.listUsers = response.data;
  });

  $scope.detailUser = function(user){
    $mdDialog.show({
      controller: () => this,
      controllerAs: 'ctrl',
      scope: $scope.$new(),
      templateUrl: 'detail.html',
      parent: angular.element(document.body),
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    });
  };

  $scope.addUser = function(){
    // var id = user.id;
    // var name = user.name;
    // var firstname = user.firstname;
    // var email = user.email;
    // var birthDate = user.birthDate;
    // var groupId = user.groupId;

    $mdDialog.show({
      controller: function(){
        this.parent = $scope;


        console.log($scope.user);

        $scope.groupes = [];
        $scope.birthDate = new Date();
        $scope.minDate = new Date(
          $scope.birthDate.getFullYear(),
          $scope.birthDate.getMonth() - 2,
          $scope.birthDate.getDate());

          $scope.maxDate = new Date(
            $scope.birthDate.getFullYear(),
            $scope.birthDate.getMonth() + 2,
            $scope.birthDate.getDate());

            $scope.onlyWeekendsPredicate = function(date) {
              var day = date.getDay();
              return day === 0 || day === 6;
            }
          
            $scope.user = {
              name: "R",
              firstname: "F",
              email: "@",
              birthDate: $scope.birthDate,
              groupId: "",
            }

            $http({
              method: 'GET',
              url: '/lexik/php/getAllGroupes.php'
            }).then(function(response) {
              $scope.groupes = response.data;
            });

            $scope.insertUser = function(user){
              console.log("test");
              var id = user.id;
              var name = user.name;
              var firstname = user.firstname;
              var email = user.email;
              var birthDate = user.birthDate;
              var groupId = user.groupId;
              console.log(birthDate);
              // var url = '/lexik/php/addUser.php?id='+id+"&name="+name+"&firstname="+firstname+"&email="+email+"&birthDate="+birthDate+"&groupId="+groupId;
              console.log(url);
              $http({
                method: 'GET',
                url: '/lexik/php/addUser.php?id='+id+"&name="+name+"&firstname="+firstname+"&email="+email+"&birthDate="+birthDate+"&groupId="+groupId
              }).then(function(response) {
                $scope.groupes = response.data;
              });
            }
          },
          controllerAs: 'ctrl2',
          scope: $scope.$new(),
          templateUrl: 'createUser.html',
          clickOutsideToClose:true,
          fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.

        });
      };


      $scope.removeUser = function(user){
        var id = user.id;
        $http({
          method: 'GET',
          url: '/lexik/php/removeUser.php?id='+id
        }).then(function(response) {

          if(response.data){
            $scope.listUsers.pop(user);
          }
        });
      }
    }]);

    app.filter('ageFilter', function(){
      return function(birthday){
        var birthday = new Date(birthday);
        var today = new Date();
        var age = ((today - birthday) / (31557600000));
        var age = Math.floor( age );
        return age;
      }
    });

    app.config(function ($mdDateLocaleProvider) {

      $mdDateLocaleProvider.formatDate = function (date) {
        return moment(date).format('DD-MM-YYYY');
      };

    })
