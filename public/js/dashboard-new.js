// ============================================================
// dashboard-new.js  —  FitCoach Pro Enhanced Dashboard
// File location: FitCoachPro/public/js/dashboard-new.js
// ============================================================

const token = localStorage.getItem("token");

function handleUnauthorized(res) {
  if (res.status === 401) {
    localStorage.removeItem("token");
    showToast("Session expired. Please log in again.", "warning");
    setTimeout(() => window.location.replace("login.html"), 1500);
    return true;
  }
  return false;
}

// ============================================================
// FULL WORKOUT PLAN DATA  (all splits × all levels × gym/home)
// ============================================================

const SPLITS = {
  fullbody: {
    label: "Full Body",
    icon: "🎯",
    sub: "3 days · All muscles each session",
    daysPerWeek: 3,
    intensity: "Medium",
    days: ["Full Body A", "Rest", "Full Body B", "Rest", "Full Body C", "Rest", "Rest"],
    dayTypes: ["work", "rest", "work", "rest", "work", "rest", "rest"],
    coachTip: {
      beginner: "Full Body workouts hit every muscle 3×/week — perfect for building coordination and base strength. Focus on form before load. Rest 60–90 sec between sets.",
      intermediate: "Increase intensity by shortening rest to 60 sec. Use compound lifts to drive growth across the whole body each session.",
      professional: "Periodise load across the 3 sessions (heavy / moderate / lighter volume) to maximise recovery and supercompensation."
    },
    plans: {
      beginner: {
        gym: [
          { day: "Full Body A", subtitle: "Foundation Session", exercises: [
            { name: "Chest Press (Machine)", sets: "3×12", tip: "Control the descent" },
            { name: "Leg Press", sets: "3×15", tip: "Feet shoulder-width" },
            { name: "Lat Pulldown", sets: "3×12", tip: "Elbows drive down" },
            { name: "Shoulder Press (Machine)", sets: "3×12", tip: "Don't flare elbows" },
            { name: "Plank", sets: "3×30s", tip: "Neutral spine" }
          ]},
          { day: "Full Body B", subtitle: "Balance & Stability", exercises: [
            { name: "Goblet Squat", sets: "3×12", tip: "Chest tall, knees out" },
            { name: "Dumbbell Row", sets: "3×12", tip: "Row to hip, not armpit" },
            { name: "Incline Dumbbell Press", sets: "3×12", tip: "Controlled eccentric" },
            { name: "Leg Curl (Machine)", sets: "3×12", tip: "Full range of motion" },
            { name: "Dead Bug", sets: "3×10", tip: "Lower back stays flat" }
          ]},
          { day: "Full Body C", subtitle: "Volume Session", exercises: [
            { name: "Romanian Deadlift", sets: "3×10", tip: "Hinge at hips, bar close" },
            { name: "Cable Row", sets: "3×12", tip: "Squeeze shoulder blades" },
            { name: "Dumbbell Shoulder Press", sets: "3×12", tip: "Press overhead, lock out" },
            { name: "Leg Extension", sets: "3×15", tip: "Full extension at top" },
            { name: "Calf Raises", sets: "3×20", tip: "Full stretch at bottom" }
          ]}
        ],
        home: [
          { day: "Full Body A", subtitle: "Foundation Session", exercises: [
            { name: "Push Ups", sets: "3×12", tip: "Straight body line" },
            { name: "Bodyweight Squats", sets: "3×15", tip: "Knees track toes" },
            { name: "Inverted Rows", sets: "3×10", tip: "Use a table edge" },
            { name: "Glute Bridges", sets: "3×15", tip: "Squeeze at the top" },
            { name: "Plank", sets: "3×30s", tip: "Don't let hips drop" }
          ]},
          { day: "Full Body B", subtitle: "Balance & Stability", exercises: [
            { name: "Incline Push Ups", sets: "3×12", tip: "Hands elevated on chair" },
            { name: "Reverse Lunges", sets: "3×12", tip: "Keep torso upright" },
            { name: "Superman Hold", sets: "3×15", tip: "Squeeze glutes at top" },
            { name: "Mountain Climbers", sets: "3×20", tip: "Keep hips level" },
            { name: "Dead Bug", sets: "3×10", tip: "Lower back pressed flat" }
          ]},
          { day: "Full Body C", subtitle: "Volume Session", exercises: [
            { name: "Pike Push Ups", sets: "3×10", tip: "Hips high, head down" },
            { name: "Bulgarian Split Squat", sets: "3×10", tip: "Rear foot on chair" },
            { name: "Resistance Band Row", sets: "3×15", tip: "Band under feet" },
            { name: "Hip Thrusts", sets: "3×15", tip: "Drive through heels" },
            { name: "Hollow Hold", sets: "3×20s", tip: "Ribs down, arms back" }
          ]}
        ]
      },
      intermediate: {
        gym: [
          { day: "Full Body A", subtitle: "Heavy Compound Day", exercises: [
            { name: "Barbell Squat", sets: "4×8", tip: "Break parallel, brace core" },
            { name: "Bench Press", sets: "4×8", tip: "Retract scapulae" },
            { name: "Barbell Row", sets: "4×8", tip: "Row to belly button" },
            { name: "Overhead Press", sets: "3×10", tip: "Brace and press straight" },
            { name: "Face Pulls", sets: "3×15", tip: "Pull to nose height" }
          ]},
          { day: "Full Body B", subtitle: "Moderate Volume Day", exercises: [
            { name: "Romanian Deadlift", sets: "4×10", tip: "Feel the hamstring stretch" },
            { name: "Incline Bench Press", sets: "4×10", tip: "45° incline" },
            { name: "Lat Pulldown (Wide Grip)", sets: "4×10", tip: "Slight lean back" },
            { name: "Dumbbell Lateral Raise", sets: "3×15", tip: "Lead with elbows" },
            { name: "Cable Crunch", sets: "3×15", tip: "Crunch, don't pull neck" }
          ]},
          { day: "Full Body C", subtitle: "Accessory Day", exercises: [
            { name: "Deadlift", sets: "4×6", tip: "Neutral spine throughout" },
            { name: "Dumbbell Chest Fly", sets: "3×12", tip: "Wide arc, slight bend in elbow" },
            { name: "Seated Cable Row", sets: "3×12", tip: "Full stretch at front" },
            { name: "Leg Curl", sets: "4×12", tip: "Controlled negative" },
            { name: "EZ-Bar Curl", sets: "3×12", tip: "No swinging" }
          ]}
        ],
        home: [
          { day: "Full Body A", subtitle: "Heavy Compound Day", exercises: [
            { name: "Diamond Push Ups", sets: "4×15", tip: "Elbows track back" },
            { name: "Bulgarian Split Squat", sets: "4×12", tip: "Deep range of motion" },
            { name: "Towel Row", sets: "4×12", tip: "Door anchor or table" },
            { name: "Pike Push Ups", sets: "3×12", tip: "Hips high, head drops" },
            { name: "Plank Hold", sets: "4×45s", tip: "Add a slight posterior tilt" }
          ]},
          { day: "Full Body B", subtitle: "Moderate Volume Day", exercises: [
            { name: "Archer Push Ups", sets: "4×10", tip: "Shift weight side to side" },
            { name: "Jump Squats", sets: "4×12", tip: "Land softly, knees bent" },
            { name: "Single-Leg Glute Bridge", sets: "4×12", tip: "Non-working leg extended" },
            { name: "Resistance Band Row", sets: "3×15", tip: "Keep elbows close" },
            { name: "L-Sit Hold (Chair)", sets: "3×15s", tip: "Push down into chair" }
          ]},
          { day: "Full Body C", subtitle: "Accessory Day", exercises: [
            { name: "Decline Push Ups", sets: "4×12", tip: "Feet elevated on chair" },
            { name: "Nordic Curl Negative", sets: "3×6", tip: "Slow lower, hands catch" },
            { name: "Superman Rows", sets: "3×12", tip: "Arms wide then pull in" },
            { name: "Lateral Lunge", sets: "3×12", tip: "Sit into the hip" },
            { name: "Hollow Body Rock", sets: "3×20", tip: "Arms locked overhead" }
          ]}
        ]
      },
      professional: {
        gym: [
          { day: "Full Body A", subtitle: "Max Strength Day", exercises: [
            { name: "Barbell Squat", sets: "5×5", tip: "85–90% of 1RM" },
            { name: "Bench Press", sets: "5×5", tip: "Leg drive into the bench" },
            { name: "Weighted Pull-Ups", sets: "5×6", tip: "Full hang at bottom" },
            { name: "Barbell Hip Thrust", sets: "4×8", tip: "Chin tucked, squeeze glutes" },
            { name: "Overhead Tricep Extension", sets: "3×10", tip: "Elbows locked in" }
          ]},
          { day: "Full Body B", subtitle: "Hypertrophy Day", exercises: [
            { name: "Romanian Deadlift", sets: "5×8", tip: "5-sec negative" },
            { name: "Incline Bench Press", sets: "4×10", tip: "Touch chest each rep" },
            { name: "Cable Row (Close Grip)", sets: "4×10", tip: "Chest to the pad" },
            { name: "Leg Press (Heavy)", sets: "4×8", tip: "Deep range, controlled" },
            { name: "Lateral Raises (Drop Set)", sets: "3×12+12", tip: "Drop 50% for the second set" }
          ]},
          { day: "Full Body C", subtitle: "Power & Conditioning Day", exercises: [
            { name: "Power Clean", sets: "5×4", tip: "Triple extension: ankle, knee, hip" },
            { name: "Heavy Deadlift", sets: "5×4", tip: "45-sec setup, max focus" },
            { name: "Dips (Weighted)", sets: "4×8", tip: "Lean forward for chest focus" },
            { name: "Bent Over Barbell Row", sets: "4×6", tip: "Explosive concentric" },
            { name: "Ab Wheel Rollout", sets: "4×10", tip: "Hips don't drop" }
          ]}
        ],
        home: [
          { day: "Full Body A", subtitle: "Max Strength Day", exercises: [
            { name: "Explosive Push Ups", sets: "5×15", tip: "Leave the ground on each rep" },
            { name: "Pistol Squats", sets: "5×8", tip: "Use a counter for balance initially" },
            { name: "Plank Walkouts", sets: "5×20", tip: "Full arm extension" },
            { name: "Single-Leg Hip Thrust", sets: "4×10", tip: "Drive through heel" },
            { name: "Hollow Body Hold", sets: "4×40s", tip: "Press lower back flat" }
          ]},
          { day: "Full Body B", subtitle: "Hypertrophy Day", exercises: [
            { name: "Clap Push Ups", sets: "5×12", tip: "Fast concentric, clap at top" },
            { name: "Shrimp Squat", sets: "4×8", tip: "Rear knee to just above ground" },
            { name: "Archer Push Ups (Slow)", sets: "4×10", tip: "3-sec negative each side" },
            { name: "Jump Lunges", sets: "4×12", tip: "Drive off back foot" },
            { name: "Dragon Flag Negative", sets: "3×5", tip: "5-sec lower" }
          ]},
          { day: "Full Body C", subtitle: "Power & Conditioning Day", exercises: [
            { name: "Burpee Pull Ups", sets: "5×10", tip: "Explosive pull at top" },
            { name: "Nordic Curls", sets: "5×8", tip: "Full range, hands catch at bottom" },
            { name: "Decline Push Ups (Weighted Vest)", sets: "4×12", tip: "Chest hits the ground" },
            { name: "Bulgarian Split Squat (Jump)", sets: "4×10", tip: "Drive explosively off front foot" },
            { name: "L-Sit Progression", sets: "4×15s", tip: "Work towards parallel bars" }
          ]}
        ]
      }
    }
  },

  pushpulllegs: {
    label: "Push / Pull / Legs (PPL)",
    icon: "💪",
    sub: "6 days · Muscle group focused",
    daysPerWeek: 6,
    intensity: "High",
    days: ["Push A", "Pull A", "Legs A", "Push B", "Pull B", "Legs B", "Rest"],
    dayTypes: ["work","work","work","work","work","work","rest"],
    coachTip: {
      beginner: "PPL gives each muscle group great frequency twice a week. Focus on pushing reps in compound movements and don't skip legs!",
      intermediate: "Use progressive overload — add weight or a rep each week. Track your lifts. Shoulder health is key; don't neglect rear delts and rotator cuff work.",
      professional: "Run PPL at high volume. Periodise between strength phases (Push A/Pull A) and hypertrophy phases (Push B/Pull B). Drop sets and rest-pause are your friends on Legs B."
    },
    plans: {
      beginner: {
        gym: [
          { day: "Push A", subtitle: "Chest, Shoulders & Triceps", exercises: [
            { name: "Barbell Bench Press", sets: "3×10", tip: "Controlled descent" },
            { name: "Dumbbell Shoulder Press", sets: "3×12", tip: "Neutral grip" },
            { name: "Cable Chest Fly", sets: "3×12", tip: "Constant tension" },
            { name: "Lateral Raises", sets: "3×15", tip: "Lead with elbows" },
            { name: "Tricep Pushdown", sets: "3×15", tip: "Elbows pinned to sides" }
          ]},
          { day: "Pull A", subtitle: "Back & Biceps", exercises: [
            { name: "Lat Pulldown", sets: "3×12", tip: "Elbows drive to hips" },
            { name: "Seated Cable Row", sets: "3×12", tip: "Chest stays up" },
            { name: "Face Pulls", sets: "3×15", tip: "External rotation at end" },
            { name: "Dumbbell Curl", sets: "3×12", tip: "No swinging" },
            { name: "Hammer Curl", sets: "3×12", tip: "Slow negative" }
          ]},
          { day: "Legs A", subtitle: "Quads, Hamstrings & Glutes", exercises: [
            { name: "Leg Press", sets: "3×15", tip: "Feet hip-width" },
            { name: "Leg Extension", sets: "3×15", tip: "Full extension at top" },
            { name: "Leg Curl", sets: "3×12", tip: "Slow lower" },
            { name: "Calf Raises (Standing)", sets: "3×20", tip: "Full stretch at bottom" },
            { name: "Plank", sets: "3×30s", tip: "Core braced throughout" }
          ]},
          { day: "Push B", subtitle: "Chest, Shoulders & Triceps (Vol)", exercises: [
            { name: "Incline Dumbbell Press", sets: "3×12", tip: "45° incline" },
            { name: "Machine Shoulder Press", sets: "3×12", tip: "Full range" },
            { name: "Pec Deck (Fly)", sets: "3×12", tip: "Wide arc, don't lock out" },
            { name: "Front Raises", sets: "3×12", tip: "Don't swing body" },
            { name: "Overhead Tricep Extension", sets: "3×12", tip: "Elbows forward" }
          ]},
          { day: "Pull B", subtitle: "Back & Biceps (Vol)", exercises: [
            { name: "Machine Row", sets: "3×12", tip: "Squeeze at the end" },
            { name: "Straight-Arm Pulldown", sets: "3×12", tip: "Slight forward lean" },
            { name: "Reverse Fly (Machine)", sets: "3×15", tip: "Control the descent" },
            { name: "Barbell Curl", sets: "3×10", tip: "Full extension at bottom" },
            { name: "Concentration Curl", sets: "3×12", tip: "Elbow braced on thigh" }
          ]},
          { day: "Legs B", subtitle: "Glutes, Hamstrings & Calves", exercises: [
            { name: "Goblet Squat", sets: "3×12", tip: "Hold dumbbell at chest" },
            { name: "Romanian Deadlift", sets: "3×12", tip: "Feel the hamstring pull" },
            { name: "Hip Abduction (Machine)", sets: "3×15", tip: "Full ROM" },
            { name: "Glute Bridge (Barbell)", sets: "3×15", tip: "Drive through heels" },
            { name: "Seated Calf Raise", sets: "3×20", tip: "Soleus focus" }
          ]}
        ],
        home: [
          { day: "Push A", subtitle: "Chest, Shoulders & Triceps", exercises: [
            { name: "Push Ups", sets: "3×15", tip: "Elbows 45° from body" },
            { name: "Pike Push Ups", sets: "3×12", tip: "Hips high" },
            { name: "Diamond Push Ups", sets: "3×10", tip: "Elbows track back" },
            { name: "Shoulder Taps", sets: "3×20", tip: "Hips square" },
            { name: "Tricep Dips (Chair)", sets: "3×12", tip: "Hips close to chair" }
          ]},
          { day: "Pull A", subtitle: "Back & Biceps", exercises: [
            { name: "Inverted Rows (Table)", sets: "3×12", tip: "Pull chest to table edge" },
            { name: "Superman Holds", sets: "3×15", tip: "Pause at top" },
            { name: "Resistance Band Curl", sets: "3×15", tip: "Band under feet" },
            { name: "Band Pull-Aparts", sets: "3×20", tip: "Arms straight" },
            { name: "Towel Row", sets: "3×12", tip: "Door anchor" }
          ]},
          { day: "Legs A", subtitle: "Quads, Hamstrings & Glutes", exercises: [
            { name: "Bodyweight Squats", sets: "3×20", tip: "Chest up, knees out" },
            { name: "Reverse Lunges", sets: "3×12", tip: "Control the descent" },
            { name: "Glute Bridge", sets: "3×20", tip: "Squeeze at the top" },
            { name: "Wall Sit", sets: "3×30s", tip: "90° at knee" },
            { name: "Calf Raises (Single Leg)", sets: "3×15", tip: "Off a step" }
          ]},
          { day: "Push B", subtitle: "Chest, Shoulders & Triceps (Vol)", exercises: [
            { name: "Incline Push Ups", sets: "3×15", tip: "Hands on a raised surface" },
            { name: "Wide Push Ups", sets: "3×12", tip: "Elbows flare outward" },
            { name: "Decline Push Ups", sets: "3×10", tip: "Feet on chair" },
            { name: "Lateral Raise (Band)", sets: "3×15", tip: "Lead with elbows" },
            { name: "Close-Grip Push Ups", sets: "3×12", tip: "Tricep dominant" }
          ]},
          { day: "Pull B", subtitle: "Back & Biceps (Vol)", exercises: [
            { name: "Band Lat Pulldown", sets: "3×15", tip: "Band anchored above" },
            { name: "Doorframe Row", sets: "3×12", tip: "Hold doorframe, lean back" },
            { name: "Reverse Snow Angels", sets: "3×15", tip: "Face down, arms sweep" },
            { name: "Resistance Band Hammer Curl", sets: "3×15", tip: "Neutral wrists" },
            { name: "Band Face Pulls", sets: "3×20", tip: "Pull to nose level" }
          ]},
          { day: "Legs B", subtitle: "Glutes, Hamstrings & Calves", exercises: [
            { name: "Sumo Squats", sets: "3×15", tip: "Toes wide, chest tall" },
            { name: "Single-Leg Glute Bridge", sets: "3×15", tip: "Non-working leg raised" },
            { name: "Jump Squats", sets: "3×12", tip: "Land softly" },
            { name: "Nordic Curl Negative", sets: "3×5", tip: "Slow 5-sec lower" },
            { name: "Standing Calf Raises", sets: "3×20", tip: "Slow eccentric" }
          ]}
        ]
      },
      intermediate: {
        gym: [
          { day: "Push A", subtitle: "Strength Push", exercises: [
            { name: "Barbell Bench Press", sets: "4×8", tip: "1-sec pause on chest" },
            { name: "Seated Dumbbell Shoulder Press", sets: "4×10", tip: "Full overhead extension" },
            { name: "Incline Dumbbell Fly", sets: "3×12", tip: "Slow, wide arc" },
            { name: "Cable Lateral Raise", sets: "3×15", tip: "Cable at hip, raise overhead" },
            { name: "Close-Grip Bench Press", sets: "3×10", tip: "Elbows tucked" }
          ]},
          { day: "Pull A", subtitle: "Strength Pull", exercises: [
            { name: "Pull-Ups", sets: "4×8", tip: "Dead hang, chin over bar" },
            { name: "Barbell Row", sets: "4×8", tip: "Row to belly, not chest" },
            { name: "Face Pulls", sets: "3×15", tip: "High attachment, pull to ears" },
            { name: "Barbell Curl", sets: "3×10", tip: "Slow 3-sec negative" },
            { name: "Reverse Curl", sets: "3×12", tip: "Brachialis emphasis" }
          ]},
          { day: "Legs A", subtitle: "Strength Legs", exercises: [
            { name: "Barbell Squat", sets: "4×8", tip: "Below parallel" },
            { name: "Romanian Deadlift", sets: "4×10", tip: "Feel the stretch" },
            { name: "Leg Extension", sets: "3×15", tip: "Pause at full extension" },
            { name: "Leg Curl", sets: "3×12", tip: "Controlled negative" },
            { name: "Standing Calf Raise", sets: "4×20", tip: "Full ROM" }
          ]},
          { day: "Push B", subtitle: "Volume Push", exercises: [
            { name: "Incline Barbell Bench Press", sets: "4×10", tip: "Slight arch" },
            { name: "Arnold Press", sets: "3×12", tip: "Rotate as you press" },
            { name: "Cable Cross-Over", sets: "3×15", tip: "Squeeze at cross" },
            { name: "Upright Row", sets: "3×12", tip: "Elbows above wrists" },
            { name: "Skull Crushers (EZ-Bar)", sets: "3×12", tip: "Keep elbows vertical" }
          ]},
          { day: "Pull B", subtitle: "Volume Pull", exercises: [
            { name: "Chest-Supported Row (DB)", sets: "4×12", tip: "Chest on incline bench" },
            { name: "Wide-Grip Lat Pulldown", sets: "4×12", tip: "Lean back slightly" },
            { name: "Reverse Pec Deck", sets: "3×15", tip: "Rear delt focus" },
            { name: "Incline Dumbbell Curl", sets: "3×12", tip: "Full stretch at bottom" },
            { name: "Cable Hammer Curl", sets: "3×12", tip: "Controlled" }
          ]},
          { day: "Legs B", subtitle: "Volume Legs", exercises: [
            { name: "Hack Squat", sets: "4×10", tip: "Feet high for more glute" },
            { name: "Walking Lunges (DB)", sets: "4×12", tip: "Long stride" },
            { name: "Leg Press (High Feet)", sets: "3×15", tip: "Glute-dominant position" },
            { name: "Seated Leg Curl", sets: "3×15", tip: "Squeeze at full flexion" },
            { name: "Donkey Calf Raises", sets: "4×20", tip: "Loaded stretch at bottom" }
          ]}
        ],
        home: [
          { day: "Push A", subtitle: "Strength Push", exercises: [
            { name: "Archer Push Ups", sets: "4×10", tip: "Full extension each side" },
            { name: "Pike Push Ups", sets: "4×12", tip: "Hips high, head between arms" },
            { name: "Dips (Parallel Bars / Chair)", sets: "4×12", tip: "Forward lean" },
            { name: "Diamond Push Ups", sets: "3×12", tip: "Elbows back" },
            { name: "Band Lateral Raise", sets: "3×15", tip: "Arms to shoulder height" }
          ]},
          { day: "Pull A", subtitle: "Strength Pull", exercises: [
            { name: "Pull-Ups / Chin-Ups", sets: "4×8", tip: "Full dead hang at bottom" },
            { name: "Australian Rows (Low Bar)", sets: "4×12", tip: "Chest to bar" },
            { name: "Band Face Pulls", sets: "3×15", tip: "High anchor" },
            { name: "Resistance Band Curl", sets: "3×15", tip: "Full range" },
            { name: "Doorframe Row", sets: "3×12", tip: "Feet forward, lean back" }
          ]},
          { day: "Legs A", subtitle: "Strength Legs", exercises: [
            { name: "Bulgarian Split Squat", sets: "4×10", tip: "Deep range" },
            { name: "Single-Leg Hip Thrust", sets: "4×12", tip: "Drive through heel" },
            { name: "Pistol Squat Progression", sets: "3×8", tip: "Use a box for depth" },
            { name: "Nordic Curl Negative", sets: "3×6", tip: "5-sec lower" },
            { name: "Calf Raises (Single Leg)", sets: "4×20", tip: "Off a step" }
          ]},
          { day: "Push B", subtitle: "Volume Push", exercises: [
            { name: "Wide Push Ups", sets: "4×15", tip: "Elbows wide, chest dominant" },
            { name: "Decline Push Ups", sets: "4×12", tip: "Upper chest emphasis" },
            { name: "Handstand Hold (Wall)", sets: "3×30s", tip: "Build shoulder endurance" },
            { name: "Tricep Dips", sets: "3×15", tip: "Upright torso for tricep focus" },
            { name: "Push Up to T-Rotation", sets: "3×10", tip: "Rotate hips at top" }
          ]},
          { day: "Pull B", subtitle: "Volume Pull", exercises: [
            { name: "Wide-Grip Pull-Ups", sets: "4×8", tip: "Slight lean back" },
            { name: "Resistance Band Lat Pulldown", sets: "4×12", tip: "Band anchored overhead" },
            { name: "Rear Delt Fly (Band)", sets: "3×15", tip: "Thumbs down, arms wide" },
            { name: "Zottman Curl (Band)", sets: "3×12", tip: "Reverse grip on way down" },
            { name: "Band Pull-Aparts", sets: "3×20", tip: "Squeeze shoulder blades" }
          ]},
          { day: "Legs B", subtitle: "Volume Legs", exercises: [
            { name: "Jump Squats", sets: "4×15", tip: "Soft landing, absorb impact" },
            { name: "Lateral Lunges", sets: "4×12", tip: "Sit deep into the hip" },
            { name: "Glute Bridge Marching", sets: "3×20", tip: "Alternate knee lifts" },
            { name: "Hamstring Curls (Band)", sets: "3×15", tip: "Face down on floor" },
            { name: "Jump Lunges", sets: "3×12", tip: "Explosive drive" }
          ]}
        ]
      },
      professional: {
        gym: [
          { day: "Push A", subtitle: "Max Strength Push", exercises: [
            { name: "Heavy Bench Press", sets: "5×5", tip: "85% 1RM, controlled descent" },
            { name: "Overhead Press (Barbell)", sets: "5×5", tip: "Brace hard, no layback" },
            { name: "Weighted Dips", sets: "4×8", tip: "Lean forward for chest" },
            { name: "Cable Lateral Raise (Drop Set)", sets: "3×12+12", tip: "Drop 50%" },
            { name: "Overhead Tricep Extension (Cable)", sets: "3×12", tip: "Fully lock out" }
          ]},
          { day: "Pull A", subtitle: "Max Strength Pull", exercises: [
            { name: "Weighted Pull-Ups", sets: "5×5", tip: "Add 10%+ bodyweight" },
            { name: "Heavy Barbell Row", sets: "5×5", tip: "Explosive pull, lower slowly" },
            { name: "Meadows Row", sets: "4×8", tip: "Landmine attachment" },
            { name: "Barbell Curl (Heavy)", sets: "4×8", tip: "Cheat curl acceptable" },
            { name: "Reverse Hyper", sets: "3×15", tip: "Lower back health" }
          ]},
          { day: "Legs A", subtitle: "Max Strength Legs", exercises: [
            { name: "Heavy Barbell Squat", sets: "5×5", tip: "90% 1RM, spotter ready" },
            { name: "Heavy Deadlift", sets: "5×4", tip: "Max intent on each rep" },
            { name: "Leg Press (Heavy, 4 plates)", sets: "4×10", tip: "Deep range" },
            { name: "Hamstring Curl (Drop Set)", sets: "3×12+12", tip: "Full ROM" },
            { name: "Standing Calf Raises (Heavy)", sets: "5×15", tip: "Slow eccentric" }
          ]},
          { day: "Push B", subtitle: "Hypertrophy Push", exercises: [
            { name: "Incline Barbell Press", sets: "4×10", tip: "Slow 3-sec eccentric" },
            { name: "Cable Cross-Over (High-to-Low)", sets: "4×15", tip: "Squeeze at cross" },
            { name: "Machine Shoulder Press", sets: "4×12", tip: "Full ROM" },
            { name: "Rear Delt Fly (Bent-Over)", sets: "3×15", tip: "Elbows high" },
            { name: "Skull Crushers into Close-Grip Press", sets: "3×10+10", tip: "Superset" }
          ]},
          { day: "Pull B", subtitle: "Hypertrophy Pull", exercises: [
            { name: "Chest-Supported Row", sets: "4×12", tip: "Eliminate body English" },
            { name: "Cable Pullover", sets: "4×12", tip: "Lat stretch at top" },
            { name: "Reverse Pec Deck (Drop Set)", sets: "3×12+12", tip: "Rear delt pump" },
            { name: "Preacher Curl (Machine)", sets: "4×12", tip: "Full stretch at bottom" },
            { name: "Cable Hammer Curl", sets: "3×15", tip: "Rope attachment, neutral" }
          ]},
          { day: "Legs B", subtitle: "Hypertrophy Legs", exercises: [
            { name: "Front Squat", sets: "4×8", tip: "Elbows high, upright torso" },
            { name: "Walking Lunges (Heavy DB)", sets: "4×16 steps", tip: "Full stride length" },
            { name: "Leg Curl (Seated, Slow)", sets: "4×15", tip: "5-sec eccentric" },
            { name: "Leg Extension (Drop Set)", sets: "3×15+15", tip: "Quad burn" },
            { name: "Donkey Calf Raises (Heavy)", sets: "5×20", tip: "Full stretch" }
          ]}
        ],
        home: [
          { day: "Push A", subtitle: "Max Strength Push", exercises: [
            { name: "Clap Push Ups", sets: "5×15", tip: "Max explosive force" },
            { name: "Handstand Push Ups (Wall)", sets: "5×6", tip: "Head touches floor" },
            { name: "Weighted Dips (Belt/Vest)", sets: "4×8", tip: "Full ROM, slow descent" },
            { name: "Pike Push Up (Slow)", sets: "3×12", tip: "4-sec negative" },
            { name: "Band Tricep Pushdown", sets: "3×20", tip: "High volume burnout" }
          ]},
          { day: "Pull A", subtitle: "Max Strength Pull", exercises: [
            { name: "Weighted Pull-Ups (Belt)", sets: "5×5", tip: "Full dead hang" },
            { name: "Typewriter Pull-Ups", sets: "4×6", tip: "Shift side to side at top" },
            { name: "Weighted Australian Row", sets: "4×10", tip: "Weight on chest" },
            { name: "One-Arm Row Progression", sets: "3×8", tip: "Work towards unilateral" },
            { name: "Chin-Up (Slow Negative)", sets: "3×8", tip: "5-sec lower" }
          ]},
          { day: "Legs A", subtitle: "Max Strength Legs", exercises: [
            { name: "Pistol Squats", sets: "5×8", tip: "Full depth, no counter" },
            { name: "Shrimp Squats", sets: "5×8", tip: "Rear knee to ground" },
            { name: "Nordic Curls", sets: "5×6", tip: "Full ROM, explosive up" },
            { name: "Jump Squats (Weighted Vest)", sets: "4×12", tip: "Max height every rep" },
            { name: "Single-Leg Calf Raises (Loaded)", sets: "5×20", tip: "Full stretch" }
          ]},
          { day: "Push B", subtitle: "Hypertrophy Push", exercises: [
            { name: "Decline Push Ups (Slow)", sets: "4×15", tip: "4-sec eccentric" },
            { name: "Wide Push Ups (Pause at Bottom)", sets: "4×15", tip: "1-sec pause" },
            { name: "Pseudo Planche Lean", sets: "4×30s", tip: "Lean forward on wrists" },
            { name: "Dips (High Volume)", sets: "3×20", tip: "Full ROM each rep" },
            { name: "Band Lateral Raise (Drop Set)", sets: "3×20+20", tip: "Superset" }
          ]},
          { day: "Pull B", subtitle: "Hypertrophy Pull", exercises: [
            { name: "Wide-Grip Pull-Ups (High Volume)", sets: "4×12", tip: "Full stretch" },
            { name: "L-Sit Pull-Ups", sets: "4×8", tip: "Legs parallel to floor" },
            { name: "Band Seated Row", sets: "4×20", tip: "Slow controlled" },
            { name: "Chin-Ups (Supinated, Slow)", sets: "3×12", tip: "Squeeze bicep at top" },
            { name: "Band Pull-Aparts (High Rep)", sets: "3×30", tip: "Rear delt burnout" }
          ]},
          { day: "Legs B", subtitle: "Hypertrophy Legs", exercises: [
            { name: "Bulgarian Split Squat (Jumps)", sets: "4×10", tip: "Explosive drive" },
            { name: "Lateral Lunge to Curtsy", sets: "4×12", tip: "Full adductor stretch" },
            { name: "Single-Leg RDL", sets: "4×10", tip: "Hinge deep, feel hamstring" },
            { name: "Glute Bridge (Banded)", sets: "3×20", tip: "Band above knees" },
            { name: "Calf Raise Burnout", sets: "3×50", tip: "Bodyweight, fast pace" }
          ]}
        ]
      }
    }
  },

  upperlower: {
    label: "Upper / Lower",
    icon: "⚡",
    sub: "4 days · Balanced frequency",
    daysPerWeek: 4,
    intensity: "Medium-High",
    days: ["Upper A", "Lower A", "Rest", "Upper B", "Lower B", "Rest", "Rest"],
    dayTypes: ["work","work","rest","work","work","rest","rest"],
    coachTip: {
      beginner: "Upper/Lower trains everything twice per week in just 4 sessions — great for building strength fast while leaving room to recover.",
      intermediate: "Differentiate A and B days: A days go heavier (strength), B days go higher rep (hypertrophy). Track your weights to ensure consistent progression.",
      professional: "Use A days to peak strength near your 1RM and B days for hypertrophy clusters. Add intensity techniques (rest-pause, myo-reps) on B sessions."
    },
    plans: {
      beginner: {
        gym: [
          { day: "Upper A", subtitle: "Upper Body — Strength Focus", exercises: [
            { name: "Barbell Bench Press", sets: "3×10", tip: "Retract shoulder blades" },
            { name: "Lat Pulldown", sets: "3×12", tip: "Elbows to hips" },
            { name: "Dumbbell Shoulder Press", sets: "3×12", tip: "Neutral grip" },
            { name: "Cable Row", sets: "3×12", tip: "Squeeze at the end" },
            { name: "Dumbbell Curl", sets: "3×12", tip: "No swing" }
          ]},
          { day: "Lower A", subtitle: "Lower Body — Strength Focus", exercises: [
            { name: "Goblet Squat", sets: "3×12", tip: "Hold DB at chest" },
            { name: "Romanian Deadlift", sets: "3×12", tip: "Feel the hamstring" },
            { name: "Leg Press", sets: "3×15", tip: "Don't lock knees out" },
            { name: "Leg Curl", sets: "3×12", tip: "Controlled negative" },
            { name: "Standing Calf Raise", sets: "3×20", tip: "Full range" }
          ]},
          { day: "Upper B", subtitle: "Upper Body — Volume Focus", exercises: [
            { name: "Incline Dumbbell Press", sets: "3×12", tip: "45° incline" },
            { name: "Machine Row", sets: "3×12", tip: "Chest to pad" },
            { name: "Lateral Raises", sets: "3×15", tip: "Lead with elbows" },
            { name: "Pec Deck", sets: "3×15", tip: "Wide arc" },
            { name: "Tricep Pushdown", sets: "3×15", tip: "Elbows pinned" }
          ]},
          { day: "Lower B", subtitle: "Lower Body — Volume Focus", exercises: [
            { name: "Leg Extension", sets: "3×15", tip: "Full extension" },
            { name: "Hip Thrust", sets: "3×15", tip: "Drive through heels" },
            { name: "Walking Lunges", sets: "3×12", tip: "Long stride" },
            { name: "Seated Calf Raise", sets: "3×20", tip: "Soleus focus" },
            { name: "Plank", sets: "3×30s", tip: "Core braced" }
          ]}
        ],
        home: [
          { day: "Upper A", subtitle: "Upper Body — Strength Focus", exercises: [
            { name: "Push Ups", sets: "3×15", tip: "Straight body line" },
            { name: "Inverted Rows", sets: "3×12", tip: "Table edge or bar" },
            { name: "Pike Push Ups", sets: "3×10", tip: "Hips high" },
            { name: "Band Pull-Aparts", sets: "3×20", tip: "Arms straight" },
            { name: "Resistance Band Curl", sets: "3×15", tip: "Full ROM" }
          ]},
          { day: "Lower A", subtitle: "Lower Body — Strength Focus", exercises: [
            { name: "Bodyweight Squats", sets: "3×20", tip: "Chest tall" },
            { name: "Glute Bridge", sets: "3×20", tip: "Squeeze at top" },
            { name: "Reverse Lunges", sets: "3×12", tip: "Upright torso" },
            { name: "Wall Sit", sets: "3×30s", tip: "90° knee angle" },
            { name: "Calf Raises", sets: "3×20", tip: "Full stretch" }
          ]},
          { day: "Upper B", subtitle: "Upper Body — Volume Focus", exercises: [
            { name: "Incline Push Ups", sets: "3×15", tip: "Hands elevated" },
            { name: "Doorframe Row", sets: "3×12", tip: "Feet forward, lean back" },
            { name: "Diamond Push Ups", sets: "3×12", tip: "Elbows close" },
            { name: "Band Lateral Raise", sets: "3×15", tip: "To shoulder height" },
            { name: "Tricep Dips (Chair)", sets: "3×12", tip: "Hips close to chair" }
          ]},
          { day: "Lower B", subtitle: "Lower Body — Volume Focus", exercises: [
            { name: "Sumo Squats", sets: "3×15", tip: "Wide stance, toes out" },
            { name: "Single-Leg Glute Bridge", sets: "3×15", tip: "Non-working leg raised" },
            { name: "Mountain Climbers", sets: "3×20", tip: "Hips level" },
            { name: "Step Ups", sets: "3×12", tip: "Drive through the heel" },
            { name: "Standing Calf Raise", sets: "3×20", tip: "Slow eccentric" }
          ]}
        ]
      },
      intermediate: {
        gym: [
          { day: "Upper A", subtitle: "Upper Body — Strength Focus", exercises: [
            { name: "Bench Press", sets: "4×6", tip: "1-sec pause at chest" },
            { name: "Barbell Row", sets: "4×6", tip: "Row to hip, not armpit" },
            { name: "Incline Bench Press", sets: "3×10", tip: "Touch chest" },
            { name: "Cable Row (Close Grip)", sets: "3×10", tip: "Fully stretch at start" },
            { name: "Lateral Raise (Cable)", sets: "3×15", tip: "At hip level" }
          ]},
          { day: "Lower A", subtitle: "Lower Body — Strength Focus", exercises: [
            { name: "Barbell Squat", sets: "4×6", tip: "Break parallel" },
            { name: "Romanian Deadlift", sets: "4×8", tip: "3-sec eccentric" },
            { name: "Leg Press", sets: "3×12", tip: "High feet for glute" },
            { name: "Leg Curl (Lying)", sets: "3×12", tip: "Controlled" },
            { name: "Standing Calf Raise (Heavy)", sets: "4×15", tip: "Full ROM" }
          ]},
          { day: "Upper B", subtitle: "Upper Body — Volume Focus", exercises: [
            { name: "Incline Dumbbell Press", sets: "4×12", tip: "4-sec eccentric" },
            { name: "Lat Pulldown (Wide)", sets: "4×12", tip: "Lean slightly back" },
            { name: "Arnold Press", sets: "3×12", tip: "Rotate as you press" },
            { name: "Chest-Supported Row", sets: "3×15", tip: "Strict form" },
            { name: "Hammer Curl", sets: "3×12", tip: "No swing" }
          ]},
          { day: "Lower B", subtitle: "Lower Body — Volume Focus", exercises: [
            { name: "Hack Squat", sets: "4×10", tip: "Feet high for glute" },
            { name: "Walking Lunges (DB)", sets: "4×14 steps", tip: "Long stride" },
            { name: "Hip Thrust (Barbell)", sets: "4×12", tip: "Chin tucked" },
            { name: "Leg Curl (Seated)", sets: "4×15", tip: "Full flexion squeeze" },
            { name: "Seated Calf Raise", sets: "4×20", tip: "Soleus emphasis" }
          ]}
        ],
        home: [
          { day: "Upper A", subtitle: "Upper Body — Strength Focus", exercises: [
            { name: "Archer Push Ups", sets: "4×10", tip: "Full side-to-side shift" },
            { name: "Pull-Ups", sets: "4×8", tip: "Full dead hang each rep" },
            { name: "Pike Push Ups (Pause)", sets: "3×10", tip: "1-sec pause at bottom" },
            { name: "Australian Rows", sets: "3×12", tip: "Chest to bar" },
            { name: "Band Curl", sets: "3×15", tip: "Full contraction" }
          ]},
          { day: "Lower A", subtitle: "Lower Body — Strength Focus", exercises: [
            { name: "Bulgarian Split Squat", sets: "4×10", tip: "Deep range" },
            { name: "Single-Leg Hip Thrust", sets: "4×12", tip: "Drive through heel" },
            { name: "Pistol Squat (Box)", sets: "3×8", tip: "Use box for depth" },
            { name: "Nordic Curl Negative", sets: "3×6", tip: "5-sec lower" },
            { name: "Calf Raises (Single Leg)", sets: "4×20", tip: "Full stretch" }
          ]},
          { day: "Upper B", subtitle: "Upper Body — Volume Focus", exercises: [
            { name: "Decline Push Ups", sets: "4×15", tip: "Feet on chair" },
            { name: "Chin-Ups", sets: "4×10", tip: "Supinated grip" },
            { name: "Dips (Parallel Bars)", sets: "3×15", tip: "Full ROM" },
            { name: "Band Rear Delt Fly", sets: "3×20", tip: "Thumbs down" },
            { name: "Diamond Push Ups", sets: "3×15", tip: "Elbows track back" }
          ]},
          { day: "Lower B", subtitle: "Lower Body — Volume Focus", exercises: [
            { name: "Jump Squats", sets: "4×15", tip: "Soft landing" },
            { name: "Lateral Lunges", sets: "4×12", tip: "Sit into the hip" },
            { name: "Glute Bridge (Banded)", sets: "4×20", tip: "Band above knees" },
            { name: "Hamstring Curl (Band)", sets: "3×15", tip: "Face down on floor" },
            { name: "Calf Raise Burnout", sets: "3×30", tip: "Continuous reps" }
          ]}
        ]
      },
      professional: {
        gym: [
          { day: "Upper A", subtitle: "Max Strength Upper", exercises: [
            { name: "Bench Press", sets: "5×3", tip: "90% 1RM, full competition setup" },
            { name: "Weighted Pull-Ups", sets: "5×4", tip: "Heavy, dead hang" },
            { name: "Overhead Press (Push Press)", sets: "4×5", tip: "Hip drive assist" },
            { name: "Pendlay Row", sets: "4×5", tip: "Dead stop each rep" },
            { name: "Weighted Dips", sets: "3×8", tip: "Forward lean, deep" }
          ]},
          { day: "Lower A", subtitle: "Max Strength Lower", exercises: [
            { name: "Heavy Squat", sets: "5×3", tip: "90%+ 1RM, spotter" },
            { name: "Heavy Deadlift", sets: "5×3", tip: "Max intent, full reset" },
            { name: "Leg Press (Max Plates)", sets: "3×8", tip: "Deep range" },
            { name: "Glute Ham Raise", sets: "4×8", tip: "Full ROM, controlled" },
            { name: "Calf Raise (Heavy)", sets: "5×12", tip: "Slow eccentric" }
          ]},
          { day: "Upper B", subtitle: "Hypertrophy Upper", exercises: [
            { name: "Incline Press (Drop Set)", sets: "4×10+10", tip: "Drop 30% for second set" },
            { name: "Cable Row (Drop Set)", sets: "4×12+12", tip: "Full ROM" },
            { name: "Cable Cross-Over (High-Low)", sets: "3×15", tip: "Squeeze hard" },
            { name: "Rear Delt Fly (Myo-Reps)", sets: "3×20+5+5+5", tip: "Rest-pause" },
            { name: "Superset: Curl + Skull Crusher", sets: "3×12+12", tip: "Back to back" }
          ]},
          { day: "Lower B", subtitle: "Hypertrophy Lower", exercises: [
            { name: "Front Squat", sets: "4×8", tip: "Elbows high throughout" },
            { name: "Bulgarian Split Squat (DB)", sets: "4×10", tip: "Slow eccentric" },
            { name: "Seated Leg Curl (Drop Set)", sets: "4×12+12", tip: "Max pump" },
            { name: "Leg Extension (Myo-Reps)", sets: "3×20+5+5+5", tip: "Quad burn" },
            { name: "Donkey Calf Raise (Heavy)", sets: "5×20", tip: "Full stretch every rep" }
          ]}
        ],
        home: [
          { day: "Upper A", subtitle: "Max Strength Upper", exercises: [
            { name: "Handstand Push Ups (Wall)", sets: "5×6", tip: "Head touches ground" },
            { name: "Weighted Pull-Ups (Belt)", sets: "5×5", tip: "Dead hang, full extension" },
            { name: "Planche Push Up Progression", sets: "4×8", tip: "Lean forward, straddle" },
            { name: "Typewriter Pull-Ups", sets: "3×6", tip: "Shift side to side at top" },
            { name: "Dips (Heavy)", sets: "3×10", tip: "Full ROM, slow" }
          ]},
          { day: "Lower A", subtitle: "Max Strength Lower", exercises: [
            { name: "Pistol Squats (Weighted Vest)", sets: "5×6", tip: "Full depth" },
            { name: "Shrimp Squats", sets: "5×8", tip: "Rear knee grazes floor" },
            { name: "Nordic Curls", sets: "5×6", tip: "Max hamstring tension" },
            { name: "Jump Squats (Vest)", sets: "4×12", tip: "Max height" },
            { name: "Calf Raises (Loaded, Single Leg)", sets: "5×20", tip: "Full ROM" }
          ]},
          { day: "Upper B", subtitle: "Hypertrophy Upper", exercises: [
            { name: "Archer Push Ups (Slow)", sets: "4×10", tip: "5-sec each side" },
            { name: "L-Sit Pull-Ups", sets: "4×8", tip: "Legs parallel to floor" },
            { name: "Decline Push Ups (Pause)", sets: "4×15", tip: "1-sec pause at bottom" },
            { name: "Wide Pull-Ups (High Volume)", sets: "3×15", tip: "Full ROM" },
            { name: "Band Tricep Pushdown + Curl", sets: "3×20+20", tip: "Superset" }
          ]},
          { day: "Lower B", subtitle: "Hypertrophy Lower", exercises: [
            { name: "Bulgarian Split Squat (Jump)", sets: "4×10", tip: "Explosive drive" },
            { name: "Lateral Lunge to Curtsy Lunge", sets: "4×12", tip: "Controlled flow" },
            { name: "Single-Leg RDL", sets: "4×10", tip: "Feel the hamstring stretch" },
            { name: "Glute Bridge Burnout (Banded)", sets: "3×30", tip: "Non-stop reps" },
            { name: "Calf Raise Burnout", sets: "3×50", tip: "Fast pace, both legs" }
          ]}
        ]
      }
    }
  },

  brosplit: {
    label: "Bro Split",
    icon: "🔥",
    sub: "5 days · One muscle per day",
    daysPerWeek: 5,
    intensity: "High",
    days: ["Chest", "Back", "Shoulders", "Arms", "Legs", "Rest", "Rest"],
    dayTypes: ["work","work","work","work","work","rest","rest"],
    coachTip: {
      beginner: "Bro Split lets you go all-out on one muscle group per session. Make sure you hit every muscle every week and don't skip legs!",
      intermediate: "With a full week of recovery per muscle, you can really push volume per session. Use techniques like supersets on arms day.",
      professional: "Running a true Bro Split at high volume requires excellent recovery. Track MPV on key lifts and deload every 4–6 weeks."
    },
    plans: {
      beginner: {
        gym: [
          { day: "Chest", subtitle: "Chest Day", exercises: [
            { name: "Barbell Bench Press", sets: "3×10", tip: "Controlled descent" },
            { name: "Incline Dumbbell Press", sets: "3×12", tip: "Touch chest" },
            { name: "Pec Deck Fly", sets: "3×15", tip: "Wide arc" },
            { name: "Cable Cross-Over", sets: "3×15", tip: "Squeeze at cross" },
            { name: "Push Up Burnout", sets: "2×max", tip: "To failure" }
          ]},
          { day: "Back", subtitle: "Back Day", exercises: [
            { name: "Lat Pulldown", sets: "3×12", tip: "Elbows to hips" },
            { name: "Seated Cable Row", sets: "3×12", tip: "Squeeze blades" },
            { name: "Machine Row", sets: "3×12", tip: "Chest to pad" },
            { name: "Straight-Arm Pulldown", sets: "3×15", tip: "Slight forward lean" },
            { name: "Dumbbell Row", sets: "3×12", tip: "Row to hip" }
          ]},
          { day: "Shoulders", subtitle: "Shoulder Day", exercises: [
            { name: "Dumbbell Shoulder Press", sets: "3×12", tip: "Full overhead extension" },
            { name: "Lateral Raises", sets: "4×15", tip: "Lead with elbows" },
            { name: "Front Raises", sets: "3×12", tip: "Don't swing" },
            { name: "Rear Delt Fly", sets: "3×15", tip: "Thumbs down" },
            { name: "Shrugs", sets: "3×20", tip: "Hold at top" }
          ]},
          { day: "Arms", subtitle: "Arms Day", exercises: [
            { name: "EZ-Bar Curl", sets: "3×12", tip: "Full extension" },
            { name: "Hammer Curl", sets: "3×12", tip: "Neutral wrist" },
            { name: "Tricep Pushdown", sets: "3×15", tip: "Elbows pinned" },
            { name: "Overhead Tricep Extension", sets: "3×12", tip: "Elbows forward" },
            { name: "Concentration Curl", sets: "3×12", tip: "Elbow on thigh" }
          ]},
          { day: "Legs", subtitle: "Legs Day", exercises: [
            { name: "Leg Press", sets: "4×15", tip: "Feet hip-width" },
            { name: "Leg Extension", sets: "3×15", tip: "Full extension" },
            { name: "Leg Curl", sets: "3×12", tip: "Controlled lower" },
            { name: "Standing Calf Raise", sets: "4×20", tip: "Full ROM" },
            { name: "Hip Abduction", sets: "3×15", tip: "Full ROM" }
          ]}
        ],
        home: [
          { day: "Chest", subtitle: "Chest Day", exercises: [
            { name: "Push Ups", sets: "3×20", tip: "Controlled descent" },
            { name: "Wide Push Ups", sets: "3×15", tip: "Elbows flare" },
            { name: "Incline Push Ups", sets: "3×15", tip: "Hands elevated" },
            { name: "Decline Push Ups", sets: "3×12", tip: "Feet on chair" },
            { name: "Push Up Burnout", sets: "2×max", tip: "To failure" }
          ]},
          { day: "Back", subtitle: "Back Day", exercises: [
            { name: "Inverted Rows (Table)", sets: "3×12", tip: "Pull chest to table" },
            { name: "Superman Holds", sets: "3×15", tip: "Pause at top" },
            { name: "Band Lat Pulldown", sets: "3×15", tip: "Overhead anchor" },
            { name: "Towel Row", sets: "3×12", tip: "Door anchor" },
            { name: "Reverse Snow Angels", sets: "3×15", tip: "Face down, arms sweep" }
          ]},
          { day: "Shoulders", subtitle: "Shoulder Day", exercises: [
            { name: "Pike Push Ups", sets: "4×12", tip: "Hips high" },
            { name: "Band Lateral Raise", sets: "4×20", tip: "Lead with elbows" },
            { name: "Band Front Raise", sets: "3×15", tip: "Arms straight" },
            { name: "Band Face Pulls", sets: "3×20", tip: "High anchor" },
            { name: "Shoulder Circles", sets: "3×20", tip: "Full ROM" }
          ]},
          { day: "Arms", subtitle: "Arms Day", exercises: [
            { name: "Band Curl", sets: "3×20", tip: "Full ROM" },
            { name: "Hammer Curl (Band)", sets: "3×15", tip: "Neutral wrist" },
            { name: "Diamond Push Ups", sets: "3×15", tip: "Elbows back" },
            { name: "Tricep Dips (Chair)", sets: "3×15", tip: "Hips close" },
            { name: "Concentration Curl (Band)", sets: "3×15", tip: "Elbow on thigh" }
          ]},
          { day: "Legs", subtitle: "Legs Day", exercises: [
            { name: "Bodyweight Squats", sets: "4×20", tip: "Chest tall" },
            { name: "Reverse Lunges", sets: "3×15", tip: "Upright torso" },
            { name: "Glute Bridge", sets: "4×20", tip: "Squeeze at top" },
            { name: "Wall Sit", sets: "3×40s", tip: "90° at knee" },
            { name: "Calf Raises", sets: "4×20", tip: "Full stretch" }
          ]}
        ]
      },
      intermediate: {
        gym: [
          { day: "Chest", subtitle: "Chest Day", exercises: [
            { name: "Flat Barbell Bench Press", sets: "4×8", tip: "1-sec pause on chest" },
            { name: "Incline Barbell Press", sets: "4×10", tip: "Touch chest" },
            { name: "Dumbbell Fly", sets: "3×15", tip: "Wide arc, slight bend" },
            { name: "Cable Cross-Over (Low-High)", sets: "3×15", tip: "Underhand" },
            { name: "Decline Push Ups", sets: "3×max", tip: "To failure" }
          ]},
          { day: "Back", subtitle: "Back Day", exercises: [
            { name: "Barbell Row", sets: "4×8", tip: "Row to belly" },
            { name: "Pull-Ups", sets: "4×8", tip: "Full hang" },
            { name: "Wide-Grip Lat Pulldown", sets: "3×12", tip: "Lean back" },
            { name: "Chest-Supported Row (DB)", sets: "3×12", tip: "Strict form" },
            { name: "Cable Pullover", sets: "3×12", tip: "Lat stretch" }
          ]},
          { day: "Shoulders", subtitle: "Shoulder Day", exercises: [
            { name: "Barbell Overhead Press", sets: "4×8", tip: "Bar path straight" },
            { name: "Lateral Raises (Drop Set)", sets: "3×15+15", tip: "Drop 50%" },
            { name: "Rear Pec Deck", sets: "4×15", tip: "Rear delt focus" },
            { name: "Face Pulls", sets: "3×20", tip: "External rotation" },
            { name: "Upright Row", sets: "3×12", tip: "Wide grip" }
          ]},
          { day: "Arms", subtitle: "Arms Day", exercises: [
            { name: "Barbell Curl", sets: "4×10", tip: "Full extension" },
            { name: "Incline Dumbbell Curl", sets: "3×12", tip: "Full stretch" },
            { name: "Skull Crushers", sets: "4×10", tip: "Elbows vertical" },
            { name: "Close-Grip Bench Press", sets: "3×10", tip: "Elbows tucked" },
            { name: "Superset: Cable Curl + Pushdown", sets: "3×12+12", tip: "Back to back" }
          ]},
          { day: "Legs", subtitle: "Legs Day", exercises: [
            { name: "Barbell Squat", sets: "4×8", tip: "Below parallel" },
            { name: "Romanian Deadlift", sets: "4×10", tip: "3-sec eccentric" },
            { name: "Hack Squat", sets: "3×12", tip: "Feet high for glute" },
            { name: "Leg Curl (Seated)", sets: "3×15", tip: "Full flexion" },
            { name: "Standing Calf Raise (Heavy)", sets: "5×15", tip: "Full ROM" }
          ]}
        ],
        home: [
          { day: "Chest", subtitle: "Chest Day", exercises: [
            { name: "Archer Push Ups", sets: "4×10", tip: "Full weight transfer" },
            { name: "Decline Push Ups", sets: "4×15", tip: "Feet elevated" },
            { name: "Wide Push Ups (Pause)", sets: "3×12", tip: "1-sec at bottom" },
            { name: "Diamond Push Ups", sets: "3×15", tip: "Elbows back" },
            { name: "Push Up Burnout", sets: "2×max", tip: "All-out effort" }
          ]},
          { day: "Back", subtitle: "Back Day", exercises: [
            { name: "Pull-Ups", sets: "4×10", tip: "Dead hang" },
            { name: "Australian Rows", sets: "4×15", tip: "Chest to bar" },
            { name: "Doorframe Row", sets: "3×12", tip: "Feet forward" },
            { name: "Band Pullover", sets: "3×15", tip: "Overhead anchor" },
            { name: "Band Straight-Arm Pulldown", sets: "3×15", tip: "Lat focus" }
          ]},
          { day: "Shoulders", subtitle: "Shoulder Day", exercises: [
            { name: "Pike Push Ups (Pause)", sets: "4×12", tip: "1-sec at bottom" },
            { name: "Band Lateral Raise (Drop Set)", sets: "4×20+20", tip: "No rest" },
            { name: "Band Face Pulls", sets: "3×25", tip: "External rotation" },
            { name: "Rear Delt Fly (Band)", sets: "3×20", tip: "Thumbs down" },
            { name: "Handstand Hold (Wall)", sets: "3×30s", tip: "Shoulder endurance" }
          ]},
          { day: "Arms", subtitle: "Arms Day", exercises: [
            { name: "Chin-Ups (Supinated)", sets: "4×10", tip: "Full hang" },
            { name: "Band Curl (Slow)", sets: "4×15", tip: "4-sec eccentric" },
            { name: "Tricep Dips (Deep)", sets: "4×15", tip: "Full ROM" },
            { name: "Diamond Push Ups (Slow)", sets: "3×12", tip: "4-sec down" },
            { name: "Band Hammer Curl", sets: "3×15", tip: "Neutral wrist" }
          ]},
          { day: "Legs", subtitle: "Legs Day", exercises: [
            { name: "Bulgarian Split Squat", sets: "4×12", tip: "Deep range" },
            { name: "Nordic Curl Negative", sets: "4×6", tip: "5-sec lower" },
            { name: "Jump Squats", sets: "3×15", tip: "Max height" },
            { name: "Single-Leg Hip Thrust", sets: "3×15", tip: "Drive through heel" },
            { name: "Calf Raises (Single Leg)", sets: "5×20", tip: "Full stretch" }
          ]}
        ]
      },
      professional: {
        gym: [
          { day: "Chest", subtitle: "Max Chest Day", exercises: [
            { name: "Heavy Bench Press", sets: "5×5", tip: "85–90% 1RM" },
            { name: "Incline Barbell Press", sets: "4×8", tip: "Touch chest" },
            { name: "Weighted Dips", sets: "4×10", tip: "Lean forward" },
            { name: "Cable Fly (Drop Set)", sets: "3×15+15", tip: "Constant tension" },
            { name: "Pec Deck Burnout", sets: "2×25", tip: "Pump set" }
          ]},
          { day: "Back", subtitle: "Max Back Day", exercises: [
            { name: "Deadlift", sets: "5×4", tip: "Max load, full reset" },
            { name: "Weighted Pull-Ups", sets: "5×6", tip: "Heavy, dead hang" },
            { name: "Meadows Row", sets: "4×10", tip: "Landmine, elbow high" },
            { name: "Cable Row (Drop Set)", sets: "3×12+12", tip: "Full ROM" },
            { name: "Straight-Arm Pulldown", sets: "3×15", tip: "Lat isolation" }
          ]},
          { day: "Shoulders", subtitle: "Max Shoulder Day", exercises: [
            { name: "Heavy Barbell Press", sets: "5×5", tip: "Press straight, not back" },
            { name: "Lateral Raises (Myo-Reps)", sets: "3×20+5+5+5", tip: "Rest-pause" },
            { name: "Rear Pec Deck (Drop Set)", sets: "4×15+15", tip: "Rear delt burn" },
            { name: "Upright Row (Heavy)", sets: "3×10", tip: "Wide grip" },
            { name: "Face Pulls (High Volume)", sets: "3×25", tip: "External rotation" }
          ]},
          { day: "Arms", subtitle: "Max Arms Day", exercises: [
            { name: "Barbell Curl (Heavy Cheat Curl)", sets: "4×8", tip: "Controlled negative" },
            { name: "Incline Dumbbell Curl", sets: "4×12", tip: "Full stretch at bottom" },
            { name: "Skull Crushers into Close-Grip", sets: "4×10+10", tip: "Superset" },
            { name: "Preacher Curl (Machine)", sets: "3×15", tip: "Full ROM" },
            { name: "Tricep Dips (Weighted)", sets: "3×10", tip: "Heavy, full ROM" }
          ]},
          { day: "Legs", subtitle: "Max Legs Day", exercises: [
            { name: "Heavy Barbell Squat", sets: "5×5", tip: "90%+ 1RM" },
            { name: "Romanian Deadlift (Heavy)", sets: "4×8", tip: "Maximal hamstring stretch" },
            { name: "Leg Press (Max Load)", sets: "4×10", tip: "Deep range" },
            { name: "Seated Leg Curl (Drop Set)", sets: "3×15+15", tip: "Burn" },
            { name: "Donkey Calf Raises (Heavy)", sets: "5×20", tip: "Full ROM" }
          ]}
        ],
        home: [
          { day: "Chest", subtitle: "Max Chest Day", exercises: [
            { name: "Clap Push Ups", sets: "5×15", tip: "Explosive" },
            { name: "Archer Push Ups (Slow)", sets: "4×12", tip: "5-sec each side" },
            { name: "Weighted Decline Push Ups", sets: "4×15", tip: "Weight on back" },
            { name: "Pseudo Planche Push Ups", sets: "3×10", tip: "Lean far forward" },
            { name: "Push Up Burnout", sets: "2×max", tip: "All-out" }
          ]},
          { day: "Back", subtitle: "Max Back Day", exercises: [
            { name: "Weighted Pull-Ups (Belt)", sets: "5×6", tip: "Full hang" },
            { name: "Typewriter Pull-Ups", sets: "4×8", tip: "Shift side to side" },
            { name: "L-Sit Pull-Ups", sets: "4×8", tip: "Legs parallel" },
            { name: "Weighted Australian Row", sets: "3×15", tip: "Weight on chest" },
            { name: "One-Arm Pull-Up Progression", sets: "3×5", tip: "Assisted if needed" }
          ]},
          { day: "Shoulders", subtitle: "Max Shoulder Day", exercises: [
            { name: "Handstand Push Ups", sets: "5×8", tip: "Head touches floor" },
            { name: "Pike Push Ups (Weighted)", sets: "4×12", tip: "Vest or plate on back" },
            { name: "Band Lateral Raise (Myo-Reps)", sets: "3×20+5+5+5", tip: "Rest-pause" },
            { name: "Band Face Pulls (High Vol)", sets: "3×30", tip: "External rotation" },
            { name: "Band Rear Delt Fly", sets: "3×25", tip: "Thumbs down, wide" }
          ]},
          { day: "Arms", subtitle: "Max Arms Day", exercises: [
            { name: "Chin-Ups (Weighted)", sets: "4×8", tip: "Full hang, slow negative" },
            { name: "Band Curl (Slow Eccentric)", sets: "4×15", tip: "5-sec lower" },
            { name: "Dips (Weighted)", sets: "4×12", tip: "Upright for tricep" },
            { name: "Diamond Push Ups (Pause)", sets: "3×15", tip: "1-sec at bottom" },
            { name: "Zottman Curl (Band)", sets: "3×15", tip: "Reverse on the way down" }
          ]},
          { day: "Legs", subtitle: "Max Legs Day", exercises: [
            { name: "Pistol Squats (Weighted Vest)", sets: "5×8", tip: "Full depth" },
            { name: "Nordic Curls", sets: "5×8", tip: "Full range, explosive up" },
            { name: "Shrimp Squats", sets: "4×10", tip: "Rear knee grazes floor" },
            { name: "Jump Lunges (Vest)", sets: "4×12", tip: "Max explosive drive" },
            { name: "Calf Raise Burnout", sets: "5×30", tip: "Single leg, off step" }
          ]}
        ]
      }
    }
  },

  arnoldsplit: {
    label: "Arnold Split",
    icon: "🏆",
    sub: "6 days · Classic bodybuilding",
    daysPerWeek: 6,
    intensity: "Very High",
    days: ["Chest & Back A", "Shoulders & Arms A", "Legs A", "Chest & Back B", "Shoulders & Arms B", "Legs B", "Rest"],
    dayTypes: ["work","work","work","work","work","work","rest"],
    coachTip: {
      beginner: "Arnold Split supersets chest and back together for incredible pumps. Take adequate rest between sets — don't rush this program.",
      intermediate: "The antagonist pairing (chest + back) accelerates recovery between sets. Keep reps in the 8–12 range and focus on the mind-muscle connection.",
      professional: "Run Arnold Split with periodised loading — heavy strength focus on A days, hypertrophy focus on B days. Your CNS will be under high stress; prioritise sleep and nutrition."
    },
    plans: {
      beginner: {
        gym: [
          { day: "Chest & Back A", subtitle: "Chest and Back Superset", exercises: [
            { name: "Barbell Bench Press", sets: "3×10", tip: "Controlled descent" },
            { name: "Barbell Row", sets: "3×10", tip: "Maintain neutral spine" },
            { name: "Incline Dumbbell Press", sets: "3×12", tip: "Touch chest" },
            { name: "Lat Pulldown", sets: "3×12", tip: "Elbows to hips" },
            { name: "Cable Fly", sets: "3×15", tip: "Constant tension" }
          ]},
          { day: "Shoulders & Arms A", subtitle: "Delts, Biceps & Triceps", exercises: [
            { name: "Dumbbell Shoulder Press", sets: "3×12", tip: "Full overhead extension" },
            { name: "Lateral Raises", sets: "3×15", tip: "Lead with elbows" },
            { name: "EZ-Bar Curl", sets: "3×12", tip: "No swinging" },
            { name: "Tricep Pushdown", sets: "3×15", tip: "Elbows pinned" },
            { name: "Face Pulls", sets: "3×15", tip: "External rotation" }
          ]},
          { day: "Legs A", subtitle: "Quads, Hamstrings & Glutes", exercises: [
            { name: "Leg Press", sets: "4×15", tip: "Feet hip-width" },
            { name: "Leg Extension", sets: "3×15", tip: "Full extension" },
            { name: "Leg Curl", sets: "3×12", tip: "Controlled" },
            { name: "Standing Calf Raise", sets: "4×20", tip: "Full ROM" },
            { name: "Plank", sets: "3×30s", tip: "Core tight" }
          ]},
          { day: "Chest & Back B", subtitle: "Chest and Back Volume", exercises: [
            { name: "Incline Barbell Press", sets: "3×12", tip: "45° incline" },
            { name: "Machine Row", sets: "3×12", tip: "Chest to pad" },
            { name: "Pec Deck", sets: "3×15", tip: "Wide arc" },
            { name: "Straight-Arm Pulldown", sets: "3×12", tip: "Slight lean" },
            { name: "Cable Cross-Over", sets: "3×15", tip: "Squeeze at cross" }
          ]},
          { day: "Shoulders & Arms B", subtitle: "Delts, Biceps & Triceps Volume", exercises: [
            { name: "Arnold Press", sets: "3×12", tip: "Rotate wrists as you press" },
            { name: "Front Raises", sets: "3×12", tip: "Don't swing" },
            { name: "Hammer Curl", sets: "3×12", tip: "Neutral wrist" },
            { name: "Overhead Tricep Extension", sets: "3×12", tip: "Elbows forward" },
            { name: "Reverse Fly", sets: "3×15", tip: "Bend over, thumbs down" }
          ]},
          { day: "Legs B", subtitle: "Glutes, Hamstrings & Calves", exercises: [
            { name: "Goblet Squat", sets: "4×12", tip: "Hold DB at chest" },
            { name: "Romanian Deadlift", sets: "3×12", tip: "Feel the stretch" },
            { name: "Hip Thrust", sets: "3×15", tip: "Drive through heels" },
            { name: "Seated Calf Raise", sets: "4×20", tip: "Soleus focus" },
            { name: "Reverse Lunges", sets: "3×12", tip: "Upright torso" }
          ]}
        ],
        home: [
          { day: "Chest & Back A", subtitle: "Chest and Back Superset", exercises: [
            { name: "Push Ups", sets: "3×15", tip: "Straight body line" },
            { name: "Inverted Rows (Table)", sets: "3×12", tip: "Pull chest to table" },
            { name: "Wide Push Ups", sets: "3×12", tip: "Elbows flare" },
            { name: "Towel Row (Door)", sets: "3×12", tip: "Full range" },
            { name: "Decline Push Ups", sets: "3×10", tip: "Feet on chair" }
          ]},
          { day: "Shoulders & Arms A", subtitle: "Delts, Biceps & Triceps", exercises: [
            { name: "Pike Push Ups", sets: "3×12", tip: "Hips high" },
            { name: "Band Lateral Raise", sets: "3×20", tip: "Lead elbows" },
            { name: "Resistance Band Curl", sets: "3×15", tip: "Full ROM" },
            { name: "Tricep Dips (Chair)", sets: "3×15", tip: "Hips close" },
            { name: "Band Face Pulls", sets: "3×20", tip: "High anchor" }
          ]},
          { day: "Legs A", subtitle: "Quads, Hamstrings & Glutes", exercises: [
            { name: "Bodyweight Squats", sets: "4×20", tip: "Chest up" },
            { name: "Reverse Lunges", sets: "3×15", tip: "Upright torso" },
            { name: "Glute Bridge", sets: "4×20", tip: "Squeeze at top" },
            { name: "Wall Sit", sets: "3×30s", tip: "90° at knee" },
            { name: "Calf Raises", sets: "4×20", tip: "Full stretch" }
          ]},
          { day: "Chest & Back B", subtitle: "Chest and Back Volume", exercises: [
            { name: "Incline Push Ups", sets: "3×15", tip: "Hands elevated" },
            { name: "Doorframe Row", sets: "3×12", tip: "Feet forward" },
            { name: "Diamond Push Ups", sets: "3×12", tip: "Elbows back" },
            { name: "Band Lat Pulldown", sets: "3×15", tip: "Overhead anchor" },
            { name: "Push Up to T-Rotation", sets: "3×10", tip: "Rotate at top" }
          ]},
          { day: "Shoulders & Arms B", subtitle: "Delts, Biceps & Triceps Volume", exercises: [
            { name: "Pike Push Ups (Pause)", sets: "3×12", tip: "1-sec at bottom" },
            { name: "Band Front Raise", sets: "3×15", tip: "Arms straight" },
            { name: "Chin-Ups", sets: "3×8", tip: "Supinated grip" },
            { name: "Band Hammer Curl", sets: "3×15", tip: "Neutral wrist" },
            { name: "Close-Grip Push Ups", sets: "3×15", tip: "Tricep dominant" }
          ]},
          { day: "Legs B", subtitle: "Glutes, Hamstrings & Calves", exercises: [
            { name: "Sumo Squats", sets: "4×15", tip: "Wide stance, toes out" },
            { name: "Single-Leg Glute Bridge", sets: "3×15", tip: "Non-working leg up" },
            { name: "Jump Squats", sets: "3×12", tip: "Land softly" },
            { name: "Nordic Curl Negative", sets: "3×5", tip: "5-sec lower" },
            { name: "Standing Calf Raises", sets: "4×20", tip: "Slow eccentric" }
          ]}
        ]
      },
      intermediate: {
        gym: [
          { day: "Chest & Back A", subtitle: "Strength Chest & Back", exercises: [
            { name: "Barbell Bench Press", sets: "4×8", tip: "1-sec pause on chest" },
            { name: "Barbell Row", sets: "4×8", tip: "Row to belly" },
            { name: "Incline Bench Press", sets: "3×10", tip: "Touch chest" },
            { name: "Pull-Ups", sets: "4×8", tip: "Dead hang" },
            { name: "Cable Fly + Pullover (Superset)", sets: "3×12+12", tip: "No rest between" }
          ]},
          { day: "Shoulders & Arms A", subtitle: "Strength Shoulders & Arms", exercises: [
            { name: "Barbell Overhead Press", sets: "4×8", tip: "Press overhead fully" },
            { name: "Lateral Raise (Drop Set)", sets: "3×15+15", tip: "50% drop" },
            { name: "Barbell Curl", sets: "4×10", tip: "Slow negative" },
            { name: "Skull Crushers", sets: "4×10", tip: "Elbows vertical" },
            { name: "Face Pulls", sets: "3×20", tip: "External rotation at end" }
          ]},
          { day: "Legs A", subtitle: "Strength Legs", exercises: [
            { name: "Barbell Squat", sets: "4×8", tip: "Below parallel" },
            { name: "Romanian Deadlift", sets: "4×10", tip: "3-sec eccentric" },
            { name: "Leg Press", sets: "3×12", tip: "High feet for glute" },
            { name: "Leg Curl", sets: "3×15", tip: "Controlled negative" },
            { name: "Standing Calf Raise (Heavy)", sets: "5×15", tip: "Full ROM" }
          ]},
          { day: "Chest & Back B", subtitle: "Volume Chest & Back", exercises: [
            { name: "Dumbbell Bench Press", sets: "4×12", tip: "4-sec eccentric" },
            { name: "Chest-Supported Row", sets: "4×12", tip: "Strict, no body English" },
            { name: "Dumbbell Fly", sets: "3×15", tip: "Wide arc" },
            { name: "Lat Pulldown (Wide)", sets: "3×12", tip: "Lean back slightly" },
            { name: "Pec Deck + Straight-Arm Pulldown", sets: "3×15+15", tip: "Superset" }
          ]},
          { day: "Shoulders & Arms B", subtitle: "Volume Shoulders & Arms", exercises: [
            { name: "Arnold Press", sets: "4×12", tip: "Rotate as you press" },
            { name: "Rear Pec Deck", sets: "4×15", tip: "Rear delt focus" },
            { name: "Incline Dumbbell Curl", sets: "3×12", tip: "Full stretch" },
            { name: "Close-Grip Bench Press", sets: "3×10", tip: "Elbows tucked" },
            { name: "Superset: Cable Curl + Pushdown", sets: "3×12+15", tip: "No rest" }
          ]},
          { day: "Legs B", subtitle: "Volume Legs", exercises: [
            { name: "Hack Squat", sets: "4×10", tip: "Feet high for glute" },
            { name: "Walking Lunges (DB)", sets: "4×14 steps", tip: "Long stride" },
            { name: "Hip Thrust (Barbell)", sets: "4×12", tip: "Chin tucked" },
            { name: "Seated Leg Curl", sets: "4×15", tip: "Full flexion" },
            { name: "Donkey Calf Raises", sets: "4×20", tip: "Full stretch" }
          ]}
        ],
        home: [
          { day: "Chest & Back A", subtitle: "Strength Chest & Back", exercises: [
            { name: "Archer Push Ups", sets: "4×10", tip: "Full weight shift" },
            { name: "Pull-Ups", sets: "4×8", tip: "Dead hang each rep" },
            { name: "Decline Push Ups", sets: "3×15", tip: "Feet elevated" },
            { name: "Australian Rows", sets: "3×12", tip: "Chest to bar" },
            { name: "Chest Dips + Doorframe Row (Superset)", sets: "3×12+12", tip: "No rest" }
          ]},
          { day: "Shoulders & Arms A", subtitle: "Strength Shoulders & Arms", exercises: [
            { name: "Pike Push Ups (Pause)", sets: "4×12", tip: "1-sec at bottom" },
            { name: "Band Lateral Raise", sets: "4×20", tip: "Lead with elbows" },
            { name: "Chin-Ups", sets: "4×10", tip: "Full hang" },
            { name: "Dips (Deep)", sets: "4×12", tip: "Full ROM" },
            { name: "Band Face Pulls", sets: "3×25", tip: "External rotation" }
          ]},
          { day: "Legs A", subtitle: "Strength Legs", exercises: [
            { name: "Bulgarian Split Squat", sets: "4×10", tip: "Deep range" },
            { name: "Nordic Curl Negative", sets: "4×6", tip: "5-sec lower" },
            { name: "Single-Leg Hip Thrust", sets: "4×12", tip: "Drive through heel" },
            { name: "Pistol Squat Progression", sets: "3×8", tip: "Box for depth" },
            { name: "Calf Raises (Single Leg)", sets: "5×20", tip: "Full stretch" }
          ]},
          { day: "Chest & Back B", subtitle: "Volume Chest & Back", exercises: [
            { name: "Wide Push Ups (Slow)", sets: "4×15", tip: "4-sec eccentric" },
            { name: "Wide-Grip Pull-Ups", sets: "4×10", tip: "Full ROM" },
            { name: "Diamond Push Ups", sets: "3×15", tip: "Elbows back" },
            { name: "Resistance Band Row", sets: "3×20", tip: "Band under feet" },
            { name: "Push Up to T + Band Row (Superset)", sets: "3×10+15", tip: "No rest" }
          ]},
          { day: "Shoulders & Arms B", subtitle: "Volume Shoulders & Arms", exercises: [
            { name: "Handstand Hold (Wall)", sets: "4×30s", tip: "Press actively into wall" },
            { name: "Band Rear Delt Fly", sets: "4×20", tip: "Thumbs down" },
            { name: "Band Curl (Drop Set)", sets: "3×20+20", tip: "Lighter band second set" },
            { name: "Close-Grip Push Ups", sets: "3×20", tip: "High volume burnout" },
            { name: "Band Hammer Curl + Tricep Push (Superset)", sets: "3×15+20", tip: "No rest" }
          ]},
          { day: "Legs B", subtitle: "Volume Legs", exercises: [
            { name: "Jump Squats", sets: "4×15", tip: "Soft landing" },
            { name: "Lateral Lunges", sets: "4×12", tip: "Sit into the hip" },
            { name: "Glute Bridge (Banded)", sets: "4×20", tip: "Band above knees" },
            { name: "Hamstring Curl (Band)", sets: "3×15", tip: "Face down on floor" },
            { name: "Calf Raise Burnout", sets: "3×30", tip: "Continuous" }
          ]}
        ]
      },
      professional: {
        gym: [
          { day: "Chest & Back A", subtitle: "Max Strength Chest & Back", exercises: [
            { name: "Heavy Bench Press", sets: "5×5", tip: "85–90% 1RM" },
            { name: "Heavy Barbell Row", sets: "5×5", tip: "Explosive pull" },
            { name: "Weighted Dips (Chest)", sets: "4×8", tip: "Lean forward" },
            { name: "Weighted Pull-Ups", sets: "4×6", tip: "Heavy, dead hang" },
            { name: "Cable Fly + Cable Pullover (Superset)", sets: "3×12+12", tip: "No rest" }
          ]},
          { day: "Shoulders & Arms A", subtitle: "Max Strength Shoulders & Arms", exercises: [
            { name: "Heavy Overhead Press", sets: "5×5", tip: "No layback, brace hard" },
            { name: "Lateral Raises (Myo-Reps)", sets: "3×20+5+5+5", tip: "Rest-pause" },
            { name: "Heavy Barbell Curl", sets: "4×8", tip: "Cheat acceptable" },
            { name: "Skull Crushers + CG Press (Superset)", sets: "4×10+10", tip: "No rest" },
            { name: "Face Pulls (High Volume)", sets: "3×25", tip: "External rotation" }
          ]},
          { day: "Legs A", subtitle: "Max Strength Legs", exercises: [
            { name: "Heavy Squat", sets: "5×5", tip: "90%+ 1RM, spotter" },
            { name: "Deadlift", sets: "5×4", tip: "Full reset each rep" },
            { name: "Leg Press (Heavy)", sets: "4×8", tip: "Deep range" },
            { name: "Hamstring Curl (Drop Set)", sets: "3×12+12", tip: "Max load drop" },
            { name: "Standing Calf Raise (Heavy)", sets: "5×15", tip: "Full ROM" }
          ]},
          { day: "Chest & Back B", subtitle: "Hypertrophy Chest & Back", exercises: [
            { name: "Incline Barbell Press", sets: "4×10", tip: "3-sec eccentric" },
            { name: "Chest-Supported Row", sets: "4×12", tip: "Strict, no momentum" },
            { name: "Cable Cross-Over (Drop Set)", sets: "3×15+15", tip: "50% drop" },
            { name: "Cable Pullover (Myo-Reps)", sets: "3×20+5+5", tip: "Lat stretch" },
            { name: "Pec Deck + Lat Pulldown (Superset)", sets: "3×15+12", tip: "No rest" }
          ]},
          { day: "Shoulders & Arms B", subtitle: "Hypertrophy Shoulders & Arms", exercises: [
            { name: "Arnold Press (Drop Set)", sets: "4×12+8", tip: "Rotate, drop weight" },
            { name: "Rear Pec Deck (Myo-Reps)", sets: "3×20+5+5+5", tip: "Rest-pause" },
            { name: "Preacher Curl (Machine)", sets: "4×12", tip: "Full ROM" },
            { name: "Overhead Tricep Extension (Cable)", sets: "4×12", tip: "Full lockout" },
            { name: "Superset: Cable Curl + Pushdown", sets: "3×15+15", tip: "No rest" }
          ]},
          { day: "Legs B", subtitle: "Hypertrophy Legs", exercises: [
            { name: "Front Squat", sets: "4×8", tip: "Elbows high, upright" },
            { name: "Heavy Walking Lunges (DB)", sets: "4×16 steps", tip: "Long stride" },
            { name: "Seated Leg Curl (Drop Set)", sets: "4×12+12", tip: "Full ROM" },
            { name: "Leg Extension (Myo-Reps)", sets: "3×20+5+5+5", tip: "Quad burn" },
            { name: "Donkey Calf Raises (Heavy)", sets: "5×20", tip: "Full stretch" }
          ]}
        ],
        home: [
          { day: "Chest & Back A", subtitle: "Max Strength Chest & Back", exercises: [
            { name: "Clap Push Ups", sets: "5×15", tip: "Explosive each rep" },
            { name: "Weighted Pull-Ups (Belt)", sets: "5×6", tip: "Dead hang" },
            { name: "Pseudo Planche Push Ups", sets: "4×10", tip: "Lean far forward" },
            { name: "Typewriter Pull-Ups", sets: "4×6", tip: "Side to side at top" },
            { name: "Archer Push Up + L-Sit Pull-Up (Superset)", sets: "3×10+8", tip: "No rest" }
          ]},
          { day: "Shoulders & Arms A", subtitle: "Max Strength Shoulders & Arms", exercises: [
            { name: "Handstand Push Ups", sets: "5×8", tip: "Head touches floor" },
            { name: "Band Lateral Raise (Myo-Reps)", sets: "3×25+5+5+5", tip: "Rest-pause" },
            { name: "Chin-Ups (Weighted)", sets: "4×8", tip: "Slow negative" },
            { name: "Dips (Weighted, Deep)", sets: "4×10", tip: "Full ROM" },
            { name: "Band Curl + Tricep Push (Superset)", sets: "3×20+20", tip: "No rest" }
          ]},
          { day: "Legs A", subtitle: "Max Strength Legs", exercises: [
            { name: "Pistol Squats (Weighted Vest)", sets: "5×8", tip: "Full depth" },
            { name: "Nordic Curls", sets: "5×6", tip: "Full ROM, explosive up" },
            { name: "Shrimp Squats", sets: "4×10", tip: "Rear knee grazes floor" },
            { name: "Jump Squats (Vest)", sets: "4×12", tip: "Max height" },
            { name: "Calf Raise Burnout", sets: "5×25", tip: "Single leg, off step" }
          ]},
          { day: "Chest & Back B", subtitle: "Hypertrophy Chest & Back", exercises: [
            { name: "Decline Push Ups (Slow)", sets: "4×15", tip: "4-sec eccentric" },
            { name: "Wide-Grip Pull-Ups", sets: "4×12", tip: "Full ROM" },
            { name: "Diamond Push Ups (Pause)", sets: "3×15", tip: "1-sec hold" },
            { name: "Band Pullover", sets: "3×20", tip: "Overhead anchor" },
            { name: "Wide Push Up + Band Row (Superset)", sets: "3×15+20", tip: "No rest" }
          ]},
          { day: "Shoulders & Arms B", subtitle: "Hypertrophy Shoulders & Arms", exercises: [
            { name: "Pike Push Ups (Weighted)", sets: "4×12", tip: "Vest or plate on back" },
            { name: "Band Rear Delt Fly (Drop Set)", sets: "3×25+25", tip: "Lighter band" },
            { name: "Band Curl (Slow Eccentric)", sets: "4×15", tip: "5-sec lower" },
            { name: "Close-Grip Push Ups (Pause)", sets: "3×20", tip: "1-sec hold" },
            { name: "Zottman Curl + Diamond Push Up (Superset)", sets: "3×15+15", tip: "No rest" }
          ]},
          { day: "Legs B", subtitle: "Hypertrophy Legs", exercises: [
            { name: "Bulgarian Split Squat (Jump)", sets: "4×12", tip: "Explosive drive" },
            { name: "Lateral Lunge to Curtsy", sets: "4×12", tip: "Controlled flow" },
            { name: "Single-Leg RDL", sets: "4×10", tip: "Hamstring stretch" },
            { name: "Glute Bridge Burnout (Banded)", sets: "3×30", tip: "Non-stop" },
            { name: "Calf Raise Burnout", sets: "5×30", tip: "Fast pace, single leg" }
          ]}
        ]
      }
    }
  }
};

