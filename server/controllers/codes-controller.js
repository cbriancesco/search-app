var mongoose = require('mongoose');
var Code = require('../datasets/codes');



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


module.exports.getDivision = function (req, res){
    var query = req.body;
    Code.find(query, function (err, results) {
        if (err){
            console.log("Error Out");
        } else {
            console.log(results);
            res.json(results);
        }
    });
}


module.exports.newDivision = function(req, res){
    var div = {division: req.body.division};
    var code = new Code(div);

    // save user to database
    code.save(function(err) {
        if (err) throw err;
    });

    res.json(div);
}










