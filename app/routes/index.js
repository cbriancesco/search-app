var ErrorHandler = require('./error').errorHandler,
    GridStore = require('mongodb').GridStore,
    assert = require('assert');
    fs = require('fs'),
    Grid = require('gridfs-stream'),
    mongo = require('mongodb');

var db = new mongo.Db('pst-search', new mongo.Server("127.0.0.1", 27017));
var gfs = Grid(db, mongo);

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

    app.post('/uploadImage', function(req, res){
        console.log(req.body.options.filename);  

        var writestream = gfs.createWriteStream([req.body.optionsoptions]);
        fs.createReadStream(req.body.path).pipe(writestream);

        writestream.on('finish', function() {
            return res.status(200).send({
                message: fileId.toString()
            });
        });

        /*// Set up gridStore
        var stream = new GridStore(db, req.body.options.filename, 'w', req.body.options).stream();
        // File we want to write to GridFS
        var filename = './' + req.body.options.filename;  
        // Create a file reader stream to an object
        var fileStream = fs.createReadStream(filename);

        // Finish up once the file has been all read
        stream.on("end", function(err) {
            // Just read the content and compare to the raw binary
            GridStore.read(db, req.body.options.filename, function(err, gridData) {
                assert.equal(null, err);
                var fileData = fs.readFileSync(filename);
                assert.equal(fileData.toString('hex'), gridData.toString('hex'));
                db.close();
            })
        });

        // Pipe it through to the gridStore
        fileStream.pipe(stream);  */

    });
}


















