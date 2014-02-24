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
//app.directive('a', function () {
//	return {
//		restrict: 'E',
//		link: function (scope, elem, attrs) {
//			if (attrs.ngClick || attrs.href === '' || (attrs.href && attrs.href.charAt(0) === '#')) {
//				elem.on('click', function (e) {
//					history.pushState(null, attrs.href, attrs.href);
//					e.preventDefault();
//				});
//			}
//		}
//	};
//});

app.directive("scroll", function ($window,$interval) {
	return function (scope, element, attrs) {
		$interval(function(){

			if (checkvisible(element[0])) {
				if (!angular.element(element).hasClass( 'animated' )){
					angular.element(element).addClass('animated');
				}

			}

		},1000);
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