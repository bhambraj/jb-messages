const {app} = require('./app');
const logger = require('./services/logger');
const dbService = require('./services/db');

dbService.setupConnection() // Setup Connection to DB

app.listen(process.env.APP_PORT || 3000, () => {
    logger.info('Server Started');
});