'use strict';
angular.module('iaw2017App')
  .controller('MyCampaignsCtrl', ['$location', '$rootScope', '$scope', 'CampaignService', 'UserService', function ( $location, $rootScope, $scope, CampaignService, UserService) {

    $scope.campaigns = [];

    $scope.currentUser = {
        email: "",
        name: "",
        premium: false
    }

    function initialize() {
        if (UserService.isLoggedIn()) {
            $scope.currentUser = UserService.currentUser();
            CampaignService.reset();
                CampaignService.getCampaigns($scope.currentUser.email).then(function (campaigns){
                    $scope.campaigns = campaigns;
                });
            UserService.getPremium($scope.currentUser.email).then(function(response){
                $scope.currentUser.premium = response.premium;
            });
            console.log($scope.campaigns);
            console.log($scope.currentUser);
        }
        else {
            $location.path('/forbiddenAccess');
        }
    }

    initialize();

    $scope.mailsFilter = function(object) {
        return object.open === true;
    }

    $scope.deleteCampaign = function(campaignId) {
        CampaignService.deleteCampaign(campaignId).then(function (){
            initialize();
        });
    };

    $rootScope.$on('bePremium', setPremium);

    function setPremium() {
        var body = {
            email: $scope.currentUser.email
        };
        UserService.setPremium(body).then(function(response){
            $scope.currentUser = response;
        })
    };

    $scope.editCampaign = function(campaignId) {
        $location.path('/editCampaign/'+campaignId);
    };

    $scope.goToNewCampaign = function() {
        $location.path('/newCampaign');
    };

    $scope.goToStatistics  = function(id) {
        $location.path('/statistics/'+id);
    };


  }]);