// ============================================================
// COACH TIP MAP (per split)
// ============================================================

const SPLIT_META = {
  fullbody: {
    daysPerWeek: 3,
    intensity: "Medium",
    weeklyEx: 15
  },
  pushpulllegs: {
    daysPerWeek: 6,
    intensity: "High",
    weeklyEx: 30
  },
  upperlower: {
    daysPerWeek: 4,
    intensity: "Medium",
    weeklyEx: 20
  },
  brosplit: {
    daysPerWeek: 5,
    intensity: "High",
    weeklyEx: 25
  },
  arnoldsplit: {
    daysPerWeek: 6,
    intensity: "Very High",
    weeklyEx: 30
  }
};

// ============================================================
// DASHBOARD STATE
// ============================================================

let userData = null;
let currentDayIndex = 0;
let currentSplitKey = null;

// ============================================================
// INIT
// ============================================================

if (!token) window.location.replace("login.html");

document.getElementById("logoutBtn")?.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.replace("/");
});

async function init() {
  const res = await fetch("/api/users/me", {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (handleUnauthorized(res)) return;
  if (!res.ok) return window.location.replace("login.html");

  const user = await res.json();

  if (!user.name || !user.gender || !user.age || !user.weight ||
    !user.height || !user.level || !user.style || !user.trainingType) {
    return window.location.replace("onboarding.html");
  }

  userData = user;

  // Navbar
  const navAvatar = document.getElementById("navAvatar");
  const navName = document.getElementById("navName");
  if (navAvatar) navAvatar.src = user.profilePic || "/images/default-avatar.svg";
  if (navName) navName.innerText = user.name;

  document.getElementById("navbar").style.display = "";
  document.getElementById("mainContent").style.display = "";

  renderHeader(user);
  renderPlan(user);
  fetchWorkouts();
  fetchStats();
}

init();

// ============================================================
// RENDER HEADER
// ============================================================

async function renderHeader(user) {
  // Username (first letter or name)
  document.getElementById("dashUsername").innerText = user.name || "A";

  // Split badge
  const splitKey = normalizeSplitKey(user.style);
  currentSplitKey = splitKey;
  const split = SPLITS[splitKey];
  document.getElementById("splitBadge").innerText = split ? split.label : user.style;

  // Level & Training badges
  const levelLabels = { beginner: "Beginner", intermediate: "Intermediate", professional: "Pro" };
  const trainingLabels = { gym: "Gym", home: "Home" };
  const lvl = (user.level || "beginner").toLowerCase();
  const trn = (user.trainingType || "gym").toLowerCase();
  const levelBadgeEl = document.getElementById("levelBadge");
  const trainingBadgeEl = document.getElementById("trainingBadge");
  if (levelBadgeEl) levelBadgeEl.innerText = levelLabels[lvl] || lvl;
  if (trainingBadgeEl) trainingBadgeEl.innerText = trainingLabels[trn] || trn;

  // BMI
  try {
    const res = await fetch("/api/users/bmi", {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      const data = await res.json();
      document.getElementById("dashBmi").innerText = data.bmi;
      const catEl = document.getElementById("dashBmiCat");
      catEl.innerText = data.category;
      const cat = (data.category || "").toLowerCase();
      catEl.className = "bmi-cat";
      if (cat.includes("normal")) catEl.classList.add("normal");
      else if (cat.includes("overweight")) catEl.classList.add("overweight");
    }
  } catch (e) {}

  // Stat cards
  if (split) {
    const meta = SPLIT_META[splitKey] || {};
    const daysPerWeek = meta.daysPerWeek || 3;
    const intensity = split.intensity || "Medium";
    const weeklyEx = meta.weeklyEx || 15;

    document.getElementById("statDays").innerText = daysPerWeek;
    document.getElementById("statExercises").innerText = weeklyEx;
    document.getElementById("statIntensity").innerText = intensity;

    // Days bar
    const daysBar = document.getElementById("statDaysBar");
    daysBar.innerHTML = "";
    for (let i = 0; i < 7; i++) {
      const seg = document.createElement("div");
      seg.className = "stat-bar-seg" + (i < daysPerWeek ? " filled" : "");
      daysBar.appendChild(seg);
    }

    // Exercises bar (out of 30 max)
    const exBar = document.getElementById("statExBar");
    exBar.innerHTML = "";
    const exSegs = Math.ceil(weeklyEx / 5);
    for (let i = 0; i < 6; i++) {
      const seg = document.createElement("div");
      seg.className = "stat-bar-seg" + (i < exSegs ? " filled" : "");
      exBar.appendChild(seg);
    }

    // Intensity bar
    const intBar = document.getElementById("statIntBar");
    intBar.innerHTML = "";
    const intMap = { "Low": 1, "Medium": 2, "Medium-High": 3, "High": 4, "Very High": 5 };
    const intLevel = intMap[intensity] || 2;
    for (let i = 0; i < 5; i++) {
      const seg = document.createElement("div");
      seg.className = "stat-bar-seg" + (i < intLevel ? " filled-dim" : "");
      intBar.appendChild(seg);
    }
  }
}

// ============================================================
// RENDER PLAN
// ============================================================

function normalizeSplitKey(style) {
  if (!style) return "fullbody";
  const s = style.toLowerCase().replace(/[\s\/\-]/g, "");
  if (s.includes("pushpull") || s.includes("ppl")) return "pushpulllegs";
  if (s.includes("upper") || s.includes("lower")) return "upperlower";
  if (s.includes("bro")) return "brosplit";
  if (s.includes("arnold")) return "arnoldsplit";
  return "fullbody";
}

function renderPlan(user) {
  const splitKey = normalizeSplitKey(user.style);
  currentSplitKey = splitKey;
  const split = SPLITS[splitKey];
  if (!split) return;

  const level = (user.level || "beginner").toLowerCase();
  const trainingType = (user.trainingType || "gym").toLowerCase();
  const planLevel = split.plans[level] || split.plans.beginner;
  const planType = planLevel[trainingType] || planLevel.gym || planLevel.home;

  if (!planType) return;

  // Build day tabs
  const tabsEl = document.getElementById("dayTabs");
  tabsEl.innerHTML = "";
  split.days.forEach((dayName, idx) => {
    const isRest = split.dayTypes[idx] === "rest";
    const btn = document.createElement("button");
    btn.className = "day-tab" + (idx === 0 ? " active" : "");
    btn.innerText = isRest ? "Rest" : dayName;
    btn.addEventListener("click", () => {
      document.querySelectorAll(".day-tab").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentDayIndex = idx;
      if (isRest) {
        renderRestDay();
      } else {
        const workDayIdx = split.days.slice(0, idx).filter((_, i) => split.dayTypes[i] !== "rest").length;
        renderDay(planType[workDayIdx] || planType[0], split, level, splitKey);
      }
    });
    tabsEl.appendChild(btn);
  });

  // Render first day
  renderDay(planType[0], split, level, splitKey);
}

function renderDay(dayPlan, split, level, splitKey) {
  if (!dayPlan) return;

  document.getElementById("dayTitle").innerText = dayPlan.day;
  document.getElementById("daySubtitle").innerText = dayPlan.subtitle || "";
  document.getElementById("exCountBadge").innerText = `${dayPlan.exercises.length} Exercises`;

  const listEl = document.getElementById("exerciseList");
  listEl.innerHTML = "";

  dayPlan.exercises.forEach((ex, i) => {
    const item = document.createElement("div");
    item.className = "exercise-item";
    item.innerHTML = `
      <div class="ex-num">${i + 1}</div>
      <div class="ex-info">
        <div class="ex-name">${ex.name}</div>
        <div class="ex-detail">${ex.tip}</div>
      </div>
      <span class="ex-sets">${ex.sets}</span>
      <span class="ex-arrow">›</span>
    `;
    listEl.appendChild(item);
  });

  // Coach tip
  const tip = SPLITS[splitKey].coachTip[level];
  if (tip) {
    document.getElementById("coachSection").style.display = "flex";
    document.getElementById("coachText").innerText = tip;
  }
}

function renderRestDay() {
  document.getElementById("dayTitle").innerText = "Rest Day";
  document.getElementById("daySubtitle").innerText = "Recovery is part of the program";
  document.getElementById("exCountBadge").innerText = "0 Exercises";
  document.getElementById("exerciseList").innerHTML = `
    <div class="empty-state" style="padding:40px 0">
      🛌 Today is a rest day. Prioritise sleep, hydration, and light walking.<br>
      <span style="font-size:0.75rem;margin-top:8px;display:block">Your muscles grow when you recover.</span>
    </div>
  `;
  document.getElementById("coachSection").style.display = "none";
}

// ============================================================
// SPLIT SELECTOR MODAL
// ============================================================

const splitModal = document.getElementById("splitModal");
const splitList = document.getElementById("splitList");

document.getElementById("openSplitModal")?.addEventListener("click", () => {
  renderSplitList();
  splitModal.classList.add("open");
});

document.getElementById("closeSplitModal")?.addEventListener("click", () => {
  splitModal.classList.remove("open");
});

splitModal?.addEventListener("click", (e) => {
  if (e.target === splitModal) splitModal.classList.remove("open");
});

function renderSplitList() {
  splitList.innerHTML = "";
  Object.entries(SPLITS).forEach(([key, split]) => {
    const div = document.createElement("div");
    div.className = "split-option" + (key === currentSplitKey ? " selected" : "");
    div.innerHTML = `
      <div>
        <div class="split-option-name">${split.label}</div>
        <div class="split-option-sub">${split.sub}</div>
      </div>
      <span class="split-option-icon">${split.icon}</span>
    `;
    div.addEventListener("click", async () => {
      document.querySelectorAll(".split-option").forEach(o => o.classList.remove("selected"));
      div.classList.add("selected");
      // Persist split to DB
      const splitRes = await fetch("/api/users/set-style", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ style: key })
      });
      if (handleUnauthorized(splitRes)) return;
      userData.style = key;
      currentSplitKey = key;
      document.getElementById("splitBadge").innerText = split.label;
      renderPlan(userData);
      renderHeader(userData);
      setTimeout(() => splitModal.classList.remove("open"), 400);
    });
    splitList.appendChild(div);
  });
}

