
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

            scope.getWinWidth = function() {
                return $window.innerWidth;
            }

            var setNavHeight = function(newHeight) {
                element.css('minHeight', newHeight + 'px');
            }

            // Set on load
            scope.$watch(scope.getWinHeight, function (newValue, oldValue) {
                var padding = scope.getWinWidth() < 768 ? 20:90;
                var new_height = scope.getWinHeight() - 76-padding*2;

                setNavHeight(new_height);
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