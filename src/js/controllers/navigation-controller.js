(function(){
    angular.module('Social')
    .controller('NavigationController', ['$scope', '$state', '$http', function($scope, $state, $http){
        
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

    }]);
}());


/*angular.module('Social', [])
.service('sharedProperties', function () {
    var property = 'First';

    return {
        getUser: function () {
            return property;
        },
        setUser: function(value) {
            property = value;
        }
    };
});*/