app.controller('homeCtrl', function ($scope) {
	$scope.height = 0;

	$scope.lastjobdate = new Date().getFullYear() - 2013 ? "Last year" : "This year";

	$scope.goToNextSection = function () {
		markni.scrollTo(document.body, $scope.getWinHeight(), 1100) || markni.scrollTo(document.documentElement, $scope.getWinHeight(), 1100);
	}

})