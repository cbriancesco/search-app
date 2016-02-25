(function(){
    angular.module('Social')
    .controller('PeopleController', ['Upload', '$scope', '$state', '$http', 'sharedData', '$q', function(Upload, $scope, $state, $http, sharedData, $q){

        $scope.globalUser = sharedData.getUserInfo();

        if (localStorage['User-Data']){
            $scope.showContent = true;
        } else {
            $scope.showContent = false;
        }


        $scope.showPerson = function(data){
            $scope.user = data;
        }

        $scope.cleanUser = function(){
            $scope.user = null;
        }

        function getUsers(){
            var data = {};
            $scope.user = null;
            var usersInfo = sharedData.getPeople(data);

            usersInfo.then(function(value){
                console.log('PEOPLE RESULTS');
                console.log(value.data);
                $scope.people = value.data;

                getImages(value.data);

            });
        };

        // GET AND SET THE ROLES
        var setRoles = sharedData.getRoles();
        setRoles.then(function(result){
            $scope.roles = result.data.roles;
        });


        $scope.updateRole = function(data){
            console.log(data._id);
            var query = {id: data._id, set: {role: data.role}};

            console.log(query);
            
            var setRole = sharedData.userSet(query);

            setRole.then(function(result){
                console.log('UPDATED ROLE');
                console.log(result);
            });
        }


        function getImages(list) {

            var defer = $q.defer();
            var promises = [];

            angular.forEach( list, function(value){
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

        getUsers();

    }]);
}());