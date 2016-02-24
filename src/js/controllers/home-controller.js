(function(){
    angular.module('Social')
    .controller('HomeController', ['$scope', '$state', '$http', 'sharedData', function($scope, $state, $http, sharedData){

        $scope.globalUser = sharedData.getUserInfo();

        $scope.createUser = function(){
            console.log($scope.newUser);
            $http.post('user/signup', $scope.newUser).success(function(response){
                $state.go('home');
            }).error(function(error){
                console.log(error);
            })
        }
    }]);
}());