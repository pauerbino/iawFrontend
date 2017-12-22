'use strict';
angular.module('iaw2017App')
  .controller('MyContactsCtrl', ['$location', '$scope', 'ContactService', 'UserService', function ( $location, $scope, ContactService, UserService) {

    $scope.contacts = [];
    $scope.currentUser = {
        email : "",
        name : ""
    }

    function initialize() {
        if (UserService.isLoggedIn()) {
            $scope.currentUser = UserService.currentUser();
            ContactService.reset();
            ContactService.getContacts($scope.currentUser.email).then(function (contacts){
                $scope.contacts = contacts;
            });
        }
        else {
            $location.path('/forbiddenAccess');
        }
    }

    initialize();

    $scope.goToNewContact = function() {
        $location.path('/newContact');
    };

    $scope.deleteContact = function(id) {
        ContactService.deleteContact(id).then(function(){
            initialize();
        });
    };

    $scope.editContact = function(id) {
        $location.path('/editContact/'+id);
    };

  }]);
