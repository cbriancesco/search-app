var mongoose = require('mongoose');
var Team = require('../datasets/teams');

module.exports.addTeam = function(req, res){
    var team = new Team(req.body);
    team.save();

    res.json(req.body);
}

module.exports.getTeam = function(req, res){
    Team.find({})
        .exec(function(err, getTeams){
        if (err){
            res.error(err)
        } else {
            res.json(getTeams);
        }
    })
}

module.exports.delTeam = function(req, res){
    console.log(req.body);

    Team.findByIdAndRemove(req.body._id, function (err,offer){
        if (err){
            res.error(err)
        } else {
            res.json(req.body);
        }
    })
}