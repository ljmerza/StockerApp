'use strict';

/**
 * @ngdoc directive
 * @name stockerApp.directive:stkWatchlistPanel
 * @description
 * # panel to display all user watchlist and add/delete watchlists
 */
angular.module('stockerApp')
	.directive('stkWatchlistPanel', function ($location, $modal, $routeParams, WatchlistService) {
		return {
			templateUrl: 'views/templates/watchlist-panel.html',
			restrict: 'E',
			link: function postLink($scope) {
				$scope.watchlist = {};

				// set up modal to add a new wathlist, use this scope in modal scope
				var addListModal = $modal({
					scope: $scope,
					templateUrl: 'views/templates/addlist-modal.html',
					show: false
				});

				$scope.watchlists = WatchlistService.query();

				// get modal then show it in view
				$scope.showModal = function(){
					addListModal.$promise.then(addListModal.show);
				};

				// call inside modal to add new watchlist to list of watchlists
				$scope.createList = function(){
					WatchlistService.save($scope.watchlist);
					addListModal.hide();
					$scope.watchlist = {};
				};

				// delete a watchlist
				$scope.deleteList = function(list){
					WatchlistService.remove(list);
					$location.path('/');
				};

				// get route path for highlighting active watchlist being viewed
				$scope.currentList = $routeParams.listId;

				// change path when clicking on a watchlist to see that watchlist's table
				$scope.gotoList = function(listId){
					$location.path('watchlist/' + listId);
				};
			}
		};
	});
