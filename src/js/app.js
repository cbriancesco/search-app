(function(){
    angular.module('Social', ['ui.router', 'ngFileUpload'])
    .config(function($stateProvider, $urlRouterProvider){
    
        $urlRouterProvider.otherwise('/');

        $stateProvider
        .state('home', {
            url: "/",
            templateUrl: "app/templates/home.html",
            controller: "HomeController"
        })
        .state('signUp', {
            url: "/signup",
            templateUrl: "app/templates/signup.html",
            controller: "SignupController"
        })
        .state('teams', {
            url: "/teams",
            templateUrl: "app/templates/all-teams.html",
            controller: "TeamsController"
        })
        .state('newteam', {
            url: "/teaminfo",
            templateUrl: "app/templates/create-team.html",
            controller: "TeamsController"
        })
        .state('editteam', {
            url: "/editteam",
            templateUrl: "app/templates/edit-team.html",
            controller: "EditTeamsController"
        })
        .state('editProfile', {
            url: "/editprofile",
            templateUrl: "app/templates/edit-profile.html",
            controller: "ProfileController"
        })
    })
}());