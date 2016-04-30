'use strict';

/**
 * @ngdoc overview
 * @name stockerApp
 * @description
 * # stockerApp
 *
 * Main module of the application.
 */

angular
  .module('stockerApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'mgcrea.ngStrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboard'
      })
      .when('/watchlist/:listId', {
        templateUrl: 'views/watchlist.html',
        controller: 'WatchlistCtrl',
        controllerAs: 'watchlist'
      })
      .otherwise({
        redirectTo: '/dashboard'
      });
  });
