'use strict';
angular.module('iaw2017App')
  .controller('StatisticsCtrl', ['$location', '$routeParams', '$scope', '$window', 'CampaignService', 'UserService',
    function ( $location, $routeParams, $scope, $window, CampaignService, UserService) {

        $scope.campaign = {};
        $scope.currentUser = {
            email : "",
            name : ""
        }
        $window.data =[0, 0];
        $scope.opened = 0;

        function initialize() {
            if (UserService.isLoggedIn()) {
                $scope.currentUser = UserService.currentUser();
                CampaignService.getCampaign($routeParams.id, $scope.currentUser.email).then(function (campaign){
                    $scope.campaign = campaign;
                    for (var i = 0; i < campaign.mails.length; i++) {
                        if (campaign.mails[i].open) {
                            $scope.opened ++;
                        }
                    }
                    $window.data = [ campaign.mails.length, $scope.opened]
                });
            }
            else {
                $location.path('/forbiddenAccess');
            }
        }

        initialize();

        $scope.goBack = function() {
            $location.path('/myCampaigns');
        };

  }]);
