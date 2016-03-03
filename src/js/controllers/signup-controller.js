(function(){
    angular.module('Social')
    .controller('SignupController', ['$scope', '$state', '$http', 'sharedData', '$q', '$location', function($scope, $state, $http, sharedData, $q, $location){
        
        $scope.alerts = {};

        var roles = sharedData.getRoles();
        roles.then(function(result){
            $scope.roles = result.data.roles;
            console.log('ROLES ARE HERE');
            console.log($scope.roles);
        });

        $scope.createUser = function(){
            $scope.newUser.role = $scope.roles[0];
            $scope.newUser.verified = false;

            console.log($scope.newUser);

            $http.post('user/signup', $scope.newUser).success(function(response){
                console.log('RESPONSE HERE');
                console.log(response);

                var sendEmail = sendVerificationEmail(response);
                sendEmail.then(function(data){
                    console.log('message sent');
                    console.log(data);
                    $state.go('home');
                });
            }).error(function(error){
                console.log(error);
            })
        }


        $scope.validateUser = function(){
            //console.log('validating user');
            if($scope.newUser.user.length >= 4){
                var testUser = sharedData.getPeopleNum({user: $scope.newUser.user});
                testUser.then(function(value){
                    //console.log(value);
                    if(value.data){
                        $scope.alerts.user = 'That user is already in use';
                    } else {
                        $scope.alerts.user = '';
                    }
                });
            }
            
        }

        $scope.validateEmail = function(){
            //console.log('validating email');
            if($scope.newUser.email.length >= 4){
                var testUser = sharedData.getPeopleNum({email: $scope.newUser.email});
                testUser.then(function(value){
                    //console.log(value);
                    if(value.data){
                        $scope.alerts.email = 'That email is already in use';
                    } else {
                        $scope.alerts.email = '';
                    }
                });
            }
        }


        function sendVerificationEmail(info){
            var mailData = {id: info._id, subject: 'Please Verify your email', email: info.email, name: info.user};
            return $http.post('email/verify', mailData).success(function(response){
                return response;
            }).error(function(error){
                console.log(error);
            });
        }



        function verify(){
            //console.log($location.url().split('?')[1]);
            var userId = $location.url().split('?')[1];
            var set = {id: userId, set: {verified: true}};
            var verifyUser = sharedData.userSet(set);
            verifyUser.then(function(response){
                console.log(response);
                $scope.verified = true;
            });
        }

        if($location.path() === '/verify'){
            verify();    
        }
        

        
    }]);
}());