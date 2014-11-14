/**
 * auto expand the element to window inner height
 */
app.directive('autoheight', function ($window) {
	return function (scope, element) {
		scope.getWinHeight = function () {
			return $window.innerHeight;
		};

		scope.getWinWidth = function () {
			return $window.innerWidth;
		};

		var getNewHeight = function () {
			var new_height = scope.getWinHeight();
			return new_height;
		};

		var setNavHeight = function (newHeight) {
			element.css('minHeight', newHeight + 'px');
		};

		// Set on load
		scope.$watch(scope.getWinHeight, function (newValue, oldValue) {
			setNavHeight(getNewHeight());
		}, true);

		scope.$watch(scope.getWinWidth, function (newValue, oldValue) {
			setNavHeight(getNewHeight());
		}, true);

		// Set on resize
		angular.element($window).bind('resize', function () {
			scope.$apply();
		});
	};
});

/**
 * monitor page scroll and add 'animated' class to element when visible
 */
app.directive("scroll", function ($window,$interval) {
	return function (scope, element, attrs) {

		angular.element($window).bind("scroll", function () {
//			console.log((+new Date()));
			if (checkvisible(element[0])) {
				if (!angular.element(element).hasClass( 'animated' )){
					angular.element(element).addClass('animated');
				}

			}

			scope.$apply();
		});
	};
});