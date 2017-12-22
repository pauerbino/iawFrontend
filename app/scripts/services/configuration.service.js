'use strict';
angular.module('iaw2017App')
    .service('Configuration', [ function () {
        var configurations = {
            baseURL: "https://iawbackend.herokuapp.com/api/v1"
        };

        this.getConfiguration = function() {
            return configurations;
        }

        this.logOut = function() {
        	ConfigurationUserService.logOut();
        }

}]);
