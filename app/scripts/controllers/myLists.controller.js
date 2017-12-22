'use strict';
angular.module('iaw2017App')
  .controller('ListsCtrl', ['$location', '$scope', 'ListService', 'UserService', function ( $location, $scope, ListService, UserService) {

    $scope.lists = [];
    $scope.currentUser = {
        email : "",
        name : ""
    }

    function initialize() {
        if (UserService.isLoggedIn()) {
            $scope.currentUser = UserService.currentUser();
            ListService.reset();
            ListService.getLists($scope.currentUser.email, UserService.getToken()).then(function (lists){
                console.log($scope.lists);
                $scope.lists = lists;
            });
        }
        else {
            $location.path('/forbiddenAccess');
        }
    }

    initialize();

    $scope.goToNewList = function() {
        $location.path('/newList');
    };

    $scope.goToNewContact = function() {
        $location.path('/newContact');
    };

    $scope.goToList = function(list) {
        $location.path('/contactList/'+ list._id);
    };

  }]);
