require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const apiRouter = require('./routes');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');


const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Book API',
            version: '1.0.0'
        },
        servers: [
            {
                url: process.env.SERVER_URL || 'http://localhost:3000/'
            }
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [
            {
                BearerAuth: []
            }
        ]
    },

    apis: ['./src/routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));


// Database connection
mongoose
    .connect(process.env.MONGO_URL)
    // DIsplay message if successfull
    .then(() => console.log('DB Connection Successfull!'))
    .catch((err) => {
        console.log(err);
    });

app.use(cors());
app.use(express.json());

app.use('/api', apiRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
