require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_CONNECTION_STR = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.8lmzv.mongodb.net/test`;

mongoose.connect(DB_CONNECTION_STR, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', (error) => console.log('error', error));
db.on('open', () => console.log('Connect to the Database'));

app.listen(PORT, () => {
    console.log('Server started; listening on: ', PORT);
});

app.get('/', (req, res) => {
    res.send('working working!');
});