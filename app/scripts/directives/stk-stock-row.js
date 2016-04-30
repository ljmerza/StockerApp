'use strict';

/**
 * @ngdoc directive
 * @name stockerApp.directive:stkStockRow
 * @description
 * # a single row in a watchlist table
 */
angular.module('stockerApp')
	.directive('stkStockRow', function ($timeout, QuoteService) {
		return {
			restrict: 'A',
			// require stock table controller to be a parent when using this directive - ^ means search on parent scope
			require: '^stkStockTable',
			scope: {
				// allow only these parent variables into this directive's isolated scope - the stock and if this is the last row
				stock: '=',
				isLast: '='
			},
			link: function postLink($scope, element, attrs, stockTableCtrl) {
				element.tooltip({
					placement: 'left',
					title: $scope.stock.company.name
				});

				stockTableCtrl.addRow($scope);

				QuoteService.register($scope.stock);

				$scope.$on('$destroy', function(){
					stockTableCtrl.removeRow($scope);
					QuoteService.deregister($scope.stock);
				});

				// if last ow then get new stock data
				if($scope.isLast){
					$timeout(QuoteService.fetch);
				}

				// watch for stock shares changes to update market value and day change
				$scope.$watch('stock.shares', function() {
					$scope.stock.marketValue = $scope.stock.shares * $scope.stock.lastPrice;
					$scope.stock.dayChange = $scope.stock.shares * parseFloat($scope.stock.change);
					$scope.stock.save();
				});
			}
		};
	});
