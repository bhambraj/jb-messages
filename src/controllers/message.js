const MessageModel = require('../models/message');
const {ObjectId} = require('mongoose').Types;

module.exports = {
    async getAllMessages(req, res) {
        try {
            const messages = await MessageModel.find();
            res.json(messages);
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    },
    async addMessage(req, res) {
        const message = new MessageModel({
            name: req.body.name
        });
        try {
           const newMessage = await message.save();
           res.status(201).json(newMessage); 
        } catch (err) {
            res.status(400).json({
                message: err.message
            });
        }
    },
    async updateMessage(req, res) {
        if (req.body.name) {
            res.message.name = req.body.name
        }
        try {
            const updatedMessage = await res.message.save();
            res.json(updatedMessage);
        } catch(err) {
            res.status(400).json({
                message: err.message
            });
        }
    },
    async deleteMessage(req, res) {
        try {
            await res.message.remove();
            res.json('Message deleted');
        } catch(err) {
            res.status(500).json({
                message: err.message
            });
        }
    },
    async getMessage(req, res, next) {
        let message;
        try {
            const idIsValid = !!req.params.id && ObjectId.isValid(req.params.id)
            if (!idIsValid) {
                return res.status(404).json({ message: 'Message ID is not valid'});
            }
            message = await MessageModel.findById(req.params.id);
            if (message == null) {
                return res.status(404).json({ message: 'Message not found'});
            }
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
        res.message = message;
        next();
    },
}