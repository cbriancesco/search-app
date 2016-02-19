(function(){
    angular.module('Social')
    .controller('NavigationController', ['$scope', '$state', '$http', 'sharedData', function($scope, $state, $http, sharedData){
        
        if (localStorage['User-Data']){
            $scope.loggedIn = true;
            var userInfo = JSON.parse(localStorage['User-Data']);
            $scope.navUserName = userInfo.user;
            $scope.profileImage = userInfo.showImage;
        } else {
            $scope.loggedIn = false;
        }
        
        
        $scope.logUserIn = function(){
            $http.post('user/login', $scope.login).success(function(response){
                
                var newInfo = response;

                var image = {id: response.image, name: response.imageName};

                if(newInfo.image){
                    $http.post('filedownload', image).success(function(data){
                        
                        newInfo.showImage = data.file;
                        $scope.profileImage = data.file;

                        localStorage.clear();
                        localStorage.setItem('User-Data', JSON.stringify(newInfo));
                        $scope.loggedIn = true;

                    }).error(function(error){
                        localStorage.clear();
                        localStorage.setItem('User-Data', JSON.stringify(newInfo));
                        $scope.loggedIn = true;
                    });
                }

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


angular.module('Social').factory('sharedData', function(){
    function test(){
        console.log('test here');
    }

    return {test: test};
});











