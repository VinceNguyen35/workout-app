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

    let emptyFields = [];

    if (!title) {
        emptyFields.push("title");
    }
    if (!reps) {
        emptyFields.push("reps");
    }
    if (!load) {
        emptyFields.push("load");
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({
            error: "Please fill in all the fields",
            emptyFields
        });
    }

    try {
        const workout = await Workout.create({ title, reps, load });
        res.status(200).json(workout);
    } catch(err) {
        res.status(400).json({ error: err.message });
    }
}

// DELETE a Workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    try {
        const workout = await Workout.findOneAndDelete({ _id: id });
        res.status(200).json(workout);
    } catch(err) {
        res.status(404).json({ error: "No such workout"});
    }
}

// UPDATE a Workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;

    try {
        const workout = await Workout.findOneAndUpdate({_id: id}, {...req.body}, {new: true});
        res.status(200).json(workout);
    } catch (err) {
        res.status(404).json({ error: "No such workout" });
    }
}


module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}