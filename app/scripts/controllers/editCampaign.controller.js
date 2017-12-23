'use strict';
angular.module('iaw2017App')
  .controller('EditCampaignCtrl', ['$location', '$routeParams', '$scope', 'CampaignService', 'ListService', 'UserService', function ( $location, $routeParams, $scope, CampaignService, ListService, UserService) {

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
    $scope.campaignToSave = {
        title: "",
        subject: "",
        from: "",
        list: {},
        content: "",
        participants: 0
    };
    $scope.currentUser = {
        email : "",
        name : ""
    }

    function initialize() {
        if (UserService.isLoggedIn()) {
            $scope.currentUser = UserService.currentUser();
            ListService.getLists($scope.currentUser.email).then(function (lists){
                CampaignService.getCampaign($routeParams.id, $scope.currentUser.email).then(function (campaign){
                    $scope.campaign = campaign[0];
                    $scope.campaignToSave = angular.copy(campaign[0]);
                    $scope.selectedListId = campaign.list;
                    $scope.lists = lists;
                });
            });
        }
        else {
            $location.path('/forbiddenAccess');
        }
    }

    initialize();

    $scope.saveCampaign = function(campaign) {
        if ($scope.editCampaignForm.$valid) {
            ListService.getList($scope.selectedListId).then(function(list) {
                $scope.campaign.participants = list.contacts.length;
                $scope.campaign.list = list;
                $scope.campaignToSave.title = $scope.campaign.title;
                CampaignService.editCampaign($scope.campaignToSave).then(function(result) {
                    $location.path('/myCampaigns');
                });
            });
        }
    };

    $scope.goBack = function() {
        $location.path('/myCampaigns');
    };

  }]);
