'use strict';

/**
 * @ngdoc directive
 * @name stockerApp.directive:contenteditable
 * @description
 * # Directive to allow to change the number of stocks own on a single row in a watchlist table
 */

// regexp to ensure input is a valid number
var NUMBER_REGEXP = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/;

angular.module('stockerApp')
	// sce sanitizes user input
	.directive('contenteditable', function ($sce) {
		return {
			// restrict to an attritub usage only requiring ngModelController used with this
			restrict: 'A',
			require: 'ngModel',
			link: function postLink(scope, element, attrs, ngModelCtrl) {
				if(!ngModelCtrl){return;}

				// render is called when a view changes and needs to be updated
				ngModelCtrl.$render = function(){
					// customize render call to sanitize user input from scope and enter value into element
					element.html($sce.getTrustedHtml(ngModelCtrl.$viewValue || ''));
				};

				// read value from element, test value format, call render if correct or set old value if not right format
				var read = function(){
					var value = element.html();
					if(attrs.type === 'number' && !NUMBER_REGEXP.test(value)){
						ngModelCtrl.$render();
					} else {
						ngModelCtrl.$setViewValue(value);
					}
				};

				//
				if(attrs.type === 'number'){
					ngModelCtrl.$parsers.push(function(value){
						return parseFloat(value);
					});
				}

				// listen for changes to call read()
				element.on('blur keyup change', function(){
					// use apply() to let angularjs know something has changed
					scope.$apply(read);
				});
			}
		};
	});
