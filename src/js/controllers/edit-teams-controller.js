(function(){
    angular.module('Social')
    .controller('EditTeamsController', ['Upload', '$scope', '$state', '$http', 'sharedData', function(Upload, $scope, $state, $http, sharedData){

        var options = {};

        if (localStorage['User-Data']){
            $scope.showContent = true;
        } else {
            $scope.showContent = false;
        }

        // IMAGES DETECTION
        $scope.$watch(function(){
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
                    data: {userId: sharedData.options.editTeam},
                    file: file
                }).progress(function(evt){
                    //console.log(evt.loaded + ' of ' + evt.total);

                }).success(function(data){

                    options.newImage = data;

                    console.log('THIS IS THE RETURN OF THE IMAGE');
                    console.log(data);
                    $scope.editTeam.imageShow = '/uploads/' + data.fileName;

                }).error(function(error){
                    console.log(error);
                })
            }
        };


        $scope.updateTeam = function(){


            if(options.newImage){

                var data = {fileName: options.newImage.fileName, userId: options.newImage.userId};

                var uploadedImage = sharedData.uploadFile(data);

                uploadedImage.then(function(val){

                    // HERE YOU DELETE THE OLD IMAGE 
                    if(options.image && options.image.id){
                        sharedData.deleteFile({id: options.image.id});
                    }

                    //console.log('UPLOADED IMAGE DATA');
                    //console.log(val.data);
                    options.image = {id: val.data.fileId, name: val.data.fileName};


                    console.log('NEW IMAGE VALUES');
                    console.log(val);
                    
                    $scope.editTeam.image = val.data.fileId;
                    $scope.editTeam.imageName = val.data.fileName;

                    updateData();
                });
            } else {
                updateData();
            }

            
        }

        function updateData(){
            $scope.editTeam.positions = $scope.positions.split(",");

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
                $scope.positions = value.data[0].positions.toString();

                if(value.data[0].image){
                    options.image = {id: value.data[0].image, name: value.data[0].imageName};

                    var userImage = sharedData.getFile(options.image);

                    userImage.then(function(value){
                        $scope.editTeam.imageShow = value.data.file;
                    });

                } else {
                    $scope.editTeam.imageShow = sharedData.options.defaultImage;
                }
            });
        };


        getTeam({_id: sharedData.options.editTeam});

    }]);
}());