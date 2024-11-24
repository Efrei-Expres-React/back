const express = require('express');
const authRouter = require('./authRoute');

const app = express();

app.use('/auth', authRouter);

module.exports = app;
