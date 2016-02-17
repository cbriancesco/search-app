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