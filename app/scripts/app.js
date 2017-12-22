'use strict';

/**
 * @ngdoc overview
 * @name iaw2017App
 * @description
 * # iaw2017App
 *
 * Main module of the application.
 */
angular
  .module('iaw2017App', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/lists', {
        templateUrl: 'views/lists.html',
        controller: 'ListsCtrl',
        controllerAs: 'vm'
      })
      .when('/newList', {
        templateUrl: 'views/newList.html',
        controller: 'NewListCtrl',
        controllerAs: 'vm'
      })
      .when('/newContact', {
        templateUrl: 'views/newContact.html',
        controller: 'NewContactCtrl',
        controllerAs: 'vm'
      })
      .when('/contactList/:id', {
        templateUrl: 'views/contactList.html',
        controller: 'ContactListCtrl',
        controllerAs: 'vm'
      })
      .when('/myContacts', {
        templateUrl: 'views/myContacts.html',
        controller: 'MyContactsCtrl',
        controllerAs: 'vm'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'vm'
      })
      .when('/newCampaign', {
        templateUrl: 'views/newCampaign.html',
        controller: 'NewCampaignCtrl',
        controllerAs: 'vm'
      })
      .when('/myCampaigns', {
        templateUrl: 'views/myCampaigns.html',
        controller: 'MyCampaignsCtrl',
        controllerAs: 'vm'
      })
      .when('/signin', {
        templateUrl: 'views/signin.html',
        controller: 'SigninCtrl',
        controllerAs: 'vm'
      })
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'vm'
      })
      .when('/editCampaign/:id', {
        templateUrl: 'views/editCampaign.html',
        controller: 'EditCampaignCtrl',
        controllerAs: 'vm'
      })
      .when('/editContact/:id', {
        templateUrl: 'views/editContact.html',
        controller: 'EditContactCtrl',
        controllerAs: 'vm'
      })
      .when('/editList/:id', {
        templateUrl: 'views/editList.html',
        controller: 'EditListCtrl',
        controllerAs: 'vm'
      })
      .when('/logOut', {
        templateUrl: 'views/home.html',
        controller: 'LogOutCtrl',
        controllerAs: 'vm'
      })
    .when('/bePremium', {
        templateUrl: 'views/bePremium.html',
        controller: 'BePremiumCtrl',
        controllerAs: 'vm'
      })
      .when('/statistics/:id', {
        templateUrl: 'views/statistics.html',
        controller: 'StatisticsCtrl',
        controllerAs: 'vm'
      })
      .when('/forbiddenAccess', {
        templateUrl: 'views/forbiddenAccess.html',
        controller: 'ForbiddenAccessCtrl',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/home'
      });
  });
