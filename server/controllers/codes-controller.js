var mongoose = require('mongoose');
var Code = require('../datasets/codes');


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


module.exports.removeDivision = function(req, res){
    var query = req.body;
    Code.remove(query, function (err, results) {
        if (err){
            console.log("Error Out");
        } else {
            res.json('removed');
        }
    });
}


module.exports.updateDivision = function (req, res){
    var query = {_id: req.body._id};
    var set = {division: req.body.division, codes: req.body.codes}
    var options = {};

    Code.update(query, {$set: set}, options, function(err, results){
        if (err){
            console.log("Error Out");
        } else {
            res.json(results);
        }
    });
}










