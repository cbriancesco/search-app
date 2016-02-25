var mongoose = require('mongoose');

module.exports = mongoose.model('Admin', {
    roles: Array
});
