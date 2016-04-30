'use strict';

/**
 * @ngdoc directive
 * @name stockerApp.directive:stkSignFade
 * @description
 * # Directive to make fade animation of changes in stock information
 */
angular.module('stockerApp')
	.directive('stkSignFade', function ($animate) {
		return {
			restrict: 'A',
			link: function postLink(scope, element, attrs) {
				var oldVal = null;
				// observe changes in values in element
				attrs.$observe('stkSignFade', function(newVal){

					// if no change then do nothing
					if(oldVal && oldVal === newVal){
						return;
					}

					// format and save new price
					var oldPrice = parseFloat(oldVal);
					var newPrice = parseFloat(newVal);
					oldVal = newVal;

					// if old and new prices exist, change css classes to start animation
					if(oldPrice && newPrice){
						var animationClass = 'change-' + ((oldPrice > newPrice) ? 'down' : 'up');
						$animate.addClass(element, animationClass).then(function(){
							$animate.removeClass(element, animationClass);
						});
					}
				});
			}
		};
	});
