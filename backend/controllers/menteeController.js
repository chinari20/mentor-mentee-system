const MenteeProfile = require("../models/MenteeProfile");

const getMyMenteeProfile = async (req, res) => {
  try {
    let profile = await MenteeProfile.findOne({ userId: req.user._id });

    if (!profile) {
      profile = await MenteeProfile.create({
        userId: req.user._id,
      });
    }

    return res.status(200).json(profile);
  } catch (error) {
    console.log("Get mentee profile error:", error);
    return res.status(500).json({ message: error.message });
  }
};

const updateMyMenteeProfile = async (req, res) => {
  try {
    const { interests, learningGoals, education, about } = req.body;

    let profile = await MenteeProfile.findOne({ userId: req.user._id });

    if (!profile) {
      profile = new MenteeProfile({
        userId: req.user._id,
      });
    }

    profile.interests = Array.isArray(interests)
      ? interests
      : typeof interests === "string" && interests.trim() !== ""
      ? interests.split(",").map((item) => item.trim())
      : [];
    profile.learningGoals = learningGoals || "";
    profile.education = education || "";
    profile.about = about || "";

    await profile.save();

    return res.status(200).json(profile);
  } catch (error) {
    console.log("Update mentee profile error:", error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMyMenteeProfile,
  updateMyMenteeProfile,
};