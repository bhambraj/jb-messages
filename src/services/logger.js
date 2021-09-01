const { createLogger, transports, format } = require('winston');

const customFormat = format.combine(format.timestamp(), format.printf((info) => {
    return `${info.timestamp} [${info.level.toUpperCase().padEnd(7)}] - ${info.message}`
}))


const logger = createLogger({
    format: customFormat,
    level: process.env.LOG_LEVEL || 'info',
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'app.log'})
    ]
});

module.exports = logger;