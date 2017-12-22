'use strict';
angular.module('iaw2017App')
  .controller('NewCampaignCtrl', ['$location', '$scope', 'CampaignService', 'ListService', 'UserService', function ( $location, $scope, CampaignService, ListService, UserService) {

    $scope.lists = [];
    $scope.selectedListId = '';
    $scope.campaign = {
        title: "",
        subject: "",
        from: "",
        list: {},
        content: "",
        participants: 0,
        userEmail : ""
    };

    $scope.currentUser = {
        email : "",
        name : ""
    }


    function initialize() {
        if (UserService.isLoggedIn()) {
            $scope.currentUser = UserService.currentUser();
            ListService.getLists($scope.currentUser.email).then(function (lists){
                $scope.lists = lists;
            });
            $scope.campaign.from = $scope.currentUser.email;
        }
        else {
            $location.path('/forbiddenAccess');
        }
    }

    initialize();

    $scope.newCampaign = function(campaign) {
        if ($scope.newCampaignForm.$valid) {
            console.log($scope.campaign);
            ListService.getList($scope.selectedListId, $scope.currentUser.email).then(function(list) {
                $scope.campaign.participants = list.contacts.length;
                $scope.campaign.list = $scope.selectedListId;
                $scope.campaign.userEmail = $scope.currentUser.email;
                CampaignService.newCampaign($scope.campaign).then(function() {
                    $location.path('/myCampaigns');
                });
            });
        }
    };

    $scope.goBack = function() {
        $location.path('/myCampaigns');
    };

  }]);
