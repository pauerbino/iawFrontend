'use strict';
angular.module('iaw2017App')
    .service('CampaignService', ['$http', '$q', 'Configuration', function ($http, $q, Configuration) {

        var service = {};

        var cache = {
            campaigns: null
        };

        service.reset = function() {
            cache = {
                campaigns: null
            };
        };

        service.getCampaigns = function(email) {
            var deferred = $q.defer();

            if (cache.campaigns) {
                deferred.resolve(cache.campaigns);
            } else {
               $http({
                    method: 'GET',
                    url: Configuration.getConfiguration().baseURL + '/campaigns/' + email
                }).then(function (response) {
                    cache.campaigns = response.data;
                    deferred.resolve(response.data);
                }).catch(function (response) {
                    deferred.reject(response);
                });
            }

            return deferred.promise;
        };

        service.getCampaign = function(id, email) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: Configuration.getConfiguration().baseURL + '/campaigns/' + id + '/' + email
            }).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        };

        service.newCampaign = function(campaign) {
            var deferred = $q.defer();
            $http({
                method : 'POST',
                url : Configuration.getConfiguration().baseURL + '/campaigns',
                data: campaign
            }).then(function(response) {
                deferred.resolve(response);
            }).catch(function(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        };

        service.editCampaign = function(campaign) {
            var deferred = $q.defer();
            var id = campaign._id;

            $http({
                method : 'PUT',
                url : Configuration.getConfiguration().baseURL + '/campaigns/' + id,
                data: campaign
            }).then(function(response) {
                deferred.resolve(response);
            }).catch(function(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        };

        service.deleteCampaign = function(id) {
            var deferred = $q.defer();

            $http({
                method: 'DELETE',
                url: Configuration.getConfiguration().baseURL + '/campaigns/' + id
            }).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        };

        return service;
    }]);
