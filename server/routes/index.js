var authenticationController = require('../controllers/authentication-controller'),
    teamsController = require('../controllers/teams-controller'),
    profileController = require('../controllers/profile-controller');

module.exports = exports = function(app, db) {

    app.get('/', function(req, res){
        res.render('index');
    });


    // Authentication
    app.post('/user/signup', authenticationController.signup);
    app.post('/user/login', authenticationController.login);

    // Profiles
    app.post('/user/profile/get', profileController.getProfile);
    app.post('/user/profile/update', profileController.updateProfile);

    // Teams
    app.post('/teams/add', teamsController.addTeam);
    app.post('/teams/get', teamsController.getTeam);
    app.post('/teams/del', teamsController.delTeam);

};