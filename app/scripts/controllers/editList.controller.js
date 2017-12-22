'use strict';
angular.module('iaw2017App')
  .controller('EditListCtrl', ['$location', '$routeParams', '$scope', 'ContactService', 'ListService', 'UserService',
    function ( $location, $routeParams, $scope, ContactService, ListService, UserService) {

        $scope.allContacts = [];
        $scope.list = {};

        $scope.currentUser = {
            email : "",
            name : ""
        }

        function initialize() {
            if (UserService.isLoggedIn()) {
                $scope.currentUser = UserService.currentUser();
                ContactService.reset();
                ContactService.getContacts($scope.currentUser.email).then(function(response){
                    $scope.allContacts = response;
                });
                ListService.getList($routeParams.id, $scope.currentUser.email).then(function(response){
                    $scope.list = response;
                    for (var i = 0; i < $scope.allContacts.length; i++) {
                        if (isIncluded($scope.allContacts[i])) {
                            $scope.allContacts[i].checked = true;
                        }
                    }
                });
            }
            else {
                $location.path('/forbiddenAccess');
            }
        }

        initialize();

        $scope.editList = function() {
            var contactsSelected = $scope.allContacts.filter(function(obj) {
                if (obj.checked) {
                    return obj;
                }
            });
            $scope.list.contacts = contactsSelected;
            $scope.list.email = $scope.currentUser.email;
            ListService.editList($scope.list).then(function() {
                $location.path('/contactList/'+$routeParams.id);
            });
        };

        $scope.goBack = function() {
            $location.path('/contactList/'+$routeParams.id);
        };

        function isIncluded(obj) {
            var bool = false;
            for (var i = 0; i < $scope.list.contacts.length; i++) {
                if ($scope.list.contacts[i]._id === obj._id) {
                    bool = true;
                    return bool;
                }
            }
            return bool;
        }

  }]);
