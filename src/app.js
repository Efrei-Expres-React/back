require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const apiRouter = require('./routes');

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
