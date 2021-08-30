module.exports = {
    swaggerOptions : {
        apis: [
            '../routers/*.js'
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