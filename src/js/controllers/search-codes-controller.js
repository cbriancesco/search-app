(function(){
    angular.module('Social')
    .controller('CodesController', ['$scope', '$state', '$http', 'sharedData', function($scope, $state, $http, sharedData){

        $scope.searchCodes = function(){
            var query = {division: $scope.codeSelection};
            getCodes(query);
        }

        function getCodes(data){
            var query = data || {};
            $http.post('code/getall', query).success(function(response){
                if(data){
                    console.log(response[0].codes);
                    $scope.codes = response[0].codes;
                } else {
                   $scope.divisions = response; 
                }
            }).error(function(error){
                console.error(error);
            });
        }

        getCodes();
    }]);
}());