app.controller('homeCtrl', function ($scope,$window) {
	$scope.height = 0;

	$scope.lastjobdate = new Date().getFullYear() - 2013 ? "Last year" : "This year";

	$scope.goToNextSection = function () {
		markni.scrollTo(document.body, $scope.getWinHeight(), 500) || markni.scrollTo(document.documentElement, $scope.getWinHeight(), 500);
	}

	$scope.scrollTop = function(){
		markni.scrollTo(document.body, 0, 500) || markni.scrollTo(document.documentElement, 0, 500);
	}

});