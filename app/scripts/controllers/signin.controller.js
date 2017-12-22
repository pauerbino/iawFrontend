'use strict';
angular.module('iaw2017App')
  .controller('SigninCtrl', ['$location', '$scope', 'UserService', function ($location, $scope, UserService) {

    $scope.credentials = {
      name : "",
      email : "",
      password : ""
    };

    $scope.message;

    function initialize() {
      $scope.message = "";
    }

    $scope.register = function() {
        if ($scope.signinForm.$valid) {
            UserService.register($scope.credentials).then(function(response){
              if (response.error) {
                console.log("error");
                $scope.message = response.error;
                console.log($scope.message);
                $location.path('/signin');
              }
              else{
                $location.path('/lists');
              }
            });
        }
    };

  }]);
