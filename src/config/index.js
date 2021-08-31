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
                url: 'http://localhost:3000'
            }]
        }
    }
}