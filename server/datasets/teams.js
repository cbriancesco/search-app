var mongoose = require('mongoose');

module.exports = mongoose.model('Team', {
    name: String,
    positions: Array,
    image: String,
    imageName: String
});