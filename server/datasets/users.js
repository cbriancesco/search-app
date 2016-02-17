var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
    user: String,
    pass: String,
    email: String,
    gender: String,
    birth: Date,
    signup: { type: Date, default: Date.now }
});