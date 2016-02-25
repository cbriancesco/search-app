var mongoose = require('mongoose');
var Admin = require('../datasets/admin');



module.exports.setAdmin = function (req, res){
    var query = {_id: req.body._id};
    var set = req.body;
    var options = {};

    Admin.update(query, { $set: set}, options, function(err, results){
        if (err){
            console.log("Error Out");
        } else {
            console.log('SET RESULTS');
            console.log(results);
            res.json(results);
        }
    });
}


module.exports.getAdmin = function (req, res){

    Admin.find({}, function (err, results) {
        if (err){
            console.log("Error Out");
        } else {
            console.log(results[0]);
            res.json(results[0]);
        }
    });
}


module.exports.createAdmin = function(req, res){
    var admin = new Admin(req.body);

    // save user to database
    admin.save(function(err) {
        if (err) throw err;
    });

    res.json(req.body);
}










