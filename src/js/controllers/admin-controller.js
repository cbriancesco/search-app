(function(){
    angular.module('Social')
    .controller('AdminController', ['$scope', '$state', '$http', 'sharedData', '$q', function($scope, $state, $http, sharedData, $q){
        
        var adminNew = false;

        // GET AND SET THE ROLES
        var getAdmin = getAdmin();
        getAdmin.then(function(result){
            if(!result.data){
               adminNew = true; 
            }
            console.log(result);
            if(result.data && result.data.roles){
                $scope.admin = result.data;
                $scope.roles = result.data.roles.toString();
            }
            
        });


        $scope.updateAdmin = function(){
            if($scope.roles){
                var array = $scope.roles.split(',');
                $scope.admin.roles = array;
                console.log($scope.admin);
            }

            if(!adminNew){
                var updateAdmin = setAdmin($scope.admin);
                updateAdmin.then(function(result){
                    console.log(result.data);
                    /*if(result.data && result.data.roles){
                        $scope.roles = result.data.roles.toString();
                    }*/
                    
                });
            } else {
                var updateAdmin = newAdmin($scope.admin);
                updateAdmin.then(function(result){
                    adminNew = false;
                    console.log(result.data);
                    /*if(result.data && result.data.roles){
                        $scope.roles = result.data.roles.toString();
                    }*/
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