angular.module('Social').factory('sharedData', function($http){
    var options = {
        defaultImage : 'app/img/users/default-image.jpg'
    };

    if(localStorage['User-Data']){
        options.globalUser = JSON.parse(localStorage['User-Data']);
    }

    function setUserInfo(data, cb){
        console.log('set user <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
        console.log(data);
        localStorage.clear();
        localStorage.setItem('User-Data', JSON.stringify(data));
        options.globalUser = data;

        if(cb){
            cb();
        }

        document.location.reload(true);
    }

    function reload(){
        document.location.reload(true);
    }

    function getUserInfo(){
        if(localStorage['User-Data']){
    
            console.log('get user');

            var userInfo = JSON.parse(localStorage['User-Data']);
            console.log(userInfo);
            
            return userInfo;
        }
    }

    /* param {data} = json : {id: <string>, set: <json> */
    function userSet(data){
        return $http.post('user/data/set', data).success(function(response){
            console.log('Setting value');
            console.log(response);
            return response;

        }).error(function(error){
            console.error(error);
        });
    }


    /* param {file} = json object -> {name: <string>, id: <string> */
    function getFile(file){
        return $http.post('filedownload', file).success(function(response){
            console.log('GETTING IMAGE');
            console.log(response);
            return response;

        }).error(function(error){
            console.error(error);
        });
    }

    function uploadFile(data){
        // Saves into gridfs
        return $http.post('fileupload', data).success(function(response){
            console.log('UPLOADED IMAGE');
            console.log(response);

            return response;

        }).error(function(error){
            console.error(error);
        });
    }


    function fileConsult(data){
        console.log('CONSULTING FILE');

        return $http.post('fileexists', data).success(function(response){
            console.log(response);
            return response.data;

        }).error(function(){
            console.log('THERE WAS AN ERROR');
            console.error(error);
        });
    }


    function deleteFile(data){
        $http.post('fileremove', data).success(function(response){
            console.log('File deleted');
        }).error(function(){
            console.log('THERE WAS AN ERROR');
            console.error(error);
        });
    }



    function getTeamInfo(team){
        return $http.post('teams/get', team).success(function(response){
            return response;
        }).error(function(error){
            console.error(error);
        });
    }

    function getPeople(query){
        return $http.post('user/data/get', query).success(function(response){
            return response;
        }).error(function(error){
            console.error(error);
        });
    }

    function getPeopleNum(query){
        return $http.post('user/data/getnum', query).success(function(response){
            return response;
        }).error(function(error){
            console.error(error);
        });
    }

    function getRoles(){
        //{roles: ['user', 'admin', 'super admin']};
        return $http.post('user/get/admin', {}).success(function(response){
            return response;
        }).error(function(error){
            console.error(error);
        });
    }

    return {
        options: options,
        getUserInfo: getUserInfo,
        setUserInfo: setUserInfo,
        getFile: getFile,
        uploadFile: uploadFile,
        fileConsult: fileConsult,
        deleteFile: deleteFile,
        getTeamInfo: getTeamInfo,
        getPeople: getPeople,
        getPeopleNum: getPeopleNum,
        userSet: userSet,
        getRoles: getRoles
    };
});