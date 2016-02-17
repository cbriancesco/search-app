var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    app = express(),
    authenticationController = require('./server/controllers/authentication-controller'),
    teamsController = require('./server/controllers/teams-controller');
//var routes = require('./app/routes');


mongoose.connect('mongodb://localhost:27017/social');

app.use(bodyParser.json());
app.set('view engine', 'jade');
app.set('views', __dirname + '/src/views/pages');
app.use('/app', express.static(__dirname + '/app'));
app.use('/node_modules', express.static(__dirname + "/node_modules"));
app.use('/uploads', express.static(__dirname + "/uploads"));

// Application routes
//routes(app, db);

app.get('/', function(req, res){
    res.render('index');
    //res.sendFile(__dirname + '/src/views/index.html');
});


// Authentication
app.post('/user/signup', authenticationController.signup);
app.post('/user/login', authenticationController.login);

// Teams
app.post('/teams/add', teamsController.addTeam);
app.post('/teams/get', teamsController.getTeam);
app.post('/teams/del', teamsController.delTeam);


app.listen('4000', function(){
    console.log('listening for localhost:4000');
});