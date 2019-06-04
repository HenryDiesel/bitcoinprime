'use strict';

/**
 * @ngdoc overview
 * @name bitcoinprimeApp
 * @description
 * # bitcoinprimeApp
 *
 * Main module of the application.  Control imports and routes
 */
angular
  .module('bitcoinprimeApp', [
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial',
    'md.data.table'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/instructions', {
        templateUrl: 'views/instructions.html',
        controller: 'InstructionsCtrl',
        controllerAs: 'instructions'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
