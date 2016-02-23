(function(){
    angular.module('Social')
    .controller('EditTeamsController', ['Upload', '$scope', '$state', '$http', 'sharedData', function(Upload, $scope, $state, $http, sharedData){

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


        $scope.updateTeam = function(){
            $http.post('teams/update', $scope.editTeam).success(function(response){
                

                // reset variables
                sharedData.options.editTeam = '';
                $scope.editTeam = {};

                console.log('THIS IS THE UPDATED TEAM INFO');
                console.log(response);

                $state.go('teams');
            }).error(function(error){
                console.log(error);
            });
        }


        $scope.deleteTeam = function(id){
            console.log('delete team ' + id);
            var team = {'_id': id};

            $http.post('teams/del', team).success(function(response){
                $state.go('teams');
                //getTeams();

            }).error(function(error){
                console.log(error);
            })
        }


        function getTeam(id){
            var id = id;
            var teamInfo = sharedData.getTeamInfo(id);

            teamInfo.then(function(value){
                console.log('HERE IS THE TEAM INFO');
                console.log(value.data[0]);
                $scope.editTeam = value.data[0];
            });
        };


        getTeam({_id: sharedData.options.editTeam});

    }]);
}());