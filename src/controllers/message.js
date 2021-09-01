const {ObjectId} = require('mongoose').Types;

const messageService = require('../services/message.js');

module.exports = {
    /**
     * 
     * @param {*} req 
     * @param {*} res
     * 
     * returns list of all messages in the response
     */
    async getAllMessages(req, res) {
        const { limit = 10, page = 0} = req.query;
        try {
            const { messages, ...otherOpts } = await messageService.listAll(parseInt(limit, 10), parseInt(page, 10));
            return res.json({
              ...otherOpts,
              messages,
            });
        } catch (err) {
            return res.status(500).json({ message: err.message })
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
        if (req.body.value) {
            try {
                const newMessage = await messageService.create({
                    value: req.body.value,
                    isPalindrome: messageService.isPalindrome(req.body.value)
                });
                res.status(201).json(newMessage); 
             } catch (err) {
                 res.status(500).json({
                     message: err.message
                 });
             }
        } else {
            res.status(400).json({
                message: 'Invalid Request'
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
        if (req.body.value) {
            res.message.value = req.body.value
            res.message.isPalindrome = messageService.isPalindrome(req.body.value);
            try {
                const updatedMessage = await messageService.save(res.message);
                res.json(updatedMessage);
            } catch(err) {
                res.status(500).json({
                    message: err.message
                });
            }
        } else {
            res.status(400).json({
                message: 'Invalid Request'
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
            await messageService.remove(res.message);
            res.send('Message deleted successfully');
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
            message = await messageService.loadById(req.params.id);
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