(function(){
    angular.module('Social', ['ui.router'])
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
        } else {
            $scope.loggedIn = false;
        }
        
        
        $scope.logUserIn = function(){
            $http.post('user/login', $scope.login).success(function(response){
               localStorage.setItem('User-Data', JSON.stringify(response));
               $scope.loggedIn = true;
               $scope.username = response.username;
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
(function(){
    angular.module('Social')
    .controller('ProfileController', ['$scope', '$state', '$http', function($scope, $state, $http){
        
        if (localStorage['User-Data']){
            $scope.showContent = true;
            getUserData();
        } else {
            $scope.showContent = false;
        }



        
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
        }



        
        $scope.update = function(){
            /*var user = {
                id: localStorage['User-Data']._id,
                update: $scope.update
            };

            $http.post('user/profile/update', user).success(function(response){
               console.log(response);

            }).error(function(error){
                console.error(error);
            });*/
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
            })
        };

        getTeams()

    }]);
}());