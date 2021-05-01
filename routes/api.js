const express = require('express');
const router = express.Router();

// Get a list of lessons
router.get('/lessons', (req, res, next) => {
    res.send({
        type: "GET",
        data: "Lessons"
    });
});

// Get a list of orders
router.get('/orders', (req, res, next) => {
    res.send({
        type: "GET",
        data: "Orders"
    })
});