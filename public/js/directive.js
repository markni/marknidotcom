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

//modify all the a tags that if href is #xxxxx, prevent default and manually push a history state
app.directive('a', function () {
	return {
		restrict: 'E',
		link: function (scope, elem, attrs) {
			console.log(attrs.href);
			if (attrs.ngClick || attrs.href === '' || (attrs.href && attrs.href.charAt(0) === '#')) {
				elem.on('click', function (e) {
					history.pushState(null, attrs.href, attrs.href);
					e.preventDefault();
				});
			}
		}
	};
});

app.directive("scroll", function ($window) {
	return function (scope, element, attrs) {
		angular.element($window).bind("scroll", function () {
			if (checkvisible(element[0])) {
				angular.element(element).addClass('animated');
			}

			scope.$apply();
		});
	};
});