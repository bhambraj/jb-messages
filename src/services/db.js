const mongoose = require('mongoose');
const path = require('path');
const logger = require('./logger');
const {
    user, 
    pass,
    host,
    name
} = require(path.resolve(__dirname, '../config')).db;

module.exports = {
    async setupConnection() {
        return new Promise((resolve, reject)=>{
            try {
                const dbConnectStr = `mongodb+srv://${user}:${pass}@${host}/${name}`;
                mongoose.connect(dbConnectStr, { useNewUrlParser: true });
                const dbConn = mongoose.connection;
                dbConn.on('error', (error) => {
                    logger.error(`DB Connection Error: ${error}`);
                    reject(error);
                });
                dbConn.once('open', () => {
                    logger.info('Connected to the Database successfully');
                    resolve();
                });
            } catch(err) {
                logger.error('Error occured while connecting to DB: ', err);
                reject(err);
            }
        })
    }
}