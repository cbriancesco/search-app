(function(){
    angular.module('Social')
    .controller('HomeController', ['$scope', '$state', '$http', 'sharedData', function($scope, $state, $http, sharedData){

        $scope.globalUser = sharedData.getUserInfo();

        var mailData = {subject: 'Test Email', maillist: ['"Caleb Briancesco" <jafat.briancesco@prodigious.com>']};
        $scope.send = function(){
            $http.post('email/send', mailData).success(function(response){
                //$state.go('home');
            }).error(function(error){
                console.log(error);
            });
        }

        $scope.sendSms = function(){
            $http.post('sms/send', {}).success(function(response){
                //$state.go('home');
            }).error(function(error){
                console.log(error);
            });
        }

    }]);
}());