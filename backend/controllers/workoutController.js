const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

// GET All Workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find().sort({createdAt: -1});

    res.status(200).json(workouts);
}

// GET a Single Workout
const getWorkout = async (req, res) => {
    const { id } = req.params;

    try {
        const workout = await Workout.findById(id);
        res.status(200).json(workout);
    } catch(err) {
        res.status(404).json({error: "No such workout"});
    }
}

// CREATE a New Workout
const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body;

    try {
        const workout = await Workout.create({ title, reps, load });
        res.status(200).json(workout);
    } catch(err) {
        res.status(400).json({ error: err.message });
    }
}

// DELETE a Workout


// UPDATE a Workout



module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout
}