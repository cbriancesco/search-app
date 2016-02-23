(function(){
    angular.module('Social')
    .controller('TeamsController', ['Upload', '$scope', '$state', '$http', 'sharedData', '$q', function(Upload, $scope, $state, $http, sharedData, $q){

        var options = {}; 

        if (localStorage['User-Data']){
            $scope.showContent = true;
        } else {
            $scope.showContent = false;
        }



        $scope.editTeam = function(id){
            sharedData.options.editTeam = id;
            $state.go('editteam');
        }



        function getTeams(){
            var data = {};

            var teamInfo = sharedData.getTeamInfo(data);

            teamInfo.then(function(value){
                console.log('HERE IS THE TEAM INFO');
                console.log(value.data);
                $scope.myTeams = value.data;

                getImages();

            });
        };


        function getImages() {

            var defer = $q.defer();
            var promises = [];

            angular.forEach( $scope.myTeams, function(value){
                promises.push(showImage(value));
            });

            $q.all(promises).then(console.log('THATS ALL FOLKS'));

            return defer;
        }

        function showImage(value){
            console.log('HERE IS THE SAMPLE');
            console.log(value);

            if(value.image){
                var imageData = {id: value.image, name: value.imageName};
                var teamImage = sharedData.getFile(imageData);

                teamImage.then(function(image){
                    console.log('returned file')
                    console.log(image.data.file);
                    value.showImage = image.data.file;
                });
                console.log('ULTIMATE RESULT');
                console.log($scope.myTeams);
            } else {
                value.showImage = sharedData.options.defaultImage;
            }
        }

        getTeams();

    }]);
}());