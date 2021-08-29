const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isPalindrome: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Message', messageSchema)