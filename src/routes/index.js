const express = require('express');
const authRouter = require('./authRoute');
const userRouter = require('./userRoute');

const app = express();

app.use('/auth', authRouter);
app.use('/user', userRouter);


module.exports = app;
