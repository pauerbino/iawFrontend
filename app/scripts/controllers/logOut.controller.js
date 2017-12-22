'use strict';
angular.module('iaw2017App')
  .controller('LogOutCtrl', ['$location', '$scope', 'UserService', function ( $location, $scope, UserService) {

    function initialize() {
        UserService.logout();
    }

    initialize();

  }]);
