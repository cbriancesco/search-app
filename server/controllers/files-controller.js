var mongoose = require('mongoose');



var express = require('express');
var formidable = require('formidable');
var grid = require('gridfs-stream');
var fs = require('fs');
var util = require('util');
var app = express();


module.exports.uploadFile = function(req, res){
    
    console.log('THIS IS THE FILES DATA');
    //console.log(req.);

    var form = new formidable.IncomingForm();
    form.uploadDir = __dirname + "./uploads";
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
        if (!err) {
            console.log('File uploaded : ' + files.file.path);
            grid.mongo = mongoose.mongo;
            var conn = mongoose.createConnection('..mongo connection string..');
            
            conn.once('open', function () {
                var gfs = grid(conn.db);
                var writestream = gfs.createWriteStream({
                    filename: files.file.name
                });
                fs.createReadStream(files.file.path).pipe(writestream);
            });
        } else {
            console.log(err);
        }   
    });
    form.on('end', function() {        
        res.send('Completed ..... go and check fs.files & fs.chunks in  mongodb');
   });





}

