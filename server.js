var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    app = express(),
    routes = require('./server/routes');

mongoose.connect('mongodb://localhost:27017/social');


app.use(bodyParser.json());
app.set('view engine', 'jade');
app.set('views', __dirname + '/src/views/pages');
app.use('/app', express.static(__dirname + '/app'));
app.use('/node_modules', express.static(__dirname + "/node_modules"));
app.use('/uploads', express.static(__dirname + "/uploads"));

// Application routes
routes(app, mongoose);

app.listen('4000', function(){
    console.log('listening for localhost:4000');
});