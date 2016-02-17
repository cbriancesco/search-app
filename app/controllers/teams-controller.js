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