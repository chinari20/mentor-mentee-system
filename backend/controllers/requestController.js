const MentorshipRequest = require("../models/MentorshipRequest");
const User = require("../models/User");

const createRequest = async (req, res) => {
  try {
    const { mentorId, message } = req.body;

    if (!mentorId) {
      return res.status(400).json({ message: "Mentor ID is required" });
    }

    const mentor = await User.findOne({
      _id: mentorId,
      role: "mentor",
      isApproved: true,
    });

    if (!mentor) {
      return res.status(404).json({ message: "Approved mentor not found" });
    }

    const existingRequest = await MentorshipRequest.findOne({
      mentorId,
      menteeId: req.user._id,
    });

    if (existingRequest) {
      return res
        .status(400)
        .json({ message: "You already sent a request to this mentor" });
    }

    const newRequest = await MentorshipRequest.create({
      mentorId,
      menteeId: req.user._id,
      message: message || "",
      status: "pending",
    });

    return res.status(201).json({
      message: "Mentorship request sent successfully",
      request: newRequest,
    });
  } catch (error) {
    console.log("Create request error:", error);
    return res.status(500).json({ message: error.message });
  }
};

const getMyMenteeRequests = async (req, res) => {
  try {
    const requests = await MentorshipRequest.find({
      menteeId: req.user._id,
    })
      .populate("mentorId", "name email role isApproved")
      .sort({ createdAt: -1 });

    return res.status(200).json(requests);
  } catch (error) {
    console.log("Get mentee requests error:", error);
    return res.status(500).json({ message: error.message });
  }
};

const getMyMentorRequests = async (req, res) => {
  try {
    const requests = await MentorshipRequest.find({
      mentorId: req.user._id,
    })
      .populate("menteeId", "name email role")
      .sort({ createdAt: -1 });

    return res.status(200).json(requests);
  } catch (error) {
    console.log("Get mentor requests error:", error);
    return res.status(500).json({ message: error.message });
  }
};

const updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["accepted", "rejected"].includes(status)) {
      return res
        .status(400)
        .json({ message: "Status must be accepted or rejected" });
    }

    const request = await MentorshipRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.mentorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    request.status = status;
    await request.save();

    return res.status(200).json({
      message: `Request ${status} successfully`,
      request,
    });
  } catch (error) {
    console.log("Update request status error:", error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createRequest,
  getMyMenteeRequests,
  getMyMentorRequests,
  updateRequestStatus,
};