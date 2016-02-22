(function(){
    angular.module('Social')
    .controller('NavigationController', ['$scope', '$state', '$http', 'sharedData', function($scope, $state, $http, sharedData){
        
        if (localStorage['User-Data']){
            $scope.loggedIn = true;
            
            var userInfo = sharedData.getUserInfo();

            $scope.navUserName = userInfo.user;
            $scope.profileImage = userInfo.showImage;

            //console.log(userInfo);
        } else {
            $scope.loggedIn = false;
        }
        
        
        $scope.logUserIn = function(){
            $http.post('user/login', $scope.login).success(function(response){
                
                var newInfo = response;
                
                //console.log(newInfo);

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
                    newInfo.showImage = 'app/img/users/default-image.jpg';
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


angular.module('Social').factory('sharedData', function(){

    function test(){
        console.log('test here');
    }

    function setUserInfo(data){
        console.log('set user');
        console.log(data);
        localStorage.clear();
        localStorage.setItem('User-Data', JSON.stringify(data));
    }

    function getUserInfo(){
        console.log('get user');
        var userInfo = JSON.parse(localStorage['User-Data']);
        
        return userInfo;
    }

    return {
        test: test,
        getUserInfo: getUserInfo,
        setUserInfo: setUserInfo
    };
});











