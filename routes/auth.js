const express   = require("express");
const router    = express.Router();
const bcrypt    = require("bcryptjs");
const jwt       = require("jsonwebtoken");
const crypto    = require("crypto");
const nodemailer = require("nodemailer");
const User      = require("../models/User");

// ───── REGISTER ─────
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    user = new User({ email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = { userId: user.id };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// ───── LOGIN ─────
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User does not exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

    const payload = { userId: user.id };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// ───── FORGOT PASSWORD ─────
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.json({ msg: "If that email exists, a reset link has been sent." });

    const token  = crypto.randomBytes(32).toString("hex");
    const expiry = Date.now() + 1000 * 60 * 30;

    user.resetToken       = token;
    user.resetTokenExpiry = expiry;
    await user.save();

    // Check env vars before trying to send
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("EMAIL_USER or EMAIL_PASS missing in .env");
      return res.status(500).json({ msg: "Email service not configured. Contact support." });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const resetLink = `http://localhost:${process.env.PORT || 3000}/reset-password.html?token=${token}`;

    await transporter.sendMail({
      from:    `"FitCoach Pro" <${process.env.EMAIL_USER}>`,
      to:      user.email,
      subject: "Reset your FitCoach Pro password",
      html: `
        <h2>Password Reset</h2>
        <p>Click the link below to reset your password. This link expires in 30 minutes.</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>If you didn't request this, ignore this email.</p>
      `
    });

    res.json({ msg: "If that email exists, a reset link has been sent." });

  } catch (err) {
    console.error("Forgot password error:", err.message);
    res.status(500).json({ msg: "Failed to send email. Please try again later." });
  }
});

// ───── RESET PASSWORD ─────
// Validates the token and sets the new password
router.post("/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ msg: "Token and new password are required" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ msg: "Password must be at least 6 characters" });
    }

    const user = await User.findOne({
      resetToken:       token,
      resetTokenExpiry: { $gt: Date.now() }  // token must not be expired
    });

    if (!user) return res.status(400).json({ msg: "Invalid or expired reset link" });

    const salt = await bcrypt.genSalt(10);
    user.password         = await bcrypt.hash(newPassword, salt);
    user.resetToken       = null;
    user.resetTokenExpiry = null;
    await user.save();

    res.json({ msg: "Password reset successful. You can now log in." });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;