// ============================================================
// WORKOUT LOG FORM
// ============================================================

const workoutForm = document.getElementById("workoutForm");
const workoutList = document.getElementById("workoutList");
const workoutCount = document.getElementById("workoutCount");

async function fetchStats() {
  const res = await fetch("/api/workouts/stats", {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (handleUnauthorized(res)) return;
  const data = await res.json();
  workoutCount.innerText = data.totalWorkouts || 0;
}

async function fetchWorkouts() {
  const res = await fetch("/api/workouts", {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (handleUnauthorized(res)) return;
  const workouts = await res.json();
  workoutList.innerHTML = "";

  if (!workouts.length) {
    workoutList.innerHTML = '<div class="empty-state">No workouts logged yet. Start tracking above! 💪</div>';
    return;
  }

  workouts.forEach(w => {
    const div = document.createElement("div");
    div.className = "logged-item";
    div.innerHTML = `
      <div>
        <div class="logged-item-name">${w.exercise}</div>
        <div class="logged-item-detail">${w.sets} sets × ${w.reps} reps</div>
      </div>
      <button class="btn-delete" onclick="deleteWorkout('${w._id}')">Delete</button>
    `;
    workoutList.appendChild(div);
  });
}

workoutForm?.addEventListener("submit", async e => {
  e.preventDefault();

  const exerciseVal = document.getElementById("exercise").value.trim();
  const setsVal = document.getElementById("sets").value;
  const repsVal = document.getElementById("reps").value;

  if (!exerciseVal) return showToast("Please enter an exercise name", "warning");

  const res = await fetch("/api/workouts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      exercise: exerciseVal,
      sets: Number(setsVal),
      reps: Number(repsVal)
    })
  });

  if (handleUnauthorized(res)) return;

  if (res.ok) {
    showToast("Workout logged! 💪", "success");
    workoutForm.reset();
    fetchWorkouts();
    fetchStats();
  } else {
    showToast("Failed to save workout", "error");
  }
});

window.deleteWorkout = async id => {
  const res = await fetch(`/api/workouts/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
  if (handleUnauthorized(res)) return;
  if (res.ok) {
    showToast("Workout deleted", "info");
    fetchWorkouts();
    fetchStats();
  }
};

// ============================================================
// FLOATING BUTTON — scroll to log section
// ============================================================

document.getElementById("scrollLogBtn")?.addEventListener("click", () => {
  document.querySelector(".log-section")?.scrollIntoView({ behavior: "smooth" });
});

// ============================================================
// PREFERENCES MODAL  (Level + Training Type)
// ============================================================

const prefsModal = document.getElementById("prefsModal");

document.getElementById("openPrefsModal")?.addEventListener("click", () => {
  renderPrefSelections();
  prefsModal.classList.add("open");
});

document.getElementById("closePrefsModal")?.addEventListener("click", () => {
  prefsModal.classList.remove("open");
});

prefsModal?.addEventListener("click", (e) => {
  if (e.target === prefsModal) prefsModal.classList.remove("open");
});

function renderPrefSelections() {
  const currentLevel    = (userData.level        || "beginner").toLowerCase();
  const currentTraining = (userData.trainingType  || "gym").toLowerCase();

  document.querySelectorAll("#levelList .pref-option").forEach(el => {
    el.classList.toggle("selected", el.dataset.level === currentLevel);
  });

  document.querySelectorAll("#trainingList .pref-option").forEach(el => {
    el.classList.toggle("selected", el.dataset.training === currentTraining);
  });
}

// Level option click
document.querySelectorAll("#levelList .pref-option").forEach(el => {
  el.addEventListener("click", async () => {
    const newLevel = el.dataset.level;
    if (newLevel === (userData.level || "beginner").toLowerCase()) return;

    const res = await fetch("/api/users/set-level", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ level: newLevel })
    });
    if (handleUnauthorized(res)) return;

    userData.level = newLevel;
    renderPrefSelections();
    renderPlan(userData);
    renderHeader(userData);
    const label = newLevel.charAt(0).toUpperCase() + newLevel.slice(1);
    showToast("Level updated to " + label + " - plan refreshed!", "success");
  });
});

// Training type option click
document.querySelectorAll("#trainingList .pref-option").forEach(el => {
  el.addEventListener("click", async () => {
    const newTraining = el.dataset.training;
    if (newTraining === (userData.trainingType || "gym").toLowerCase()) return;

    const res = await fetch("/api/users/set-training", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ trainingType: newTraining })
    });
    if (handleUnauthorized(res)) return;

    userData.trainingType = newTraining;
    renderPrefSelections();
    renderPlan(userData);
    renderHeader(userData);
    const label = newTraining === "gym" ? "Gym" : "Home";
    showToast("Training location set to " + label + " - plan refreshed!", "success");
  });
});