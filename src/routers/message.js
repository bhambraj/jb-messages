/**
 * Exports the router for messages
 * 
 * All the routes following '/messages' in the url will go via this router∑
 */

const express = require('express');
const router = express.Router();

const {
    getAllMessages,
    addMessage,
    getMessage,
    updateMessage,
    deleteMessage,
} = require('../controllers/message');

/**
 * @swagger
 * components:
 *  schemas:
 *      Message:
 *          type: object
 *          required:
 *              - name
 *          properties:
 *              name: 
 *                  type: string
 *                  description: The message value
 *              isPalindrome:
 *                  type: boolean
 *                  description: Boolean describing if message is a palindrome or not
 *          example:
 *              name: 'Roy Jones'
 *              isPalindrome: false,
 */

/**
 * @swagger
 * /messages:
 *      get:
 *          summary: Returns the list of all the messages
 *          responses:
 *              200:
 *                  description: List of the books
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Message'
 * 
 */
router.get('/', getAllMessages);
router.post('/', addMessage);
router.get('/:id', getMessage,  (req, res) => {
    res.status(200).json(res.message)
});
router.patch('/:id', getMessage, updateMessage);
router.delete('/:id', getMessage, deleteMessage);

module.exports = router;