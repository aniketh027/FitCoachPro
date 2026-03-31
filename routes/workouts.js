const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Workout = require("../models/Workout");
const User = require("../models/User");
const plans = require("../utils/workoutPlans");

/* ===== STATS ===== */
router.get("/stats", auth, async (req, res) => {
  try {
    const totalWorkouts = await Workout.countDocuments({ userId: req.user.userId });
    res.json({ totalWorkouts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// FIX #3: /plan MUST be defined before /:id — otherwise Express
// treats the string "plan" as a MongoDB ObjectId and crashes.
/* ===== PERSONALIZED PLAN ===== */
router.get("/plan", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    const plan = plans[user.level]?.[user.style]?.[user.trainingType] || [];
    res.json(plan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

/* ===== GET WORKOUTS ===== */
router.get("/", auth, async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.user.userId });
    res.json(workouts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

/* ===== ADD WORKOUT ===== */
router.post("/", auth, async (req, res) => {
  try {
    const workout = await Workout.create({
      userId: req.user.userId,
      exercise: req.body.exercise,
      sets:     Number(req.body.sets),
      reps:     Number(req.body.reps)
    });
    res.json(workout);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

/* ===== DELETE ===== */
router.delete("/:id", auth, async (req, res) => {
  try {
    await Workout.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
