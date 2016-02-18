var mongoose = require('mongoose');
var User = require('../datasets/users');


module.exports.getProfile = function (req, res){
    User.findById(req.body.id, function (err, results){
        if (err){
            console.log("Error Out");
        } else {
          console.log(results);
          res.json({email: results.email,
                      id: results._id,
                      user: results.user,
                      image: results.image,
                      team: results.team,
                      empId: results.empId,
                      position: results.position
                    });
        }
    })
}


module.exports.updateProfile = function (req, res){
    console.log(req.body);

    var query = {_id: req.body.id};
    var newInfo = {email: req.body.email, user: req.body.user, team: req.body.team, empId: req.body.empId, position: req.body.position};
    var options = {};

    User.findOneAndUpdate(query, newInfo, options, function (err, results){
        if (err){
            console.log("Error Out");
        } else {
          res.json(results);
        }
    })
}