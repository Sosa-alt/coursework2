const express = require('express');
const PORT = 4000;

// Setup express app 
const app = express();

// Use logger middleware
app.use(require('./logger'));

// Listen for requests
app.listen(process.env.PORT || PORT, () => {
    console.log('Now listening for requests.');
});