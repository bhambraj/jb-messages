require('dotenv').config();

const express = require('express');
const MessageRouter = require('./routers/message');
const dbService = require('./services/db.js');

dbService.setupConnection()
const app = express();
app.use(express.json())

// Any requests with url `/messages` will go via the MessageRouters
app.use('/messages', MessageRouter);

app.get('/', (req, res) =>{
    res.send('Home Route');
});

app.listen(process.env.APP_PORT || 3000, () => {
    console.log('Server Started');
});