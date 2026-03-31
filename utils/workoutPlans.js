// ============================================================
// workoutPlans.js  —  FitCoach Pro Workout Plans (All Splits)
// File location: FitCoachPro/utils/workoutPlans.js
// ============================================================

module.exports = {

  // ── BEGINNER ──────────────────────────────────────────────

  beginner: {

    fullbody: {
      home: [
        { exercise: "Push Ups", sets: 3, reps: 12 },
        { exercise: "Bodyweight Squats", sets: 3, reps: 15 },
        { exercise: "Inverted Rows (Table)", sets: 3, reps: 10 },
        { exercise: "Glute Bridge", sets: 3, reps: 15 },
        { exercise: "Plank", sets: 3, reps: 30 }
      ],
      gym: [
        { exercise: "Chest Press (Machine)", sets: 3, reps: 12 },
        { exercise: "Leg Press", sets: 3, reps: 15 },
        { exercise: "Lat Pulldown", sets: 3, reps: 12 },
        { exercise: "Shoulder Press (Machine)", sets: 3, reps: 12 },
        { exercise: "Plank", sets: 3, reps: 30 }
      ]
    },

    pushpulllegs: {
      home: [
        { exercise: "Push Ups", sets: 3, reps: 15 },
        { exercise: "Pike Push Ups", sets: 3, reps: 12 },
        { exercise: "Diamond Push Ups", sets: 3, reps: 10 },
        { exercise: "Inverted Rows", sets: 3, reps: 12 },
        { exercise: "Resistance Band Curl", sets: 3, reps: 15 },
        { exercise: "Bodyweight Squats", sets: 3, reps: 20 },
        { exercise: "Glute Bridge", sets: 3, reps: 20 },
        { exercise: "Reverse Lunges", sets: 3, reps: 12 },
        { exercise: "Calf Raises", sets: 3, reps: 20 }
      ],
      gym: [
        { exercise: "Barbell Bench Press", sets: 3, reps: 10 },
        { exercise: "Dumbbell Shoulder Press", sets: 3, reps: 12 },
        { exercise: "Tricep Pushdown", sets: 3, reps: 15 },
        { exercise: "Lat Pulldown", sets: 3, reps: 12 },
        { exercise: "Seated Cable Row", sets: 3, reps: 12 },
        { exercise: "Dumbbell Curl", sets: 3, reps: 12 },
        { exercise: "Leg Press", sets: 3, reps: 15 },
        { exercise: "Leg Curl", sets: 3, reps: 12 },
        { exercise: "Standing Calf Raise", sets: 3, reps: 20 }
      ]
    },

    upperlower: {
      home: [
        { exercise: "Push Ups", sets: 3, reps: 15 },
        { exercise: "Inverted Rows", sets: 3, reps: 12 },
        { exercise: "Pike Push Ups", sets: 3, reps: 10 },
        { exercise: "Resistance Band Curl", sets: 3, reps: 15 },
        { exercise: "Bodyweight Squats", sets: 3, reps: 20 },
        { exercise: "Glute Bridge", sets: 3, reps: 20 },
        { exercise: "Reverse Lunges", sets: 3, reps: 12 },
        { exercise: "Calf Raises", sets: 3, reps: 20 }
      ],
      gym: [
        { exercise: "Barbell Bench Press", sets: 3, reps: 10 },
        { exercise: "Lat Pulldown", sets: 3, reps: 12 },
        { exercise: "Dumbbell Shoulder Press", sets: 3, reps: 12 },
        { exercise: "Cable Row", sets: 3, reps: 12 },
        { exercise: "Goblet Squat", sets: 3, reps: 12 },
        { exercise: "Romanian Deadlift", sets: 3, reps: 12 },
        { exercise: "Leg Press", sets: 3, reps: 15 },
        { exercise: "Standing Calf Raise", sets: 3, reps: 20 }
      ]
    },

    brosplit: {
      home: [
        { exercise: "Push Ups", sets: 3, reps: 20 },
        { exercise: "Wide Push Ups", sets: 3, reps: 15 },
        { exercise: "Diamond Push Ups", sets: 3, reps: 12 },
        { exercise: "Inverted Rows", sets: 3, reps: 12 },
        { exercise: "Towel Row", sets: 3, reps: 12 },
        { exercise: "Pike Push Ups", sets: 3, reps: 12 },
        { exercise: "Band Lateral Raise", sets: 3, reps: 20 },
        { exercise: "Resistance Band Curl", sets: 3, reps: 15 },
        { exercise: "Tricep Dips (Chair)", sets: 3, reps: 15 },
        { exercise: "Bodyweight Squats", sets: 4, reps: 20 }
      ],
      gym: [
        { exercise: "Barbell Bench Press", sets: 3, reps: 10 },
        { exercise: "Incline Dumbbell Press", sets: 3, reps: 12 },
        { exercise: "Lat Pulldown", sets: 3, reps: 12 },
        { exercise: "Seated Cable Row", sets: 3, reps: 12 },
        { exercise: "Dumbbell Shoulder Press", sets: 3, reps: 12 },
        { exercise: "Lateral Raises", sets: 3, reps: 15 },
        { exercise: "EZ-Bar Curl", sets: 3, reps: 12 },
        { exercise: "Tricep Pushdown", sets: 3, reps: 15 },
        { exercise: "Leg Press", sets: 4, reps: 15 },
        { exercise: "Standing Calf Raise", sets: 4, reps: 20 }
      ]
    },

    arnoldsplit: {
      home: [
        { exercise: "Push Ups", sets: 3, reps: 15 },
        { exercise: "Inverted Rows", sets: 3, reps: 12 },
        { exercise: "Wide Push Ups", sets: 3, reps: 12 },
        { exercise: "Towel Row", sets: 3, reps: 12 },
        { exercise: "Pike Push Ups", sets: 3, reps: 12 },
        { exercise: "Band Lateral Raise", sets: 3, reps: 20 },
        { exercise: "Resistance Band Curl", sets: 3, reps: 15 },
        { exercise: "Tricep Dips", sets: 3, reps: 12 },
        { exercise: "Bodyweight Squats", sets: 4, reps: 20 },
        { exercise: "Glute Bridge", sets: 3, reps: 20 }
      ],
      gym: [
        { exercise: "Barbell Bench Press", sets: 3, reps: 10 },
        { exercise: "Barbell Row", sets: 3, reps: 10 },
        { exercise: "Incline Dumbbell Press", sets: 3, reps: 12 },
        { exercise: "Lat Pulldown", sets: 3, reps: 12 },
        { exercise: "Dumbbell Shoulder Press", sets: 3, reps: 12 },
        { exercise: "Lateral Raises", sets: 3, reps: 15 },
        { exercise: "EZ-Bar Curl", sets: 3, reps: 12 },
        { exercise: "Tricep Pushdown", sets: 3, reps: 15 },
        { exercise: "Leg Press", sets: 4, reps: 15 },
        { exercise: "Romanian Deadlift", sets: 3, reps: 12 }
      ]
    }
  },

  // ── INTERMEDIATE ──────────────────────────────────────────

  intermediate: {

    fullbody: {
      home: [
        { exercise: "Diamond Push Ups", sets: 4, reps: 15 },
        { exercise: "Bulgarian Split Squat", sets: 4, reps: 12 },
        { exercise: "Pull-Ups", sets: 4, reps: 8 },
        { exercise: "Single-Leg Glute Bridge", sets: 4, reps: 12 },
        { exercise: "Plank Hold", sets: 4, reps: 45 }
      ],
      gym: [
        { exercise: "Barbell Squat", sets: 4, reps: 8 },
        { exercise: "Bench Press", sets: 4, reps: 8 },
        { exercise: "Barbell Row", sets: 4, reps: 8 },
        { exercise: "Romanian Deadlift", sets: 4, reps: 10 },
        { exercise: "Overhead Press", sets: 3, reps: 10 }
      ]
    },

    pushpulllegs: {
      home: [
        { exercise: "Archer Push Ups", sets: 4, reps: 10 },
        { exercise: "Pike Push Ups", sets: 4, reps: 12 },
        { exercise: "Diamond Push Ups", sets: 3, reps: 12 },
        { exercise: "Pull-Ups", sets: 4, reps: 8 },
        { exercise: "Australian Rows", sets: 4, reps: 12 },
        { exercise: "Resistance Band Curl", sets: 3, reps: 15 },
        { exercise: "Bulgarian Split Squat", sets: 4, reps: 10 },
        { exercise: "Nordic Curl Negative", sets: 3, reps: 6 },
        { exercise: "Single-Leg Calf Raise", sets: 4, reps: 20 }
      ],
      gym: [
        { exercise: "Bench Press", sets: 4, reps: 8 },
        { exercise: "Seated Dumbbell Shoulder Press", sets: 4, reps: 10 },
        { exercise: "Close-Grip Bench Press", sets: 3, reps: 10 },
        { exercise: "Pull-Ups", sets: 4, reps: 8 },
        { exercise: "Barbell Row", sets: 4, reps: 8 },
        { exercise: "Barbell Curl", sets: 3, reps: 10 },
        { exercise: "Barbell Squat", sets: 4, reps: 8 },
        { exercise: "Romanian Deadlift", sets: 4, reps: 10 },
        { exercise: "Standing Calf Raise", sets: 4, reps: 20 }
      ]
    },

    upperlower: {
      home: [
        { exercise: "Archer Push Ups", sets: 4, reps: 10 },
        { exercise: "Pull-Ups", sets: 4, reps: 8 },
        { exercise: "Pike Push Ups", sets: 3, reps: 12 },
        { exercise: "Australian Rows", sets: 3, reps: 12 },
        { exercise: "Bulgarian Split Squat", sets: 4, reps: 10 },
        { exercise: "Single-Leg Hip Thrust", sets: 4, reps: 12 },
        { exercise: "Nordic Curl Negative", sets: 3, reps: 6 },
        { exercise: "Single-Leg Calf Raise", sets: 4, reps: 20 }
      ],
      gym: [
        { exercise: "Bench Press", sets: 4, reps: 6 },
        { exercise: "Barbell Row", sets: 4, reps: 6 },
        { exercise: "Incline Bench Press", sets: 3, reps: 10 },
        { exercise: "Cable Row", sets: 3, reps: 10 },
        { exercise: "Barbell Squat", sets: 4, reps: 6 },
        { exercise: "Romanian Deadlift", sets: 4, reps: 8 },
        { exercise: "Leg Press", sets: 3, reps: 12 },
        { exercise: "Standing Calf Raise", sets: 4, reps: 15 }
      ]
    },

    brosplit: {
      home: [
        { exercise: "Archer Push Ups", sets: 4, reps: 10 },
        { exercise: "Decline Push Ups", sets: 4, reps: 15 },
        { exercise: "Pull-Ups", sets: 4, reps: 10 },
        { exercise: "Australian Rows", sets: 4, reps: 15 },
        { exercise: "Pike Push Ups (Pause)", sets: 4, reps: 12 },
        { exercise: "Band Lateral Raise", sets: 4, reps: 20 },
        { exercise: "Chin-Ups", sets: 4, reps: 10 },
        { exercise: "Dips", sets: 4, reps: 12 },
        { exercise: "Bulgarian Split Squat", sets: 4, reps: 12 },
        { exercise: "Nordic Curl Negative", sets: 4, reps: 6 }
      ],
      gym: [
        { exercise: "Barbell Bench Press", sets: 4, reps: 8 },
        { exercise: "Incline Barbell Press", sets: 4, reps: 10 },
        { exercise: "Barbell Row", sets: 4, reps: 8 },
        { exercise: "Pull-Ups", sets: 4, reps: 8 },
        { exercise: "Barbell Overhead Press", sets: 4, reps: 8 },
        { exercise: "Lateral Raises", sets: 3, reps: 15 },
        { exercise: "Barbell Curl", sets: 4, reps: 10 },
        { exercise: "Skull Crushers", sets: 4, reps: 10 },
        { exercise: "Barbell Squat", sets: 4, reps: 8 },
        { exercise: "Romanian Deadlift", sets: 4, reps: 10 }
      ]
    },

    arnoldsplit: {
      home: [
        { exercise: "Archer Push Ups", sets: 4, reps: 10 },
        { exercise: "Pull-Ups", sets: 4, reps: 8 },
        { exercise: "Decline Push Ups", sets: 3, reps: 15 },
        { exercise: "Australian Rows", sets: 3, reps: 12 },
        { exercise: "Pike Push Ups (Pause)", sets: 4, reps: 12 },
        { exercise: "Band Lateral Raise", sets: 4, reps: 20 },
        { exercise: "Chin-Ups", sets: 4, reps: 10 },
        { exercise: "Dips", sets: 4, reps: 12 },
        { exercise: "Bulgarian Split Squat", sets: 4, reps: 10 },
        { exercise: "Nordic Curl Negative", sets: 4, reps: 6 }
      ],
      gym: [
        { exercise: "Barbell Bench Press", sets: 4, reps: 8 },
        { exercise: "Barbell Row", sets: 4, reps: 8 },
        { exercise: "Incline Bench Press", sets: 3, reps: 10 },
        { exercise: "Pull-Ups", sets: 4, reps: 8 },
        { exercise: "Barbell Overhead Press", sets: 4, reps: 8 },
        { exercise: "Rear Pec Deck", sets: 4, reps: 15 },
        { exercise: "Barbell Curl", sets: 4, reps: 10 },
        { exercise: "Skull Crushers", sets: 4, reps: 10 },
        { exercise: "Barbell Squat", sets: 4, reps: 8 },
        { exercise: "Romanian Deadlift", sets: 4, reps: 10 }
      ]
    }
  },

  // ── PROFESSIONAL ──────────────────────────────────────────

  professional: {

    fullbody: {
      home: [
        { exercise: "Explosive Push Ups", sets: 5, reps: 15 },
        { exercise: "Pistol Squats", sets: 5, reps: 8 },
        { exercise: "Weighted Pull-Ups", sets: 5, reps: 8 },
        { exercise: "Nordic Curls", sets: 5, reps: 6 },
        { exercise: "Hollow Body Hold", sets: 5, reps: 40 }
      ],
      gym: [
        { exercise: "Barbell Squat", sets: 5, reps: 5 },
        { exercise: "Bench Press", sets: 5, reps: 5 },
        { exercise: "Weighted Pull-Ups", sets: 5, reps: 6 },
        { exercise: "Power Clean", sets: 5, reps: 4 },
        { exercise: "Barbell Hip Thrust", sets: 4, reps: 8 }
      ]
    },

    pushpulllegs: {
      home: [
        { exercise: "Clap Push Ups", sets: 5, reps: 15 },
        { exercise: "Handstand Push Ups (Wall)", sets: 5, reps: 6 },
        { exercise: "Weighted Dips", sets: 4, reps: 8 },
        { exercise: "Weighted Pull-Ups (Belt)", sets: 5, reps: 6 },
        { exercise: "Typewriter Pull-Ups", sets: 4, reps: 6 },
        { exercise: "Band Curl (Slow)", sets: 4, reps: 15 },
        { exercise: "Pistol Squats", sets: 5, reps: 8 },
        { exercise: "Nordic Curls", sets: 5, reps: 6 },
        { exercise: "Jump Squats (Vest)", sets: 4, reps: 12 }
      ],
      gym: [
        { exercise: "Heavy Bench Press", sets: 5, reps: 5 },
        { exercise: "Overhead Press", sets: 5, reps: 5 },
        { exercise: "Weighted Dips", sets: 4, reps: 8 },
        { exercise: "Weighted Pull-Ups", sets: 5, reps: 5 },
        { exercise: "Heavy Barbell Row", sets: 5, reps: 5 },
        { exercise: "Heavy Barbell Curl", sets: 4, reps: 8 },
        { exercise: "Heavy Squat", sets: 5, reps: 5 },
        { exercise: "Heavy Deadlift", sets: 5, reps: 4 },
        { exercise: "Standing Calf Raise", sets: 5, reps: 15 }
      ]
    },

    upperlower: {
      home: [
        { exercise: "Handstand Push Ups (Wall)", sets: 5, reps: 6 },
        { exercise: "Weighted Pull-Ups (Belt)", sets: 5, reps: 5 },
        { exercise: "Pseudo Planche Push Ups", sets: 4, reps: 8 },
        { exercise: "Typewriter Pull-Ups", sets: 3, reps: 6 },
        { exercise: "Pistol Squats (Vest)", sets: 5, reps: 6 },
        { exercise: "Nordic Curls", sets: 5, reps: 6 },
        { exercise: "Shrimp Squats", sets: 4, reps: 8 },
        { exercise: "Calf Raise Burnout", sets: 5, reps: 25 }
      ],
      gym: [
        { exercise: "Bench Press", sets: 5, reps: 3 },
        { exercise: "Weighted Pull-Ups", sets: 5, reps: 4 },
        { exercise: "Overhead Press (Push Press)", sets: 4, reps: 5 },
        { exercise: "Pendlay Row", sets: 4, reps: 5 },
        { exercise: "Heavy Squat", sets: 5, reps: 3 },
        { exercise: "Heavy Deadlift", sets: 5, reps: 3 },
        { exercise: "Leg Press (Heavy)", sets: 3, reps: 8 },
        { exercise: "Glute Ham Raise", sets: 4, reps: 8 }
      ]
    },

    brosplit: {
      home: [
        { exercise: "Clap Push Ups", sets: 5, reps: 15 },
        { exercise: "Weighted Pull-Ups (Belt)", sets: 5, reps: 6 },
        { exercise: "Handstand Push Ups (Wall)", sets: 5, reps: 8 },
        { exercise: "Typewriter Pull-Ups", sets: 4, reps: 8 },
        { exercise: "Band Lateral Raise (Myo-Reps)", sets: 3, reps: 25 },
        { exercise: "Chin-Ups (Weighted)", sets: 4, reps: 8 },
        { exercise: "Dips (Weighted)", sets: 4, reps: 12 },
        { exercise: "Pistol Squats (Vest)", sets: 5, reps: 8 },
        { exercise: "Nordic Curls", sets: 5, reps: 8 },
        { exercise: "Jump Lunges (Vest)", sets: 4, reps: 12 }
      ],
      gym: [
        { exercise: "Heavy Bench Press", sets: 5, reps: 5 },
        { exercise: "Incline Barbell Press", sets: 4, reps: 8 },
        { exercise: "Deadlift", sets: 5, reps: 4 },
        { exercise: "Weighted Pull-Ups", sets: 5, reps: 6 },
        { exercise: "Heavy Barbell Press", sets: 5, reps: 5 },
        { exercise: "Lateral Raises (Myo-Reps)", sets: 3, reps: 20 },
        { exercise: "Heavy Barbell Curl", sets: 4, reps: 8 },
        { exercise: "Skull Crushers + CG Press", sets: 4, reps: 10 },
        { exercise: "Heavy Squat", sets: 5, reps: 5 },
        { exercise: "Romanian Deadlift", sets: 4, reps: 8 }
      ]
    },

    arnoldsplit: {
      home: [
        { exercise: "Clap Push Ups", sets: 5, reps: 15 },
        { exercise: "Weighted Pull-Ups (Belt)", sets: 5, reps: 6 },
        { exercise: "Pseudo Planche Push Ups", sets: 4, reps: 10 },
        { exercise: "Typewriter Pull-Ups", sets: 4, reps: 6 },
        { exercise: "Handstand Push Ups", sets: 5, reps: 8 },
        { exercise: "Band Lateral Raise (Myo-Reps)", sets: 3, reps: 25 },
        { exercise: "Chin-Ups (Weighted)", sets: 4, reps: 8 },
        { exercise: "Dips (Weighted)", sets: 4, reps: 10 },
        { exercise: "Pistol Squats (Vest)", sets: 5, reps: 8 },
        { exercise: "Nordic Curls", sets: 5, reps: 6 }
      ],
      gym: [
        { exercise: "Heavy Bench Press", sets: 5, reps: 5 },
        { exercise: "Heavy Barbell Row", sets: 5, reps: 5 },
        { exercise: "Weighted Dips", sets: 4, reps: 8 },
        { exercise: "Weighted Pull-Ups", sets: 4, reps: 6 },
        { exercise: "Heavy Overhead Press", sets: 5, reps: 5 },
        { exercise: "Rear Pec Deck (Myo-Reps)", sets: 3, reps: 20 },
        { exercise: "Barbell Curl (Heavy)", sets: 4, reps: 8 },
        { exercise: "Skull Crushers + CG Press", sets: 4, reps: 10 },
        { exercise: "Heavy Squat", sets: 5, reps: 5 },
        { exercise: "Romanian Deadlift (Heavy)", sets: 4, reps: 8 }
      ]
    }
  }
};