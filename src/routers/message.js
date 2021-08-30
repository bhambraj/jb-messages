const express = require('express');
const router = express.Router();

const {
    getAllMessages,
    addMessage,
    getMessage,
    updateMessage,
    deleteMessage,
} = require('../controllers/message');

router.get('/', getAllMessages);
router.post('/', addMessage);
router.get('/:id', getMessage,  (req, res) => {
    res.status(200).json(res.message)
});
router.patch('/:id', getMessage, updateMessage);
router.delete('/:id', getMessage, deleteMessage);

module.exports = router;