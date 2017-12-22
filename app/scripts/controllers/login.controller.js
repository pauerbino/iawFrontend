'use strict';
angular.module('iaw2017App')
  .controller('LoginCtrl', ['$location', '$scope', 'UserService', function ( $location, $scope, UserService) {

    $scope.credentials = {
      email : "",
      password : ""
    };

    $scope.message;

    function initialize() {
      $scope.message = "";
    }

    $scope.login = function() {
        if ($scope.loginForm.$valid) {
            UserService.login($scope.credentials).then(function(){
              $location.path('/lists');
            }).catch(function(res){
                $scope.message = "The username or the password is not valid. Please try again."
            });
        }
    };

  }]);
