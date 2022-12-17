require("dotenv").config();
const express = require("express");

// Express App
const app = express();

// Middleware
app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
});

// Routes
app.get("/", (req, res) => {
    res.json({mssg: "Welcome to the app"});
});

// Listen for Requests
app.listen(process.env.PORT, () => {
    console.log("Listening on port", process.env.PORT);
});