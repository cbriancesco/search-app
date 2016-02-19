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
                Upload.upload({
                    url: 'user/profile/photo',
                    method: 'POST',
                    data: {userId: $scope.profile.id},
                    file: file
                }).progress(function(evt){
                    console.log(evt.loaded + ' of ' + evt.total);
                }).success(function(data){
                    


                    $http.post('fileupload', data).success(function(response){
                       console.log(response);

                       $scope.profile = response;

                    }).error(function(error){
                        console.error(error);
                    });



                }).error(function(error){
                    console.log(error);
                })
            }
        };


        
        function getUserData(){

            var userInfo = JSON.parse(localStorage['User-Data']);

            var updatedInfo = {
                id: userInfo.id,
                update: $scope.update
            };

            $http.post('user/profile/get', userInfo).success(function(response){
               console.log(response);

               $scope.profile = response;

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
            console.log($scope.profile);

            $http.post('user/profile/update', $scope.profile).success(function(response){
                var newData = {
                    email: response.email,
                    id: response._id,
                    user: response.user
                };
                
                console.log('before');
                console.log(localStorage['User-Data']);
                localStorage.setItem('User-Data', JSON.stringify(newData));
                console.log('after');
                console.log(localStorage['User-Data']);

            }).error(function(error){
                console.error(error);
            });
        };
        

    }]);
}());