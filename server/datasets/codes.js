var mongoose = require('mongoose');

module.exports = mongoose.model('Codes', {
    division: { type: String, required: true, index: { unique: true } },
    codes: Array
});
