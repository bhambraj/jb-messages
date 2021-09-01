const path = require('path');

module.exports = {
    swaggerOptions : {
        apis: [
            `${path.resolve(__dirname, '../routers')}/*.js`
        ],
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Message API',
                version: '1.0.0',
                description: 'A simple Express Library API'
            },
            servers: [{
                url: process.env.SERVER_URL || 'http://localhost:3000'
            }]
        }
    },
    db: {
        user: process.env.DB_USER ,
        pass: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        name: process.env.DB_NAME
    },
}