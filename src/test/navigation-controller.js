(function(){
    angular.module('Social')
    .controller('NavigationController', ['$scope', '$state', '$http', 'sharedData', function($scope, $state, $http, sharedData){
        
        if (localStorage['User-Data']){
            $scope.loggedIn = true;
            var userInfo = JSON.parse(localStorage['User-Data']);
            $scope.navUserName = userInfo.user;
        } else {
            $scope.loggedIn = false;
        }
        
        
        $scope.logUserIn = function(){
            $http.post('user/login', $scope.login).success(function(response){
               localStorage.setItem('User-Data', JSON.stringify(response));
               $scope.loggedIn = true;
               
               console.log('LOGUED USER INFO');
               console.log(response);

            }).error(function(error){
                console.error(error);
            });
        };
        
        $scope.logOut = function () {
            localStorage.clear();
            $scope.loggedIn = false;

            $state.go('home');
        }

        $scope.onSomethingHappened = function reload(){

        }

    }]);


}());


angular.module('Social').factory('sharedData', function(){
    function test(){
        console.log('test here');
    }

    return {test: test};
});











