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


angular.module('Social').factory('sharedData', function($http){
    var options = {
        defaultImage : 'app/img/users/default-image.jpg'
    };

    function test(){
        console.log('test here');
    }

    function setUserInfo(data){
        console.log('set user');
        console.log(data);
        localStorage.clear();
        localStorage.setItem('User-Data', JSON.stringify(data));

        document.location.reload(true);
    }

    function getUserInfo(){
        console.log('get user');
        var userInfo = JSON.parse(localStorage['User-Data']);
        
        return userInfo;
    }

    /* param {file} = json object -> {name: 'file name', id: 'file id'}*/
    function getFile(file){
        return $http.post('filedownload', file).success(function(response){
            console.log('GETTING IMAGE');
            console.log(response);
            return response;

        }).error(function(error){
            console.error(error);
        });
    }

    function uploadFile(data){
        // Saves into gridfs
        return $http.post('fileupload', data).success(function(response){
            console.log('UPLOADED IMAGE');
            console.log(response);

            return response;

        }).error(function(error){
            console.error(error);
        });
    }


    function fileConsult(data){
        console.log('CONSULTING FILE');

        return $http.post('fileexists', data).success(function(response){
            console.log(response);
            return response.data;

        }).error(function(){
            console.log('THERE WAS AN ERROR');
            console.error(error);
        });
    }


    function deleteFile(data){
        $http.post('fileremove', data).success(function(response){
            console.log('File deleted');
        }).error(function(){
            console.log('THERE WAS AN ERROR');
            console.error(error);
        });
    }


    return {
        options: options,
        getUserInfo: getUserInfo,
        setUserInfo: setUserInfo,
        getFile: getFile,
        uploadFile: uploadFile,
        fileConsult: fileConsult,
        deleteFile: deleteFile
    };
});











