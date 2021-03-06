(function(){
    angular.module('Social')
    .controller('AdminController', ['$scope', '$state', '$http', 'sharedData', '$q', function($scope, $state, $http, sharedData, $q){
        
        var adminNew = false;

        // GET AND SET THE ROLES
        var getAdmin = getAdmin();
        getAdmin.then(function(result){
            if(!result.data){
                console.log('no admin data');
                adminNew = true; 
            }
            console.log(result);
            if(result.data && result.data.roles){
                $scope.admin = result.data;
                $scope.roles = result.data.roles.toString();
            } else {
                $scope.admin = {};
            }
            
        });

        // GET CODES
        getCodeDivisions();

        // CODES 
        $scope.addCodeKey = function(){
            if($scope.newkey){
                var setCode = newDivision($scope.newkey);
                setCode.then(function(data){
                    $scope.newkey = '';
                    getCodeDivisions();
                });
            }
        }

        $scope.editCodes = function(div){
            $scope.editOn = true;
            $scope.division = div;
            console.log(div);
        }

        $scope.editDone = function(){
            finishEdit();
        }

        $scope.addNewCode = function(){
            if($scope.newCode.description && $scope.newCode.code){
                $scope.division.codes = $scope.division.codes || [];
                $scope.division.codes.push($scope.newCode);

                $scope.newCode = {};
                console.log($scope.division);
            }
        }

        $scope.acceptEdit = function(data){
            updateCodes(data, finishEdit);
        }

        $scope.removeCode = function(i){
            $scope.division.codes.splice(i, 1);

            updateCodes($scope.division);
        }

        function updateCodes(data, cb){
            $http.post('code/update', data).success(function(response){
                if(cb){
                    cb();
                }
            }).error(function(error){
                console.error(error);
            });
        }

        function finishEdit(){
            $scope.editOn = false;
            $scope.division = {};
        }

        function newDivision(div){
            //{roles: ['user', 'admin', 'super admin']};
            var data = {division: div};
            return $http.post('code/newdivision', data).success(function(response){
                return response;
            }).error(function(error){
                console.error(error);
            });
        }


        function getCodeDivisions(){
            var query = {};
            $http.post('code/getall', query).success(function(response){
                $scope.divisions = response;
            }).error(function(error){
                console.error(error);
            });
        }


        $scope.deleteDivision = function(id){
            var query = {_id: id};
            $http.post('code/remove', query).success(function(response){
                getCodeDivisions();
            }).error(function(error){
                console.error(error);
            });
        }











        $scope.updateAdmin = function(){
            if($scope.roles){
                var array = $scope.roles.split(',');
                $scope.admin.roles = array;
                console.log($scope.roles);
            }

            if(!adminNew){
                var updateAdmin = setAdmin($scope.admin);
                updateAdmin.then(function(result){
                    console.log(result.data);
                    //if(result.data && result.data.roles){
                    //    $scope.roles = result.data.roles.toString();
                    //}
                    
                });
            } else {
                var updateAdmin = newAdmin($scope.admin);
                updateAdmin.then(function(result){
                    adminNew = false;
                    console.log(result.data);
                    //if(result.data && result.data.roles){
                    //    $scope.roles = result.data.roles.toString();
                    //}
                });
            }
        }








        function getAdmin(){
        //{roles: ['user', 'admin', 'super admin']};
            return $http.post('user/get/admin', {}).success(function(response){
                return response;
            }).error(function(error){
                console.error(error);
            });
        }

        function setAdmin(data){
            //{roles: ['user', 'admin', 'super admin']};
            return $http.post('user/set/admin', data).success(function(response){
                return response;
            }).error(function(error){
                console.error(error);
            });
        }

        function newAdmin(data){
            //{roles: ['user', 'admin', 'super admin']};
            return $http.post('user/create/admin', data).success(function(response){
                return response;
            }).error(function(error){
                console.error(error);
            });
        }

        
    }]);
}());