var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
    user: String,
    name: String,
    lastName: String,
    pass: String,
    email: String,
    gender: String,
    birth: Date,
    image: String,
    imageName: String,
    team: String,
    empId: String,
    position: String,
    role: String,
    signup: { type: Date, default: Date.now }
});