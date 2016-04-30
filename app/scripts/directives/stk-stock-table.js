'use strict';

/**
 * @ngdoc directive
 * @name stockerApp.directive:stkStockTable
 * @description
 * # a table in a single watchlist
 */
angular.module('stockerApp')
	.directive('stkStockTable', function () {
		return {
			templateUrl: 'views/templates/stock-table.html',
			//make this directive an element when being used in html
			restrict: 'E',
			scope: {
				// only allow watchlist parent variable into this diective's scope
				watchlist: '='
			},
			controller: function($scope){
				var rows = [];
				// watch for changes in show percent boolean to switch between view format in table
				$scope.$watch('showPercent', function(showPercent){
					if(showPercent){
						_.each(rows, function(row){
							row.showPercent = showPercent;
						});
					}
				});

				// add and remove rows of stock
				this.addRow = function(row){
					rows.push(row);
				};
				this.removeRow = function(row){
					_.remove(rows, row);
				};
			},

			// add showPercent variable and ability to remove a row to scope
			link: function postLink($scope) {
				$scope.showPercent = false;
				$scope.removeStock = function(stock){
					$scope.watchlist.removeStock(stock);
				};
			}
		};
	});
