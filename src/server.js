require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const DB_CONNECTION_STR = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.8lmzv.mongodb.net/test`;
const messagesRouter = require('./routes/messages');
const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(DB_CONNECTION_STR, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', (error) => console.log('error', error));
db.on('open', () => console.log('Connect to the Database successfully'));

app.use(express.json())

// Any requests with url `/messages` will go via the messagesRouter
app.use('/messages', messagesRouter);

app.listen(PORT, () => {
    console.log('Server started and listening on: ', PORT);
});