var mongoose = require('mongoose');
var User = require('../datasets/users');


module.exports.signup = function(req, res){
    var user = new User(req.body);

    // save user to database
    user.save(function(err) {
        if (err) throw err;
    });

    res.json(req.body);
}



module.exports.login = function (req, res){
    var user = req.body.user;
    var pass = req.body.password;

    // fetch user and test password verification
    User.findOne({ user: user }, function(err, user) {
        if (err) throw err;

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
                        role: user.role});
            } else {
                console.log('PSSWORD DIDNT MATCH');
                console.log(pass, isMatch); // -&gt; Password123: false
            }
            
        });
    });
}










