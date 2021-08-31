const MessageModel = require('../models/message');

module.exports = {
    async listAll() {
        return MessageModel.find();
    },
    async loadById(id) {
        return MessageModel.findById(id);
    },
    async create(messageProps) {
        const message = new MessageModel(messageProps);
        return message.save();
    },
    async save(message) {
        return message.save();
    },
    async remove(message) {
        return message.remove();
    },
    async removeAll() {
        await MessageModel.deleteMany({});
    },
    /**
     * 
     * @param {*} message 
     * @returns boolean value
     * 
     * Half-indexing (len/2) has benefits when processing large strings. 
     * Reference: https://www.freecodecamp.org/news/two-ways-to-check-for-palindromes-in-javascript-64fea8191fd7/
     */
    isPalindrome(message) {
        const lowerCasedValue = message.toLowerCase();
        const len = lowerCasedValue.length;
        for (var i = 0; i < len/2; i++) {
          if (lowerCasedValue[i] !== lowerCasedValue[len - 1 - i]) {
              return false;
          }
        }
        return true;
    }
}