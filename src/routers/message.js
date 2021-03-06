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
 *              - value
 *          properties:
 *              value: 
 *                  type: string
 *                  description: Message value
 *          example:
 *              value: 'Dummy Message'
 */

/**
 * @swagger
 * tags:
 *      name: Messages
 *      description: Messages managing API
 */

/**
 * @swagger
 * /messages:
 *  get:
 *    summary: Gets all messages
 *    tags: [Messages]
 *    parameters:
 *      - in: query
 *        name: limit
 *        type: integer
 *        description: Number of Messages that will be returned for a page
 *      - in: query
 *        name: page
 *        type: integer
 *        description: page reference
 *    responses:
 *      200:
 *        description: Messages found
 *        schema:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/Message'
 *      500:
 *        description: Internal Server Error
 */
router.get('/', getAllMessages);

/**
 * @swagger
 *  /messages:
 *      post:
 *          summary: Saves new message
 *          tags: [Messages]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema: 
 *                          $ref: '#components/schemas/Message'
 *          responses:
 *              201:
 *                  description: New message created successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#components/schemas/Message'
 *              500:
 *                  description: Internal Server Error
 *
 */
router.post('/', addMessage);

/**
 * @swagger
 * /messages/{id}:
 *  get:
 *      summary: Retrieves the message by ID
 *      tags: [Messages]
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          required: true
 *          description: Message ID
 *      responses:
 *        200:
 *          description: Message fetched successfully
 *          schema: 
 *            $ref: '#/components/schemas/Message'
 *        404:
 *          description: Message not found
 *        500:
 *          description: Internal Server Error
 *
 */
router.get('/:id', getMessage,  (req, res) => {
    res.status(200).json(res.message)
});

/**
 * @swagger
 *  /messages/{id}:
 *      patch:
 *          summary: Updates existing message
 *          tags: [Messages]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: Message ID
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema: 
 *                          $ref: '#components/schemas/Message'
 *          responses:
 *              200:
 *                  description: Message updated successfully
 *                  content:
 *                      application/json:
 *                          $ref: '#components/schemas/Message'
 *              404:
 *                  description: Message not found
 *              500:
 *                  description: Internal Server Error
 *
 */

router.patch('/:id', getMessage, updateMessage);

/**
 * @swagger
 *  /messages/{id}:
 *    delete:
 *      summary: Delete message by ID
 *      tags: [Messages]
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          required: true
 *          description: Message ID
 *      responses:
 *        200:
 *          description: Message deleted successfully
 *        404:
 *          description: Message not found
 *        500:
 *          description: Internal Server Error
 */
router.delete('/:id', getMessage, deleteMessage);

module.exports = router;