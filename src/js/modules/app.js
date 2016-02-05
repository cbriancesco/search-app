var app = angular.module('cityApp', ['ngRoute']);


app.config(function($routeProvider){
    // Ruta principal
    $routeProvider.when('/',{  
        templateUrl:'templates/main.html',
        controller: 'mainController'
    })
    .when('/list',{  
        templateUrl:'templates/teams.html',
        controller: 'secundaryController'
    })
    .when('/add',{  
        templateUrl:'templates/add.html',
        controller: 'addController'
    });
});




app.factory('teamsFactory', function($http){ 
    var teams = [{name: "Loading Teams"}];
    
    function getAll() {

        return $http({
            method: 'GET',
            url: '/get-teams'
        }).then(function successCallback(response) {
            teams = response.data;
            
            console.log("teams");
            console.log(teams);

            return teams;

        }, function errorCallback(response) {
            console.log('error');

            return teams;
        });
    }

    function add(team) {
        $http({
            method: 'POST',
            data: team,
            url: '/add-team'
        }).then(function successCallback(response) {
            console.log('team ' + team.name + ' added');
            teams.push(team);
        }, function errorCallback(response) {
            console.log('error');
        });
    }

    function deleteTeam(id){
        console.log(id);
        return $http({
            method: 'POST',
            data: id,
            url: '/delete-team'
        }).then(function successCallback(response) {
            console.log('team removed');
            return response.data;
        }, function errorCallback(response) {
            console.log('error');
        });
    }

    function uploadImage(image){
        $http({
            method: 'POST',
            data: image,
            url: '/upload', //'/uploadImage',
            file: image.file
        }).then(function successCallback(response) {
            console.log('sent');
            response.data;
        }, function errorCallback(response) {
            console.log('error');
        });
    }

    function getId(){
        var S4 = function() {
           return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        
        return (S4()+S4()+S4()+S4()+S4()+S4()+S4()+S4());
    }


    function uploadFileToUrl(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);

        $http({method: 'POST',
            url: uploadUrl,                
            data: fd,
            transformRequest: angular.identity,
            headers: {
                'Content-Type': 'image/png', /*or whatever type is relevant */
                'Accept': 'application/json' /* ditto */
            },
        }).success(function(){
            console.log('success');
        }).error(function(){
            console.log('error');
        });

        /*$http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            
        })
        .success(function(){
            console.log('success');
        })
        .error(function(){
            console.log('error');
        });*/
    }



    return {
        getAll : getAll,
        add : add,
        deleteTeam : deleteTeam,
        getId: getId,
        uploadImage : uploadImage,
        uploadFileToUrl: uploadFileToUrl
   };
});



app.controller('mainController', function ($scope){
    $scope.name = 'Caleb';
});


app.controller('secundaryController', function ($scope, teamsFactory){
    var getAllTeams = teamsFactory.getAll();

    getAllTeams.then(function(result) {  // this is only run after $http completes
       $scope.teams = result;
    });

    $scope.deleteTeam = function(id){
        var dTeam = {
            'id': id.toString()
        };
        //teamsFactory.deleteTeam(id);

        var delTeam = teamsFactory.deleteTeam(dTeam);

        delTeam.then(function(result){
            console.log('enters here');
            $scope.teams = result;
        });
    }

});


app.controller('addController', function ($scope, teamsFactory, $http){
    var file;
    var filePath;

    $scope.addTeam = function(){
        var nTeam = {
            _id: teamsFactory.getId(),
            name: $scope.newTeam
        };

        teamsFactory.add(nTeam);

        // Limpiar los inputs          
        $scope.newTeam= '';
    }

    $scope.selectFile = function(image){
        file = image.files[0];
        //console.log(file);
        //filePath = URL.createObjectURL(event.target.files[0]);
        //console.log(image.files[0]);

        //file = $scope.myFile;
        //var uploadUrl = 'http://localhost:4000/public/uploads';
        //teamsFactory.uploadFileToUrl(file, uploadUrl);

        /*$scope.$apply(function() {
            $scope.img_url = filePath;
        });*/
        
    }

    $scope.uploadImage = function(){
        var image = {
            file: file,//file,
            path: filePath,
            fileName: file.name,
            fileType: file.type,
            fileContext: 'team profile',
            options: {
                _id: teamsFactory.getId(), // a MongoDb ObjectId
                filename: file.name, // a filename
                mode: 'w', // default value: w
                chunkSize: 1024, //1024*250,
                content_type: file.type,//'image/jpg', // For content_type to work properly, set "mode"-option to "w" too!
                root: 'images'
            }
        };

        teamsFactory.uploadImage(image);

        console.log(image); ///uploadImage
    }







    $scope.onFileSelect = function(image) {
        console.log('select file');

        $scope.uploadInProgress = true;
        $scope.uploadProgress = 0;

        if (angular.isArray(image)) {
            image = image[0];
        }

        $http({
                url: '/public/uploads',
                method: 'POST',
                data: {
                type: 'profile'
            },
            file: image
        }).success(function(data, status, headers, config) {
            console.log('Photo uploaded!');
        }).error(function(err) {
            $scope.uploadInProgress = false;
            console.log('Error uploading file: ' + err.message || err);
        });
    };
});






