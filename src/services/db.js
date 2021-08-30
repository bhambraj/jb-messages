const mongoose = require('mongoose');

module.exports = {
    async setupConnection() {
        try {
            const DB_CONNECTION_STR = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.8lmzv.mongodb.net/test`;
            mongoose.connect(DB_CONNECTION_STR, { useNewUrlParser: true });
            const dbConn = mongoose.connection;
            dbConn.on('error', (error) => console.log('error', error));
            dbConn.once('open', () => console.log('Connected to the Database successfully'));
        } catch(err) {
            return err
        }
    }
}