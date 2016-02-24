(function(){
    angular.module('Social')
    .controller('SignupController', ['$scope', '$state', '$http', function($scope, $state, $http){
        
        $scope.createUser = function(){
            $http.post('user/signup', $scope.newUser).success(function(response){
                console.log('NEW USER CREATED');
                console.log(response);
                $state.go('home');
            }).error(function(error){
                console.log(error);
            })
        }
    }]);
}());