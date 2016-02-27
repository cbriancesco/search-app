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
            });
        }

        var mailData = {subject: 'Test Email', maillist: ['"Caleb Briancesco" <calebbriancesco@hotmail.com>']};
        $scope.send = function(){
            $http.post('sendemail', mailData).success(function(response){
                //$state.go('home');
            }).error(function(error){
                console.log(error);
            });
        }


    }]);
}());