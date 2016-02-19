(function(){
    angular.module('Social')
    .controller('ProfileController', ['Upload', '$scope', '$state', '$http', function(Upload, $scope, $state, $http){
        
        if (localStorage['User-Data']){
            $scope.showContent = true;
            getUserData();
        } else {
            $scope.showContent = false;
        }



        $scope.$watch(function(){
            return $scope.file
        }, function (){
           $scope.upload($scope.file); 
        });
                        
        
                        
        $scope.upload = function (file) {
            if (file){
                console.log(file);
                Upload.upload({
                    url: 'user/profile/photo',
                    method: 'POST',
                    data: {userId: $scope.profile.id},
                    file: file
                }).progress(function(evt){
                    //console.log(evt.loaded + ' of ' + evt.total);

                }).success(function(data){
                    console.log('THIS IS THE RETURN OF THE IMAGE');
                    console.log(data);
                    // Saves into gridfs
                    $http.post('fileupload', data).success(function(response){
                        console.log('UPLOADED IMAGE');
                        console.log(response);

                        $scope.profile.image = response.fileId;
                        $scope.profile.imageName = response.fileName;
                        
                        getFile({id: response.fileId, name: response.fileName});

                    }).error(function(error){
                        console.error(error);
                    });

                }).error(function(error){
                    console.log(error);
                })
            }
        };


        $scope.isImageReady = function(){

            var data = {id: $scope.profile.image, name: $scope.profile.imageName};
            
            //getFile(data);
        }


        function getFile(file){
            console.log('FILE TO GET');
            console.log(file);
            $http.post('filedownload', file).success(function(response){
                console.log('GETTING IMAGE');
                console.log(response);

                $scope.profile.imageShow = response.file;

            }).error(function(error){
                console.error(error);
            });
        }


        
        function getUserData(){

            var userInfo = JSON.parse(localStorage['User-Data']);

            var updatedInfo = {
                id: userInfo.id,
                update: $scope.update
            };

            $http.post('user/profile/get', userInfo).success(function(response){
                console.log('user info');
                console.log(response);

                var image = response.image;

                $scope.profile = response;

                getFile({id: response.image, name: response.imageName});

            }).error(function(error){
                console.error(error);
            });

            $http.post('teams/get', {}).success(function (response){
                $scope.teams = response;

                console.log(response);
            }).error(function(error){
                console.log(error);
            })
        }



        
        $scope.update = function(){
            console.log('Data to update');
            console.log($scope.profile);

            $http.post('user/profile/update', $scope.profile).success(function(response){
                var newData = {
                    email: response.email,
                    id: response._id,
                    user: response.user
                };
                
                localStorage.setItem('User-Data', JSON.stringify(newData));

            }).error(function(error){
                console.error(error);
            });
        };
        

    }]);
}());