var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
    user: String,
    pass: String,
    email: String,
    gender: String,
    birth: Date,
    image: String,
    team: String,
    empId: String,
    position: String,
    signup: { type: Date, default: Date.now }
});