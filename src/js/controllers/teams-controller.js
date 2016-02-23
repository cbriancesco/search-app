(function(){
    angular.module('Social')
    .controller('TeamsController', ['Upload', '$scope', '$state', '$http', 'sharedData', function(Upload, $scope, $state, $http, sharedData){

        var options = {}; 

        if (localStorage['User-Data']){
            $scope.showContent = true;
        } else {
            $scope.showContent = false;
        }

        // IMAGES DETECTION
        /*$scope.$watch(function(){
            return $scope.file
        }, function (){
           $scope.upload($scope.file); 
        });

        $scope.upload = function (file) {
            if (file){
                console.log(file);
                Upload.upload({
                    url: 'teams/photo',
                    method: 'POST',
                    //data: {userId: $scope.profile.id},
                    file: file
                }).progress(function(evt){
                    //console.log(evt.loaded + ' of ' + evt.total);

                }).success(function(data){

                    //options.newImage = data;

                    console.log('THIS IS THE RETURN OF THE IMAGE');
                    console.log(data);
                    $scope.newTeam.imageShow = '/uploads/' + data.fileName;

                }).error(function(error){
                    console.log(error);
                })
            }
        };*/

        $scope.createTeam = function(){
            console.log($scope.newTeam);

            var array = $scope.positions;

            $scope.newTeam.positions = array.split(",");

            $http.post('teams/add', $scope.newTeam).success(function(response){
                $scope.newTeam.name = '';

                $state.go('teams');
                getTeams();

            }).error(function(error){
                console.log(error);
            });
        }



        


        $scope.editTeam = function(id){
            sharedData.options.editTeam = id;
            $state.go('editteam');
        }



        function getTeams(){
            var data = {};

            /*var teamInfo = sharedData.getTeamInfo(data);

            teamInfo.then(function(value){
                console.log('HERE IS THE TEAM INFO');
                console.log(value);
                $scope.myTeams = value;
            });*/

            $http.post('teams/get', data).success(function (response){
                $scope.myTeams = response;
                console.log(response);
            }).error(function(error){
                console.log(error);
            })
        };

        getTeams();

    }]);
}());