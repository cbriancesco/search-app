var mongoose = require('mongoose');
var User = require('../datasets/users');


module.exports.signup = function(req, res){
    var user = new User(req.body);

    // save user to database
    user.save(function(err, info) {
        if (err){ 
            throw err;
        } else {
            res.json({_id: info._id, email: info.email, user: info.user});
        }
    });

}



module.exports.login = function (req, res){
    var user = req.body.user;
    var pass = req.body.password;

    // fetch user and test password verification
    User.findOne({ user: user }, function(err, user) {
        if (err) throw err;

        if(user){
            // test a matching password
            user.comparePassword(pass, function(err, isMatch) {
                if (err) throw err;

                if(isMatch){
                    console.log('PASSWORD MATCH');
                    console.log(pass, isMatch); // -&gt; Password123: true
                    res.json({email: user.email,
                            id: user._id,
                            user: user.user,
                            image: user.image,
                            imageName: user.imageName,
                            verified: user.verified,
                            role: user.role});
                } else {
                    console.log('PSSWORD DIDNT MATCH');
                    console.log(pass, isMatch); // -&gt; Password123: false
                }
                
            });
        } else {
            console.log('user not found');
        }
    });
}










