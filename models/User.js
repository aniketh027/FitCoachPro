const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,

  gender: {
    type: String,
    enum: ["male", "female", "other"]
  },

  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },

  password: String,

  age:    { type: Number },
  weight: { type: Number },
  height: { type: Number },

  level: {
    type: String,
    enum: ["beginner", "intermediate", "professional"]
  },

  style: String,
  trainingType: String,

  // Default avatar for all new users
  profilePic: {
    type: String,
    default: "/images/default-avatar.svg"
  },

  resetToken:       { type: String, default: null },
  resetTokenExpiry: { type: Date,   default: null }
});

module.exports = mongoose.model("User", userSchema);
