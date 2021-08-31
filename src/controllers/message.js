const MessageModel = require('../models/message');
const {ObjectId} = require('mongoose').Types;

module.exports = {
    /**
     * 
     * @param {*} req 
     * @param {*} res
     * 
     * returns list of all messages in the response
     */
    async getAllMessages(req, res) {
        try {
            const messages = await MessageModel.find();
            res.json(messages);
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    },
    /**
     * 
     * @param {*} req 
     * @param {*} res
     * 
     * returns the new message added
     */
    async addMessage(req, res) {
        const message = new MessageModel({
            name: req.body.name
        });
        try {
           const newMessage = await message.save();
           res.status(201).json(newMessage); 
        } catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    },
    /**
     * 
     * @param {*} req 
     * @param {*} res
     * 
     * Updates the message based on ID set in res from the getMessage middleware
     */
    async updateMessage(req, res) {
        if (req.body.name) {
            res.message.name = req.body.name
        }
        try {
            const updatedMessage = await res.message.save();
            res.json(updatedMessage);
        } catch(err) {
            res.status(500).json({
                message: err.message
            });
        }
    },
    /**
     * 
     * @param {*} req 
     * @param {*} res
     * 
     * Deletes the message based on ID set in res from the getMessage middleware
     */
    async deleteMessage(req, res) {
        try {
            await res.message.remove();
            res.send('Message deleted');
        } catch(err) {
            res.status(500).json({
                message: err.message
            });
        }
    },
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * 
     * This middleware loads message by ID, appends the loaded record in response
     * to pass it on the next middleware
     */
    async getMessage(req, res, next) {
        let message;
        try {
            const idIsValid = !!req.params.id && ObjectId.isValid(req.params.id)
            if (!idIsValid) {
                return res.status(404).json({ message: 'Message ID is not valid'});
            }
            message = await MessageModel.findById(req.params.id);
            if (message == null) {
                return res.status(404).json({ error: 'Message not found'});
            }
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
        res.message = message;
        next();
    },
}