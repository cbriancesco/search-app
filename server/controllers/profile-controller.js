var mongoose = require('mongoose');
var User = require('../datasets/users');


module.exports.getProfile = function (req, res){
    User.findById(req.body.id, function (err, results){
        if (err){
            console.log("Error Out");
        } else {
          res.json({email: results.email,
                      id: results._id,
                      username: results.user,
                      image: results.image,
                      team: results.team,
                      empId: results.empId
                    });
        }
    })
}