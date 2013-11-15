
angular.module('marknidotcom', [])

    .controller('homeCtrl', function($scope) {
        $scope.height = 0;

        $scope.lastjobdate = new Date().getFullYear() - 2013 ? "Last year" : "This year";

        $scope.goToNextSection = function(){
            markni.scrollTo(document.body,$scope.getWinHeight(),1100)||markni.scrollTo(document.documentElement,$scope.getWinHeight(),1100);
        }

    })




    .directive('autoheight', function ($window) {
        return function (scope, element) {
            scope.getWinHeight = function() {
                return $window.innerHeight;
            }

            var setNavHeight = function(newHeight) {
                element.css('minHeight', newHeight + 'px');
            }

            // Set on load
            scope.$watch(scope.getWinHeight, function (newValue, oldValue) {
                setNavHeight(scope.getWinHeight() - 76-90*2);
            }, true);

            // Set on resize
            angular.element($window).bind('resize', function () {
                scope.$apply();
            });
        };
    })


    //modify all the a tags that if href is #xxxxx, prevent default and manually push a history state
    .directive('a', function() {
    return {
        restrict: 'E',
        link: function(scope, elem, attrs) {
            console.log(attrs.href);
            if(attrs.ngClick || attrs.href === '' || (attrs.href && attrs.href.charAt(0) === '#')){
                elem.on('click', function(e){
                    history.pushState(null,null, attrs.href);
                    e.preventDefault();
                });
            }
        }
    };
});