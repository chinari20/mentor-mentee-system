const mongoose = require("mongoose");

const menteeProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    interests: {
      type: [String],
      default: [],
    },
    learningGoals: {
      type: String,
      default: "",
    },
    education: {
      type: String,
      default: "",
    },
    about: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("MenteeProfile", menteeProfileSchema);