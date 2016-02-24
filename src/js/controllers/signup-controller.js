(function(){
    angular.module('Social')
    .controller('SignupController', ['$scope', '$state', '$http', 'sharedData', '$q', function($scope, $state, $http, sharedData, $q){
        
        $scope.alerts = {};

        $scope.createUser = function(){
            $http.post('user/signup', $scope.newUser).success(function(response){
                console.log('NEW USER CREATED');
                console.log(response);
                $state.go('home');
            }).error(function(error){
                console.log(error);
            })
        }


        $scope.validateUser = function(){
            console.log('validating user');
            if($scope.newUser.user.length >= 4){
                var testUser = sharedData.getPeopleNum({user: $scope.newUser.user});
                testUser.then(function(value){
                    console.log(value);
                    if(value.data){
                        $scope.alerts.user = 'That user is already in use';
                    } else {
                        $scope.alerts.user = '';
                    }
                });
            }
            
        }

        $scope.validateEmail = function(){
            console.log('validating email');
            if($scope.newUser.email.length >= 4){
                var testUser = sharedData.getPeopleNum({email: $scope.newUser.email});
                testUser.then(function(value){
                    console.log(value);
                    if(value.data){
                        $scope.alerts.email = 'That email is already in use';
                    } else {
                        $scope.alerts.email = '';
                    }
                });
            }
        }

        
    }]);
}());