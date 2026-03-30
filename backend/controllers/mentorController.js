const MentorProfile = require("../models/MentorProfile");
const User = require("../models/User");

const getMyMentorProfile = async (req, res) => {
  try {
    let profile = await MentorProfile.findOne({ userId: req.user._id });

    if (!profile) {
      profile = await MentorProfile.create({
        userId: req.user._id,
      });
    }

    return res.status(200).json(profile);
  } catch (error) {
    console.log("Get mentor profile error:", error);
    return res.status(500).json({ message: error.message });
  }
};

const updateMyMentorProfile = async (req, res) => {
  try {
    const {
      headline,
      bio,
      skills,
      experience,
      education,
      availability,
      hourlyRate,
    } = req.body;

    let profile = await MentorProfile.findOne({ userId: req.user._id });

    if (!profile) {
      profile = new MentorProfile({
        userId: req.user._id,
      });
    }

    profile.headline = headline || "";
    profile.bio = bio || "";
    profile.skills = Array.isArray(skills)
      ? skills
      : typeof skills === "string" && skills.trim() !== ""
      ? skills.split(",").map((item) => item.trim())
      : [];
    profile.experience = experience || "";
    profile.education = education || "";
    profile.availability = availability || "";
    profile.hourlyRate = Number(hourlyRate) || 0;

    await profile.save();

    return res.status(200).json(profile);
  } catch (error) {
    console.log("Update mentor profile error:", error);
    return res.status(500).json({ message: error.message });
  }
};

const getApprovedMentors = async (req, res) => {
  try {
    const approvedMentors = await User.find({
      role: "mentor",
      isApproved: true,
    }).select("-password");

    const mentorsWithProfiles = await Promise.all(
      approvedMentors.map(async (mentor) => {
        const profile = await MentorProfile.findOne({ userId: mentor._id });

        return {
          _id: mentor._id,
          name: mentor.name,
          email: mentor.email,
          role: mentor.role,
          profilePic: mentor.profilePic,
          isApproved: mentor.isApproved,
          profile: profile || null,
        };
      })
    );

    return res.status(200).json(mentorsWithProfiles);
  } catch (error) {
    console.log("Get approved mentors error:", error);
    return res.status(500).json({ message: error.message });
  }
};

const getMentorById = async (req, res) => {
  try {
    const mentor = await User.findOne({
      _id: req.params.id,
      role: "mentor",
      isApproved: true,
    }).select("-password");

    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }

    const profile = await MentorProfile.findOne({ userId: mentor._id });

    return res.status(200).json({
      _id: mentor._id,
      name: mentor.name,
      email: mentor.email,
      role: mentor.role,
      profilePic: mentor.profilePic,
      isApproved: mentor.isApproved,
      profile: profile || null,
    });
  } catch (error) {
    console.log("Get mentor by id error:", error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMyMentorProfile,
  updateMyMentorProfile,
  getApprovedMentors,
  getMentorById,
};