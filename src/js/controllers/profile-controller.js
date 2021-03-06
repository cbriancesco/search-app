(function(){
    angular.module('Social')
    .controller('ProfileController', ['Upload', '$scope', '$state', '$http', 'sharedData', function(Upload, $scope, $state, $http, sharedData){
        
        var options = {};
        $scope.globalUser = sharedData.getUserInfo();

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

                    options.newImage = data;

                    console.log('THIS IS THE RETURN OF THE IMAGE');
                    console.log(data);
                    $scope.profile.imageShow = '/uploads/' + data.fileName;

                }).error(function(error){
                    console.log(error);
                })
            }
        };

        
        function getUserData(){

            var userInfo = JSON.parse(localStorage['User-Data']);

            $http.post('user/profile/get', userInfo).success(function(response){
                console.log('user info');
                console.log(response);

                if(response.image){
                    options.image = {id: response.image, name: response.imageName};

                    var userImage = sharedData.getFile(options.image);

                    userImage.then(function(value){
                        $scope.profile.imageShow = value.data.file;
                    });
                } else {
                    options.image = {userId: userInfo.id};
                    $scope.imageDefault = sharedData.options.defaultImage;
                }

                $scope.profile = response;

            }).error(function(error){
                console.error(error);
            });

            $http.post('teams/get', {}).success(function (response){
                $scope.teams = response;
                $scope.teamChange();
                console.log(response);
            }).error(function(error){
                console.log(error);
            })
        }



        
        $scope.update = function(){
            console.log(options);

            if(options.newImage){

                var data = {fileName: options.newImage.fileName, userId: options.image.userId};

                var uploadedImage = sharedData.uploadFile(data);

                uploadedImage.then(function(val){

                    // HERE YOU DELETE THE OLD IMAGE 
                    if(options.image.id){
                        sharedData.deleteFile({id: options.image.id});
                    }

                    //console.log('UPLOADED IMAGE DATA');
                    //console.log(val.data);
                    options.image = {id: val.data.fileId, name: val.data.fileName};


                    console.log('NEW IMAGE VALUES');
                    console.log(val);
                    
                    $scope.profile.image = val.data.fileId;
                    $scope.profile.imageName = val.data.fileName;

                    uploadInfo();
                });

            } else {
                uploadInfo();
            }

        };



        $scope.teamChange = function() {
            for(var i = 0, max = $scope.teams.length; i < max; i += 1){
                if ($scope.teams[i].name === $scope.profile.team){
                    $scope.positions = $scope.teams[i].positions;
                }
            }
        }


        function uploadInfo(){
            console.log('Data to update');
            console.log($scope.profile);

            $http.post('user/profile/update', $scope.profile).success(function(response){
                console.log('upload returned');
                console.log(response);

                var newData = {
                    email: $scope.profile.email,
                    id: response._id,
                    user: $scope.profile.user,
                    image: $scope.profile.image,
                    imageName: $scope.profile.imageName,
                    showImage: $scope.profile.imageShow,
                    role: $scope.profile.role
                };

                sharedData.setUserInfo(newData);

            }).error(function(error){
                console.error(error);
            });
        }
        

    }]);
}());