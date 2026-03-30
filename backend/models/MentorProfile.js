const mongoose = require("mongoose");

const mentorProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    headline: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    skills: {
      type: [String],
      default: [],
    },
    experience: {
      type: String,
      default: "",
    },
    education: {
      type: String,
      default: "",
    },
    availability: {
      type: String,
      default: "",
    },
    hourlyRate: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("MentorProfile", mentorProfileSchema);