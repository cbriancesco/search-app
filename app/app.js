(function(){
    angular.module('Social', ['ui.router', 'ngFileUpload'])
    .config(function($stateProvider, $urlRouterProvider){
    
        $urlRouterProvider.otherwise('/');

        $stateProvider
        .state('home', {
            url: "/",
            templateUrl: "app/templates/home.html",
            controller: "HomeController"
        })
        .state('signUp', {
            url: "/signup",
            templateUrl: "app/templates/signup.html",
            controller: "SignupController"
        })
        .state('teams', {
            url: "/teams",
            templateUrl: "app/templates/create-team.html",
            controller: "TeamsController"
        })
        .state('editProfile', {
            url: "/editprofile",
            templateUrl: "app/templates/edit-profile.html",
            controller: "ProfileController"
        })
    })
}());
(function(){
    angular.module('Social')
    .controller('HomeController', ['$scope', '$state', '$http', function($scope, $state, $http){
        
        $scope.createUser = function(){
            console.log($scope.newUser);
            $http.post('user/signup', $scope.newUser).success(function(response){
            
            }).error(function(error){
                console.log(error);
            })
        }
    }]);
}());
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


        $scope.isImageReady = function(imageId){
            console.log('image id is ' + imageId);

            //getFile({fileId: imageId}, true);
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

                //getFile({fileId: response.image});

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
(function(){
    angular.module('Social')
    .controller('SignupController', ['$scope', '$state', '$http', function($scope, $state, $http){
        
        $scope.createUser = function(){
            console.log($scope.newUser);
            $http.post('user/signup', $scope.newUser).success(function(response){
            
            }).error(function(error){
                console.log(error);
            })
        }
    }]);
}());
(function(){
    angular.module('Social')
    .controller('TeamsController', ['$scope', '$state', '$http', function($scope, $state, $http){

        if (localStorage['User-Data']){
            $scope.showContent = true;
        } else {
            $scope.showContent = false;
        }

        $scope.createTeam = function(){
            console.log($scope.newTeam);
            $http.post('teams/add', $scope.newTeam).success(function(response){
                $scope.newTeam.name = '';

                getTeams();

            }).error(function(error){
                console.log(error);
            })
        }

        $scope.deleteTeam = function(id){
            console.log('delete team ' + id);
            var team = {'_id': id};

            $http.post('teams/del', team).success(function(response){

                getTeams();

            }).error(function(error){
                console.log(error);
            })
        }

        function getTeams(initial){
            var data = {};

            $http.post('teams/get', data).success(function (response){
                $scope.myTeams = response;
                console.log(response);
            }).error(function(error){
                console.log(error);
            })
        };

        getTeams()

    }]);
}());