'use strict';

/**
 * @ngdoc directive
 * @name stockerApp.directive:stkSignColor
 * @description
 * # Drietive used to change the color of the day/price change
 */
angular.module('stockerApp')
	.directive('stkSignColor', function () {
		return {
			restrict: 'A',
			link: function postLink(scope, element, attrs) {
				// observe will be called once during next digest - function invoked when vaue changes
				attrs.$observe('stkSignColor', function(newVal){
					var newSign = parseFloat(newVal);
					// change css style based on value of attrib
					if(newSign > 0){
						element[0].style.color = 'Green';
					} else if(newSign < 0) {
						element[0].style.color = 'Red';
					} else {
						element[0].style.color = '';
					}
				});
			}
		};
	});
