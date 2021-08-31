const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true
    },
    isPalindrome: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Message', messageSchema)