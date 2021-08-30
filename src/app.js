require('dotenv').config();

const express = require('express');
const cors = require('cors');

const messagesRouter = require('./routers/message');
const dbService = require('./services/db.js');
const logger = require('./services/logger');
const {swaggerOptions} = require('./config')

const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerSpecs = swaggerJsDoc(swaggerOptions);

dbService.setupConnection() // Setup Connection to DB
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs));
app.use('/messages', messagesRouter);
app.get('/', (req, res) => {
    res.json([]);
});

app.listen(process.env.APP_PORT || 3000, () => {
    logger.info('Server Started');
});