// NPM Config

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workoutRoutes");

// Express App
const app = express();

// Middleware
// Body Parser
app.use(express.json());

// Morgan
app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
});

// Routes
app.use("/api/workouts", workoutRoutes);

// Connect to DB
mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    // Listen for Requests
    app.listen(process.env.PORT, () => {
        console.log("Connected to DB & Listening on port", process.env.PORT);
    });
})
.catch((err) => {
    console.log(err);
});
