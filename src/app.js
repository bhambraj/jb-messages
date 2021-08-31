require('dotenv').config();

const express = require('express');
const cors = require('cors');

const messagesRouter = require('./routers/message');

const {swaggerOptions} = require('./config')
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerSpecs = swaggerJsDoc(swaggerOptions);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs));
app.use('/messages', messagesRouter);
app.get('/', (req, res) => {
    res.send('Please use the routes described in the API Docs');
});

module.exports.app = app;