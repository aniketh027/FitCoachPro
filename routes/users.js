const express  = require("express");
const router   = express.Router();
const User     = require("../models/User");
const auth     = require("../middleware/auth");
const bcrypt   = require("bcryptjs");
const multer   = require("multer");
const path     = require("path");
const fs       = require("fs");

// ───── MULTER SETUP (profile pictures) ─────
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "public/uploads";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    // filename: userId_timestamp.ext
    const ext = path.extname(file.originalname);
    cb(null, `${req.user.userId}_${Date.now()}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/webp"];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Only JPEG, PNG and WEBP images are allowed"), false);
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 2 * 1024 * 1024 } }); // 2MB max


// ───── GET CURRENT USER ─────
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password -resetToken -resetTokenExpiry");
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ───── UPDATE PROFILE ─────
router.post("/update-profile", auth, async (req, res) => {
  try {
    const { name, gender, age, weight, height } = req.body;

    await User.findByIdAndUpdate(req.user.userId, {
      name,
      gender,
      age:    Number(age),
      weight: Number(weight),
      height: Number(height)
    });

    res.json({ msg: "Profile saved" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ───── UPLOAD PROFILE PICTURE ─────
router.post("/upload-pic", auth, upload.single("profilePic"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: "No file uploaded" });

    // Delete old picture if it exists
    const user = await User.findById(req.user.userId);
    if (user.profilePic) {
      const oldPath = path.join(__dirname, "..", user.profilePic);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    const picPath = `/uploads/${req.file.filename}`;
    await User.findByIdAndUpdate(req.user.userId, { profilePic: picPath });

    res.json({ msg: "Profile picture updated", profilePic: picPath });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ───── BMI CALCULATOR ─────
// Returns bmi value + category based on stored height & weight
router.get("/bmi", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user.weight || !user.height) {
      return res.status(400).json({ msg: "Weight and height must be set in your profile first" });
    }

    const heightInMeters = user.height / 100;
    const bmi = (user.weight / (heightInMeters * heightInMeters)).toFixed(1);

    let category;
    if      (bmi < 18.5) category = "Underweight";
    else if (bmi < 25)   category = "Normal weight";
    else if (bmi < 30)   category = "Overweight";
    else                 category = "Obese";

    res.json({ bmi: Number(bmi), category });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ───── CHANGE PASSWORD ─────
router.post("/change-password", auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ msg: "Both fields are required" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ msg: "New password must be at least 6 characters" });
    }

    const user = await User.findById(req.user.userId);

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Current password is incorrect" });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ msg: "Password changed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ───── SET LEVEL / STYLE / TRAINING ─────
router.post("/set-level", auth, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.userId, { level: req.body.level });
    res.json({ msg: "Level saved" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

router.post("/set-style", auth, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.userId, { style: req.body.style });
    res.json({ msg: "Style saved" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

router.post("/set-training", auth, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.userId, { trainingType: req.body.trainingType });
    res.json({ msg: "Training saved" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;