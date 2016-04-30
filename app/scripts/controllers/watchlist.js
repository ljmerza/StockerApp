'use strict';

/**
 * @ngdoc function
 * @name stockerApp.controller:WatchlistCtrl
 * @description
 * # WatchlistCtrl
 * Controller for a single wathlist. sets up modal for adding a new stock to watchlist and removing stocks
 */
angular.module('stockerApp')
  .controller('WatchlistCtrl', function ($scope, $routeParams, $modal, WatchlistService, CompanyService) {
    // get all companies in db, current watchlist in path, and add stocks in watchlist to scope
    $scope.companies = CompanyService.query();
    $scope.watchlist2 = WatchlistService.query($routeParams.listId);
    $scope.stocks = $scope.watchlist2.stocks;
    $scope.newStock = {};

    // set up modal to add stocks - ties controller scope to modal, default hide modal
    var addStockModal = $modal({
    	scope: $scope,
    	templateUrl: 'views/templates/addstock-modal.html',
    	show: false
    });

    // function get modal object then change to show modal
    $scope.showStockModal = function(){
    	addStockModal.$promise.then(addStockModal.show);
    };

    // gets data to store new stock into db
    $scope.addStock = function(){
    	$scope.watchlist2.addStock({
    		listId: $routeParams.listId,
    		company: $scope.newStock.company,
    		shares: $scope.newStock.shares
    	});

    	addStockModal.hide();
    	$scope.newStock = {};
    };
  });
