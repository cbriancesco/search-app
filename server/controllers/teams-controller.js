var mongoose = require('mongoose');
var Team = require('../datasets/teams');


module.exports.addTeam = function(req, res){
    var team = new Team(req.body);
    team.save();

    res.json(req.body);
}


module.exports.getTeam = function(req, res){
    var query = req.body;

    Team.find(query)
        .exec(function(err, teams){
        if (err){
            res.error(err)
        } else {
            res.json(teams);
        }
    })
}



module.exports.updateTeam = function (req, res){
    console.log('UPDATE TEAM');
    console.log(req.body);

    var query = {_id: req.body._id};

    var newInfo = {
        name: req.body.name,
        positions: req.body.positions,
        image: req.body.image,
        imageName: req.body.imageName
    };

    var options = {};

    Team.findOneAndUpdate(query, newInfo, options, function (err, results){
        if (err){
            console.log("Error Out");
        } else {
            console.log('RESULTS OF UPDATE');
            console.log(results);
            res.json(results);
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




module.exports.photoTeam = function (req, res){
    var file = req.files.file;
    //var userId = req.body.userId;
    
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
            res.json({fileName: file.name});
            /*User.findById(userId, function(err, userData){
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
            })*/
        }
    })
};