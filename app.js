var express = require('express'),
	app = express(), // Web framework to handle routing requests
	MongoClient = require('mongodb').MongoClient,
	//fs = require('fs'),
	routes = require('./app/routes'),
	BSON = require('mongodb').pure().BSON,
	ObjectID = require('mongodb').ObjectID,
	mongo = require('mongodb');
var serveIndex = require('serve-index');


//var db = new mongo.Db('pst-search', new mongo.Server("127.0.0.1", 27017));


MongoClient.connect('mongodb://localhost:27017/pst-search', function(err, db) {
	"use strict";
	if(err) throw err;

	// Register our templating engine
	app.set('view engine', 'jade');
	app.set('views', __dirname + '/src/views/pages');
	app.use(express.static(__dirname + '/theme'));
	//app.use(express.static(__dirname + '/public/uploads'));


    app.use(express.static(__dirname + "/"))
    app.use('/public', serveIndex(__dirname + '/public'));

	// Express middleware to populate 'req.body' so we can access POST variables
	app.use(express.bodyParser());
	//app.use(express.bodyParser({uploadDir: __dirname + "/public/uploads"}));
	
	// Application routes
	routes(app, db);



	app.listen(4000);
	console.log('Express server listening on port 4000');
});
