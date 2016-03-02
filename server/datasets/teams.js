var mongoose = require('mongoose');

module.exports = mongoose.model('Team', {
    name: { type: String, required: true, index: { unique: true } },
    positions: Array,
    image: String,
    imageName: String
});