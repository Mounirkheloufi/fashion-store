const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Fashion Store API',
            version: '1.0.0',
            description: 'API documentation for the Fashion Store backend',
        },
        servers: [
            {
                url: 'http://localhost:5000/api',
            },
        ],
        tags: [ 
            { name: "Users", description: "User management and authentication" },
            { name: "Products", description: "Product management" },
            { name: "Cart", description: "Shopping cart management" },
            { name: "Orders", description: "Order management" },
            { name: "Stats", description: "Statistiques" }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: [__dirname + '/../routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

function swaggerDocs(app) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = swaggerDocs;