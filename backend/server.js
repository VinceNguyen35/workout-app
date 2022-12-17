require("dotenv").config();
const express = require("express");
const workoutRoutes = require("./routes/workouts");

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

// Listen for Requests
app.listen(process.env.PORT, () => {
    console.log("Listening on port", process.env.PORT);
});