const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'User Management Alchemy',
            description: "API endpoints for a user management documented on swagger",
            contact: {
                name: "Uditsingh Thakur",
                email: "uditsingh777.ut@gmail.com",
                url: "https://github.com/Uditsingh7/User_management_dockerisation"
            },
            version: '1.0.0',
        },
        servers: [
            {
                url: "http://localhost:3001/",
                description: "Local server"
            },
            {
                url: "https://user-alchemy-5e7f69440ee9.herokuapp.com/",
                description: "Live server"
            },
        ],
        components: {
            schemas: {
                UserInput: {
                    type: 'object',
                    properties: {
                        email: { type: 'string' },
                        password: { type: 'string' },
                        firstName: { type: 'string' },
                        lastName: { type: 'string' },
                        mobileNumber: { type: 'string' },
                    },
                    required: [],
                },
            },
        },

    },
    // Our routes path
    apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
    console.log("Swagger setup executed successfully.");
    console.log("APIs loaded from:", options.apis);
    // Swagger Page
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    // Documentation in JSON format
    app.get('/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
}

module.exports = swaggerDocs;
