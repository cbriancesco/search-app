"use strict";

var fs = require('fs-extra');
var User = require('../datasets/users');
var path = require('path');


module.exports.updatePhoto = function (req, res){
    var file = req.files.file;
    var userId = req.body.userId;
    
    //console.log("User " + userId + " is submitting " , file);
    var uploadDate = new Date();
   
    
    var tempPath = file.path;
    var fileName = file.name; //userId + uploadDate + file.name;
    var targetPath = path.join(__dirname, "../../uploads/" + fileName);
    //var savePath = "/uploads/" + userId + uploadDate + file.name;
    
    fs.rename(tempPath, targetPath, function (err){
        if (err){
            console.log(err)
        } else {
            User.findById(userId, function(err, userData){
                var user = userData;
                //user.image = savePath;
                user.save(function(err){
                    if (err){
                        console.log("failed save")
                        res.json({status: 500})
                    } else {

                        console.log("save successful");
                        
                        res.json({fileName: file.name, userId: userId})
                    }
                })
            })
        }
    })
};


module.exports.getProfile = function (req, res){
    var query = req.body.id || req.body._id;

    console.log('USER REQUEST');
    console.log(req.body);

    User.findById(query, function (err, results){
        if (err){
            console.log("Error Out");
        } else {
            if(results){
                res.json({
                    email: results.email,
                    id: results._id,
                    user: results.user,
                    name: results.name,
                    lastName: results.lastName,
                    image: results.image,
                    imageName: results.imageName,
                    team: results.team,
                    empId: results.empId,
                    position: results.position,
                    role: results.role
                });
            }
        }
    })
}


module.exports.getUser = function (req, res){
    var query = req.body;

    User.find(query, function (err, results) {
        if (err){
            console.log("Error Out");
        } else {
          res.json(results);
        }
    });
}


module.exports.getUserNum = function (req, res){
    var query = req.body;

    User.count(query, function (err, results) {
        if (err){
            console.log("Error Out");
        } else {
          res.json(results);
        }
    });
}


module.exports.updateProfile = function (req, res){
    console.log('UPDATE PROFILE');
    console.log(req.body);

    var query = {_id: req.body.id};
    var newInfo = {
        email: req.body.email, 
        user: req.body.user,
        name: req.body.name,
        lastName: req.body.lastName,
        team: req.body.team, 
        empId: req.body.empId, 
        position: req.body.position,
        role: req.body.role,
        image: req.body.image,
        imageName: req.body.imageName
    };

    var options = {};

    User.findOneAndUpdate(query, newInfo, options, function (err, results){
        if (err){
            console.log("Error Out");
        } else {
            console.log('RESULTS OF UPDATE');
            console.log(results);
            res.json(results);
        }
    })
}