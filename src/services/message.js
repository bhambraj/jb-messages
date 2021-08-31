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
}