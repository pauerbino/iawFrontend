'use strict';
angular.module('iaw2017App')
    .service('ListService', ['$http', '$q', 'Configuration', 'UserService', function ($http, $q, Configuration, UserService) {
        var service = {};
        var cache = {
            lists: null
        };

        service.reset = function() {
            cache = {
                lists: null
            };
        };

        service.getLists = function(email) {
            var deferred = $q.defer();
            if (cache.lists) {
                deferred.resolve(cache.lists);
            } else {
                $http({
                    method: 'GET',
                    url: Configuration.getConfiguration().baseURL + '/lists/' + email,
                    headers: {'x-access-token': UserService.getToken()}
                }).then(function (response) {
                    cache.lists = response.data;
                    deferred.resolve(response.data);
                }).catch(function (response) {
                    deferred.reject(response);
                });
            }

            return deferred.promise;
        };

        service.getList = function(id, email) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: Configuration.getConfiguration().baseURL + '/lists/' + id + '/' + email,
                headers: {'x-access-token': UserService.getToken()}
            }).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        };

        service.deleteList = function(id) {
            var deferred = $q.defer();

            $http({
                method: 'DELETE',
                url: Configuration.getConfiguration().baseURL + '/lists/' + id,
                headers: {'x-access-token': UserService.getToken()}
            }).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        };

        service.deleteContactFromList = function() {

        };

        service.editList = function(list) {
            var deferred = $q.defer();
           $http({
                method: 'PUT',
                url: Configuration.getConfiguration().baseURL + '/lists/' + list._id,
                headers: {'x-access-token': UserService.getToken()},
                data: list
            }).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        };

        service.createList = function(list) {
            console.log(list);
            var deferred = $q.defer();
            $http({
                method : 'POST',
                url : Configuration.getConfiguration().baseURL + '/lists',
                headers: {'x-access-token': UserService.getToken()},
                data: list
            }).then(function(response) {
                deferred.resolve(response);
            }).catch(function(response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };

        return service;
    }]);
