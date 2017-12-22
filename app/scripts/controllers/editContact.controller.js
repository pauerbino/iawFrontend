'use strict';
angular.module('iaw2017App')
  .controller('EditContactCtrl', ['$location', '$routeParams', '$scope', 'ContactService', 'UserService',
    function ( $location, $routeParams, $scope, ContactService, UserService) {

        $scope.contact = {};
        $scope.newTag = '';

        $scope.currentUser = {
            email : "",
            name : ""
        }

        function initialize() {
             if (UserService.isLoggedIn()) {
                $scope.currentUser = UserService.currentUser();
                ContactService.getContact($routeParams.id, $scope.currentUser.email).then(function(response){
                    $scope.contact = response;
                });
            }
            else {
                $location.path('/forbiddenAccess');
            }
        }

        initialize();

        $scope.editContact = function() {
            if ($scope.editContactForm.$valid) {
                ContactService.editContact($scope.contact).then(function() {
                    $location.path('/myContacts');
                });
            }
        };

        $scope.goBack = function() {
            $location.path('/myContacts');
        };

        $scope.addTag = function() {
            if ($scope.contact.tags.indexOf($scope.newTag) === -1) {
                $scope.contact.tags.push($scope.newTag);
                $scope.newTag = "";
            }
        };

        $scope.removeTag = function(tag) {
            $scope.contact.tags.splice($scope.contact.tags.indexOf(tag), 1);
        };

  }]);
