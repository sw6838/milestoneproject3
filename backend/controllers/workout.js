const router = require("express").Router();
const Workout = require("../models/workout");

// CREATE workout
router.post("/", async (req, res) => {
    const workout = new Workout({
        name: req.body.name,
        description: req.body.description,
    });
    try {
        const newWorkout = await workout.save();
        res.status(201).json(newWorkout);
    } catch (err) {
        res.status(400).json({ message: err.message });
    };
});

// READ all workouts
router.get("/", async (req, res) => {
    try {
        const workouts = await Workout.find();
        res.json(workouts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    };
});

// READ one workout
router.get("/:id", getWorkout, (req, res) => {
    res.json(res.workout);
});

// UPDATE workout
router.patch("/:id", getWorkout, async (req, res) => {
    if (req.body.name != null) {
        res.workout.name = req.body.name;
    };
    if (req.body.description != null) {
        res.workout.description = req.body.description;
    };
    try {
        const updatedWorkout = await res.workout.save();
        res.json(updatedWorkout);
    } catch (err) {
res.status(400).json({ message: err.message});
    };
});

// DELETE workout
router.delete("/:id", getWorkout, async (req, res) => {
    try {
        await res.workout.remove();
        res.json({ message: "Deleted workout"});
    } catch (err) {
        res.status(500).json({ message: err.message });
    };
});

// MIDDLEWARE
async function getWorkout(req, res, next) {
    let workout;
    try {
        workout = await Workout.findById(req.params.id);
        if (workout == null) {
            return res.status(404).json({ message: "Cannot find workout" });
        };
    } catch (err) {
        res.status(500).json({ message: err.message });
    };
    res.workout = workout;
    next();
};

module.exports = router;