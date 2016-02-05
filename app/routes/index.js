var ErrorHandler = require('./error').errorHandler,
    assert = require('assert'),
    fs = require("fs"),
    mongo = require('mongodb');
var fileupload = require('fileupload').createFileUpload('public/uploads').middleware;


var uuid = require('uuid'); // https://github.com/defunctzombie/node-uuid
var multiparty = require('multiparty'); // https://github.com/andrewrk/node-multiparty
var s3 = require('s3');


module.exports = exports = function(app, db) {

    // If user is at default rout will show data
    app.get('/', function(req, res){
        db.collection('teams').find().toArray(function(err, teams) {
            "use strict";
            // if error show error
            if (err) return callback(err, null);

            //res.render('homepage', {myProducts: products});
            res.render('index', {'teams': teams});
        });
    });

    // Gets the ajax request from the front end, searches the product selected and 
    // decreases the value of the product by 1 and then send the new value to the page only for verification
    app.post('/getproduct', function(req, res){
        db.collection('products').update(req.body, {$inc : {quantity: -1}}, function(err, info){
            if (err) {
                callback(err, null);
            } else {
                db.collection('products').find(req.body).toArray(function(err, product) {
                    "use strict";

                    // if error show error
                    if (err) {
                        res.send(err);
                        return callback(err, null);
                    }

                    res.send(product);
                });
            } 
        }); 
    });

    app.get('/get-teams', function(req, res){
        db.collection('teams').find().toArray(function(err, info){
            if (err) {
                callback(err, null);
            } 

            res.send(info); 
        }); 
    });

    app.post('/add-team', function(req, res){
        db.collection('teams').insert(req.body, function(err, info){
            if (err) {
                callback(err, null);
            } 

            res.send(info);
        }); 
    });

    app.post('/delete-team', function(req, res){
        console.log(req.body.id);
        db.collection('teams').remove({'_id': req.body.id}, {justOne: true}, function(err, info){
            if (err) {
                callback(err, null);
            } else {
                db.collection('teams').find().toArray(function(err, info){
                    if (err) {
                        callback(err, null);
                    } 

                    res.send(info); 
                }); 
            }
        }); 
    });

    app.post('/upload', function(req, res) {
        console.log(req.body.file);
        var form = new multiparty.Form();
        form.parse(req, function(err, fields, files) {
            var file = req.body.file;
            var contentType = file.headers['content-type'];
            var extension = req.body.fileName.substring(req.body.fileName.lastIndexOf('.'));
            var destPath = '/public/uploads/' + uuid.v4() + extension;

            var headers = {
                'x-amz-acl': 'public-read',
                'Content-Length': req.body.file.size,
                'Content-Type': req.body.file.contentType
            };
            var uploader = s3Client.upload(file.path, destPath, headers);

            uploader.on('error', function(err) {
                //TODO handle this
            });

            uploader.on('end', function(url) {
                //TODO do something with the url
                console.log('file opened:', url);
            });
        });
    });

    app.post('/uploadImage', function(req, res){
        console.log(req.body);


        var image_origial = req.body.path;

        fs.readFile(image_origial, 'binary', function(err, original_data){
            fs.writeFile(req.body.fileName, original_data, 'binary', function(err) {});
            var base64Image = new Buffer(original_data, 'binary').toString('base64');
            console.log("base64 str:");
            console.log(base64Image);
            console.log(base64Image.length);

            //var decodedImage = new Buffer(base64Image, 'base64').toString('binary');
            //console.log("decodedImage:");
            //console.log(decodedImage);
            //fs.writeFile('image_decoded.png', decodedImage, 'binary', function(err) {});
        });

        

    });
}









































