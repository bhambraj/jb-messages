const MessageModel = require('../models/message');

module.exports = {
    async listAll(limit, page) {
        const startIdx = (page - 1) * limit;
        const endIdx = page * limit;
        const total = await MessageModel.countDocuments({});
        const messages = await (MessageModel.find({}).skip(endIdx).limit(limit));
        const result = {
            total,
            messages,
            page,
            count: messages.length
        };

        if (startIdx > 0) {
            result.previous = {
                page: page - 1,
                count: messages.length
            }
        }

        if (endIdx < total) {
            result.next = {
                page: page + 1,
                count: messages.length
            }
        }
        return result;
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