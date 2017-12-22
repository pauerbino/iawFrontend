'use strict';
angular.module('iaw2017App')
    .service('Configuration', [ function () {
        var configurations = {
            baseURL: "http://localhost:3000/api/v1"
        };

        this.getConfiguration = function() {
            return configurations;
        }

        this.logOut = function() {
        	ConfigurationUserService.logOut();
        }

}]);
