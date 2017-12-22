'use strict';
angular.module('iaw2017App')
    .service('ContactService', ['$http', '$q', 'Configuration', 'UserService', function ($http, $q, Configuration, UserService) {

        var service = {};

        var cache = {
            contacts: []
        };

        service.reset = function() {
            cache = {
                contacts: null
            };
        };

        // service.findContactByUserName = function(name, lastName) {
        //     var deferred = $q.defer();
        //     //var result = contacts.filter(function (contact) {
        //     //    return (contact.username === userName);
        //     //});

        //     if (cache.contacts) {
        //         var result = cache.contacts.filter(function (contact) {
        //             return (contact.name.toLowerCase() === name.toLowerCase() && contact.lastName.toLowerCase() === lastName.toLowerCase());
        //         });
        //         deferred.resolve(result);
        //     }
        //     else {
        //         $http({
        //             method: 'GET',
        //             url: Configuration.getConfiguration().baseURL + '/contacts/'
        //         }).then(function (response) {
        //             cache.contacts = response.data;
        //             deferred.resolve(cache.contacts.filter(function (contact) {
        //                 return (contact.name.toLowerCase() === name.toLowerCase() && contact.lastName.toLowerCase() === lastName.toLowerCase());
        //             }));
        //         }).catch(function (response) {
        //             deferred.reject(response);
        //         });
        //     }

        //     return deferred.promise;
        //     //return { name: "Gina", lastName:"Turner"};
        // };

        // service.findContactByEmail = function(email) {
        //     var deferred = $q.defer();

        //     if (cache.contacts) {
        //         var result = cache.contacts.filter(function (contact) {
        //             return (contact.email === email);
        //         });
        //         deferred.resolve(result);
        //     }
        //     else {
        //         $http({
        //             method: 'GET',
        //             url: Configuration.getConfiguration().baseURL + '/contacts/'
        //         }).then(function (response) {
        //             cache.contacts = response.data;
        //             deferred.resolve(cache.contacts.filter(function (contact) {
        //                 return (contact.email === email);
        //             }));
        //         }).catch(function (response) {
        //             deferred.reject(response);
        //         });
        //     }

        //     return deferred.promise;
        //     //return { name: "Gina", lastName:"Turner"};
        // };

        //DEVUELVE TODOS LOS CONTACTOS DEL USUARIO LOGGUEADO
        service.getContacts = function(email) {
            var deferred = $q.defer();
            if (cache.contacts !== null) {
                deferred.resolve(cache.contacts);
            } else {
               $http({
                    method: 'GET',
                    url: Configuration.getConfiguration().baseURL + '/contacts/' + email,
                    headers: {'x-access-token': UserService.getToken()}
                }).then(function (response) {
                    cache.contacts = response.data;
                    deferred.resolve(response.data);
                }).catch(function (response) {
                    deferred.reject(response);
                });
            }

            return deferred.promise;
        };

        service.getContact = function(id, email) {
            var deferred = $q.defer();

           $http({
                method: 'GET',
                url: Configuration.getConfiguration().baseURL + '/contacts/' + id + '/' + email,
                headers: {'x-access-token': UserService.getToken()}
            }).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        };

        service.editContact = function(contact) {
            var deferred = $q.defer();
           $http({
                method: 'PUT',
                url: Configuration.getConfiguration().baseURL + '/contacts/' + contact._id,
                headers: {'x-access-token': UserService.getToken()},
                data: contact
            }).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        };

        service.createContact = function (contact) {
            console.log(contact);
            var deferred = $q.defer();
            $http({
                method : 'POST',
                url : Configuration.getConfiguration().baseURL + '/contacts',
                headers: {'x-access-token': UserService.getToken()},
                data: contact
            }).then(function(response) {
                deferred.resolve(response);
            }).catch(function(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        };

        service.existContact = function(contact) {
            var deferred = $q.defer();
            var exist = false;
            service.getContacts().then(function(response) {
                response.filter(function (c) {
                    if (c.email === contact.email) {
                        exist = true;
                    }
                });
                deferred.resolve(exist);
            }).catch(function(response){
                deferred.reject(response);
            });

            return deferred.promise;
        };

        service.deleteContact = function(id) {
            var deferred = $q.defer();

            $http({
                method: 'DELETE',
                url: Configuration.getConfiguration().baseURL + '/contacts/' + id,
                headers: {'x-access-token': UserService.getToken()}
            }).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        };

        return service;
    }]);
