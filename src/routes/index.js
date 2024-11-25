const express = require('express');
const authRouter = require('./authRoute');
const userRouter = require('./userRoute');

const app = express();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: Just provide the token.
 */

app.use('/auth', authRouter);
app.use('/user', userRouter);


module.exports = app;
