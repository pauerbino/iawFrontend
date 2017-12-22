'use strict';
angular.module('iaw2017App')
  .controller('NewContactCtrl', ['$location', '$scope', 'ContactService', 'UserService',
    function ( $location, $scope, ContactService, UserService) {

        $scope.contact = {
            name: '',
            lastName: '',
            email: '',
            phone: '',
            tags: []
        };

        $scope.currentUser = {
            email : "",
            name : ""
        }

        $scope.userExist = false;
        $scope.newTag = '';

        $scope.newContact = function() {
            if (UserService.isLoggedIn()) {
                $scope.currentUser = UserService.currentUser();
                if ($scope.newContactForm.$valid) {
                    ContactService.existContact($scope.contact).then(function(response){
                        if (response) {
                            $scope.userExist = true;
                        } else {
                            $scope.contact.userEmail = $scope.currentUser.email;
                            ContactService.createContact($scope.contact).then(function() {
                                $location.path('/myContacts');
                            });
                        }
                    });
                }
            }
            else {
                $location.path('/forbiddenAccess');
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
