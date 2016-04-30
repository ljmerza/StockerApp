'use strict';

/**
 * @ngdoc function
 * @name stockerApp.controller:MainCtrl
 * @description
 * # Looks at the path location and helps update the active link for the
 * dropdown menu in the nav bar
 */
angular.module('stockerApp')
	.controller('MainCtrl', function ($scope, $location, WatchlistService) {
		//get all the watchlists - used for dropdown list
		$scope.watchlists = WatchlistService.query();

		//watch the path location for changes and update the activeView variable for link highlighting
		$scope.$watch(function(){
			return $location.path();
		}, function(path){
			if(_.includes(path, 'watchlist')){
				$scope.activeView = 'watchlist';
			} else {
				$scope.activeView = 'dashboard';
			}
		});
	});
