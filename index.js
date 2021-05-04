const express = require("express");
const bodyParser = require("body-parser");
const ObjectID = require('mongodb').ObjectID;
const db = require("./db");
const app = express();
const PORT = process.env.PORT || 4000;

app.use((req, res, next) => {
    res.header({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, x-requested-with, *',
        'Access-Control-Allow-Methods': 'POST, PUT, GET, OPTIONS',
        'Access-Control-Request-Headers': 'Content-Type, x-requested-with',
    });
    next();
});

// Parse JSON from request
app.use(bodyParser.json());

// Use logger middleware
app.use(require('./logger'));

// Static file middleware
app.use(express.static('public'));

// Routes for lessons
db.initialize('lessons', function(dbCollection) { // successCallback

    // get all lessons
    app.get("/lessons", (req, res) => {
        dbCollection.find().toArray((error, result) => {
            if (error) throw error;
            res.json(result);
        });
    });

    // update lesson
    app.put("/lessons/:id", (req, res) => {
        // get the lesson id from the request parameters
        const lessonId = ObjectID(req.params.id);
        // get the quantity to deduct from the request body
        const quantity = req.body.quantity;
        // Update the particular lesson
        dbCollection.updateOne({ _id: lessonId }, { $inc: { 'spaces': -quantity } }, (error, result) => {
            if (error) throw error;
            // send back the updated lesson
            dbCollection.findOne({ _id: lessonId }, (error, result) => {
                if (error) throw error;
                // return lesson
                res.json(result);
            })
        });
    })


}, function(err) { // failureCallback
    throw (err);
});

// Routes for orders
db.initialize('orders', function(dbCollection) { // successCallback

    // save a new order
    app.post("/orders", (req, res) => {
        const order = req.body;
        dbCollection.insertOne(order, (error, result) => { // callback of insertOne
            if (error) throw error;
            // return created order
            res.json(result);
        });
    });

}, function(err) { // failureCallback
    throw (err);
});

// Routes for users
db.initialize('users', function(dbCollection) { // successCallback

    // get all users
    app.get("/users", (req, res) => {
        dbCollection.find().toArray((error, result) => {
            if (error) throw error;
            res.json(result);
        });
    });

    // get one user - authenticated user
    app.get("/user", (req, res) => {
        const emailId = "aguy@gmail.com";
        dbCollection.findOne({ email: emailId }, (error, result) => {
            if (error) throw error;
            // return user
            res.json(result);
        })
    });

}, function(err) { // failureCallback
    throw (err);
});

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});