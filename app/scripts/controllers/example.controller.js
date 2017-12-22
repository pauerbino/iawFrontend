'use strict';
angular.module('iaw2017App')
  .controller('ExampleCtrl', ['$rootScope','$scope', 'UserService',
    function ($rootScope, $scope, UserService) {

    // $scope.isLoggedIn = false;
    // function initialize() {
    //     $scope.isLoggedIn = UserService.isLoggedIn();
    // }
    // $rootScope.$on('updateNavigation', initialize);
    // initialize();
    console.log('creo example');
    $scope.setPremium = function() {
        console.log('pasa');
        $rootScope.$emit('bePremium');
    };
  }]);
