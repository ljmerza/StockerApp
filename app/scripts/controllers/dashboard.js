'use strict';

/**
 * @ngdoc function
 * @name stockerApp.controller:DashboardCtrl
 * @description
 * Used to get total market share and day change of all watchlists when the
 * length of a watchlist changes.
 */
angular.module('stockerApp')
	.controller('DashboardCtrl', function ($scope, WatchlistService, QuoteService) {
		var unregisterHandlers = [];

		// get all watchlists
		$scope.watchlists = WatchlistService.query();

		// adds all stocks to array for loop through each to get yahoo data
		var reset = function(){
			_.each($scope.watchlists, function(watchlist){
				_.each(watchlist.stocks, function(stock){
					QuoteService.register(stock);
				});
			});

			_.each(unregisterHandlers, function(unregister){
				unregister();
			});

			//for each watchlist watch for market value changes to recalculate
			_.each($scope.watchlists, function(watchlist){
				var unregister = $scope.$watch(function(){
					return watchlist.marketValue;
				}, function(){
					recalculate();
				});
				unregisterHandlers.push(unregister);
			});
		};

		//sum up market value and day change for all watchlists
		var recalculate = function(){
			$scope.marketValue = 0;
			$scope.dayChange = 0;
			_.each($scope.watchlists, function(watchlist){
				$scope.marketValue += watchlist.marketValue ? watchlist.marketValue : 0;
				$scope.dayChange += watchlist.dayChange ? watchlist.dayChange : 0;

			});
		};

		// watch for watchlist length changes and update data on dashboard
		$scope.$watch('watchlist.length', function(){
			reset();
		});
	});
