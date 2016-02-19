var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('../datasets/users');
var conn = mongoose.connection;
 
var fs = require('fs');
 
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;





module.exports.uploadFile = function(req, res){
    
    console.log('THIS IS THE FILES DATA');
    //{fileName: <string>, userId: <string>}
    console.log(req.body);

    
    var gfs = Grid(conn.db);
 
    var writestream = gfs.createWriteStream({
        filename: req.body.fileName
    });

    fs.createReadStream('uploads/' +  req.body.fileName).pipe(writestream);
 
    writestream.on('close', function (file) {
        console.log('CREATED FILE');
        console.log(file);
        res.json({fileId: file._id, userId: req.body.userId, fileName: file.filename})
        // do something with `file`
        console.log(file.filename + ' Written To DB');
    });

}


module.exports.downloadFile = function(req, res){
    console.log('TO DOWNLOAD');
    console.log(req);

    //write content to file system
    var gfs = Grid(conn.db);
    var filePath = 'downloads/' + req.body.name;
    var fs_write_stream = fs.createWriteStream(filePath);
     
    //read from mongodb
    var readstream = gfs.createReadStream({
         _id: req.body.id
    });

    readstream.pipe(fs_write_stream);

    fs_write_stream.on('close', function () {
        res.json({file: filePath});
        console.log('file has been written fully!');
    });

}











 










