const mongoose = require('mongoose');
const logger = require('./logger');

module.exports = {
    async setupConnection() {
        try {
            const DB_CONNECTION_STR = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.8lmzv.mongodb.net/test`;
            mongoose.connect(DB_CONNECTION_STR, { useNewUrlParser: true });
            const dbConn = mongoose.connection;
            dbConn.on('error', (error) => logger.error(`DB Connection Error: ${error}`));
            dbConn.once('open', () => logger.info('Connected to the Database successfully'));
        } catch(err) {
            logger.error('Error occured while connecting to DB: ', err);
            return err
        }
    }
}