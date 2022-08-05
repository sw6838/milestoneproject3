const router = require("express").Router();
const Workout = require("../models/workout");
const User = require("../models/user");
const { update } = require("../models/workout");

// CREATE workout
router.post("/", async (req, res) => {
    if (!req.currentUser) {
        return console.log("You must be logged in to create a workout.")
    }
    const workout = new Workout({
        name: req.body.name,
        sets: req.body.sets,
        reps: req.body.reps,
        time: req.body.time,
        type: req.body.type,
        createdBy: req.currentUser
    });
    const user = await User.findOne({_id: req.currentUser})
    if (req.currentUser != null) {
        user.workouts.push(workout)
    }
    try {
        const newWorkout = await (await workout.save()).populate("createdBy")
        await user.save()
        res.status(201).json(newWorkout)
    } catch (err) {
        res.status(400).json({ message: err.message });
    };
});

// READ all workouts
router.get("/", async (req, res) => {
    try {
        const workouts = await Workout.find()
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
    if (!req.currentUser) {
        return console.log("You must be logged in to update a workout.")
    }
    const workoutId = (res.workout.createdBy).toString()
    const currentUserId = (req.currentUser._id).toString()
    if (workoutId !== currentUserId) {
        return console.log("Current user does not match workout creator")
    } else {
        if (req.body.name != null) {
            res.workout.name = req.body.name;
        };
        if (req.body.sets != null) {
            res.workout.sets = req.body.sets;
        };
        if (req.body.reps != null) {
            res.workout.reps = req.body.reps;
        };
        if (req.body.time != null) {
            res.workout.time = req.body.time;
        };
        if (req.body.type != null) {
            res.workout.type = req.body.type;
        };
        try {
            const updatedWorkout = await res.workout.save();
            res.json(updatedWorkout);
        } catch (err) {
            res.status(400).json({ message: err.message});
        };
    }
});

// DELETE workout
router.delete("/:id", getWorkout, async (req, res) => {
    if (!req.currentUser) {
        return console.log("You must be logged in to delete a workout.")
    }
    const workoutId = (res.workout.createdBy).toString()
    const currentUserId = (req.currentUser._id).toString()
    if (workoutId !== currentUserId) {
        return console.log("Current user does not match workout creator")
    } else {
        const user = await User.findOne({_id: res.workout.createdBy})
        if (req.currentUser != null) {
            user.workouts.remove(res.workout)
        }
        try {
            await res.workout.remove();
            await (await user.save()).populate("workouts")
            res.json({ message: "Deleted workout"});
        } catch (err) {
            res.status(500).json({ message: err.message });
        };
    }
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