'use strict';
angular.module('iaw2017App')
  .controller('StatisticsCtrl', ['$location', '$routeParams', '$scope', '$window', 'CampaignService', 'UserService',
    function ( $location, $routeParams, $scope, $window, CampaignService, UserService) {

        $scope.campaign = {};
        $scope.currentUser = {
            email : "",
            name : ""
        }
        $window.data = [];
        $scope.opened = 0;

        function initialize() {
            if (UserService.isLoggedIn()) {
                $scope.currentUser = UserService.currentUser();
                CampaignService.getCampaign($routeParams.id, $scope.currentUser.email).then(function (campaign){
                    $scope.campaign = campaign[0];
                    for (var i = 0; i < $scope.campaign.mails.length; i++) {
                        if ($scope.campaign.mails[i].open) {
                            $scope.opened ++;
                        }
                    }
                   // $window.data = [ $scope.campaign.mails.length, $scope.opened];
                    //$window.data = [];
                    $window.data.push($scope.campaign.mails.length);
                    $window.data.push($scope.opened);
                    console.log($window.data);
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
