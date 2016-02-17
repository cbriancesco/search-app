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