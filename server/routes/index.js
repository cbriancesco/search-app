var authenticationController = require('../controllers/authentication-controller'),
    teamsController = require('../controllers/teams-controller'),
    profileController = require('../controllers/profile-controller'),
    filesController = require('../controllers/files-controller'),
    adminController = require('../controllers/admin-controller'),
    emailController = require('../controllers/email-controller'),
    codesController = require('../controllers/codes-controller'),
    smsController = require('../controllers/sms-controller'),
    multipart = require('connect-multiparty'),
    multipartMiddleware = multipart();


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
    app.post('/user/profile/photo', multipartMiddleware, profileController.updatePhoto);
    app.post('/user/data/get', profileController.getUser);
    app.post('/user/data/getnum', profileController.getUserNum);
    app.post('/user/data/set', profileController.setData);

    // Admin
    app.post('/user/get/admin', adminController.getAdmin);
    app.post('/user/set/admin', adminController.setAdmin);
    app.post('/user/create/admin', adminController.createAdmin);

    // Teams
    app.post('/teams/add', teamsController.addTeam);
    app.post('/teams/get', teamsController.getTeam);
    app.post('/teams/del', teamsController.delTeam);
    app.post('/teams/update', teamsController.updateTeam);
    app.post('/teams/photo', multipartMiddleware, teamsController.photoTeam);

    // Files
    app.post('/fileupload', filesController.uploadFile);
    app.post('/filedownload', filesController.downloadFile);
    app.post('/fileexists', filesController.consultFile);
    app.post('/fileremove', filesController.removeFile);

    // Codes
    app.post('/code/newdivision', codesController.newDivision);
    app.post('/code/getall', codesController.getDivision);
    app.post('/code/remove', codesController.removeDivision);
    app.post('/code/update', codesController.updateDivision);

    // Emails
    app.post('/email/send', emailController.sendEmail);
    app.post('/email/verify', emailController.verifyEmail);

    // SMS
    app.post('/sms/send', smsController.sendSms);

};











