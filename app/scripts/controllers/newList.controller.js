'use strict';
angular.module('iaw2017App')
  .controller('NewListCtrl', ['$location', '$routeParams', '$scope', 'ContactService', 'ListService', 'UserService',
    function ( $location, $routeParams, $scope, ContactService, ListService, UserService) {

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
            }
            else {
                $location.path('/forbiddenAccess');
            }
        }

        initialize();

        $scope.createList = function() {
            if ($scope.newListForm.$valid) {
                var contactsSelected = $scope.allContacts.filter(function(obj) {
                    if (obj.checked) {
                        return obj;
                    }
                });
                $scope.list.contacts = contactsSelected;
                $scope.list.email = $scope.currentUser.email;
                ListService.createList($scope.list).then(function() {
                    $location.path('/lists');
                });
            }
        };

        $scope.goBack = function() {
            $location.path('/lists');
        };

  }]);
