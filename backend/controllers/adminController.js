const User = require("../models/User");
const MentorProfile = require("../models/MentorProfile");
const MenteeProfile = require("../models/MenteeProfile");

const getAdminDashboardData = async (req, res) => {
  try {
    const users = await User.find({}).select("-password").sort({ createdAt: -1 });

    const mentors = await User.find({ role: "mentor" })
      .select("-password")
      .sort({ createdAt: -1 });

    const mentees = await User.find({ role: "mentee" })
      .select("-password")
      .sort({ createdAt: -1 });

    const pendingMentors = await User.find({
      role: "mentor",
      isApproved: false,
    })
      .select("-password")
      .sort({ createdAt: -1 });

    const approvedMentors = await User.find({
      role: "mentor",
      isApproved: true,
    })
      .select("-password")
      .sort({ createdAt: -1 });

    const mentorsWithProfiles = await Promise.all(
      mentors.map(async (mentor) => {
        const profile = await MentorProfile.findOne({ userId: mentor._id });

        return {
          ...mentor.toObject(),
          profile: profile || null,
        };
      })
    );

    const menteesWithProfiles = await Promise.all(
      mentees.map(async (mentee) => {
        const profile = await MenteeProfile.findOne({ userId: mentee._id });

        return {
          ...mentee.toObject(),
          profile: profile || null,
        };
      })
    );

    return res.status(200).json({
      counts: {
        totalUsers: users.length,
        totalMentors: mentors.length,
        totalMentees: mentees.length,
        pendingMentors: pendingMentors.length,
        approvedMentors: approvedMentors.length,
      },
      users,
      mentors: mentorsWithProfiles,
      mentees: menteesWithProfiles,
      pendingMentors,
      approvedMentors,
    });
  } catch (error) {
    console.log("Get admin dashboard data error:", error);
    return res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password").sort({ createdAt: -1 });
    return res.status(200).json(users);
  } catch (error) {
    console.log("Get all users error:", error);
    return res.status(500).json({ message: error.message });
  }
};

const approveMentor = async (req, res) => {
  try {
    const mentor = await User.findById(req.params.id);

    if (!mentor) {
      return res.status(404).json({ message: "User not found" });
    }

    if (mentor.role !== "mentor") {
      return res.status(400).json({
        message: "Only mentor accounts can be approved",
      });
    }

    mentor.isApproved = true;
    await mentor.save();

    return res.status(200).json({
      message: "Mentor approved successfully",
      user: {
        _id: mentor._id,
        name: mentor.name,
        email: mentor.email,
        role: mentor.role,
        isApproved: mentor.isApproved,
      },
    });
  } catch (error) {
    console.log("Approve mentor error:", error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAdminDashboardData,
  getAllUsers,
  approveMentor,
};