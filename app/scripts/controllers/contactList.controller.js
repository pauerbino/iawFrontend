'use strict';
angular.module('iaw2017App')
  .controller('ContactListCtrl', ['$location', '$routeParams', '$scope', 'ListService', 'UserService',
    function ( $location, $routeParams, $scope, ListService, UserService) {

    $scope.list = {};

    $scope.currentUser = {
            email : "",
            name : ""
        }

    function initialize() {
        if (UserService.isLoggedIn()) {
            $scope.currentUser = UserService.currentUser();
            ListService.getList($routeParams.id, $scope.currentUser.email).then(function (list){
                $scope.list = list;
                console.log($scope.list);
            });
        }
        else {
            $location.path('/forbiddenAccess');
        }
    }

    initialize();

    $scope.deleteList = function() {
        ListService.deleteList($routeParams.id).then(function (){
            $location.path('/lists');
        });
    };

    $scope.editList = function() {
        $location.path('/editList/'+$routeParams.id);
    };

    $scope.deleteContactFromList = function(id) {
        ListService.deleteContactFromList($routeParams.id, id).then(function (){
            initialize();
        });
    };

    $scope.editContactFromList = function(id) {
       $location.path('/editContact/'+ id);
    };

    $scope.goBack = function() {
       $location.path('/lists');
    };
  }]);
