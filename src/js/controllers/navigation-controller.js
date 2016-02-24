(function(){
    angular.module('Social')
    .controller('NavigationController', ['$scope', '$state', '$http', 'sharedData', function($scope, $state, $http, sharedData){
        
        if (localStorage['User-Data']){
            $scope.loggedIn = true;
            
            var userInfo = sharedData.getUserInfo();

            $scope.navUserName = userInfo.user;
            $scope.profileImage = userInfo.showImage || sharedData.options.defaultImage;

            //console.log(userInfo);
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
                        $scope.profileImage = newInfo.showImage;

                        sharedData.setUserInfo(newInfo);

                        $scope.loggedIn = true;

                    }).error(function(error){
                        newInfo.showImage = 'app/img/users/default-image.jpg';
                        $scope.profileImage = newInfo.showImage;

                        sharedData.setUserInfo(newInfo);
                        $scope.loggedIn = true;
                    });
                } else {
                    newInfo.showImage = sharedData.options.defaultImage;
                    $scope.profileImage = newInfo.showImage;

                    sharedData.setUserInfo(newInfo);
                    $scope.loggedIn = true;
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


