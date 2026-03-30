const Session = require("../models/Session");
const MentorshipRequest = require("../models/MentorshipRequest");

const createSession = async (req, res) => {
  try {
    const { requestId, date, startTime, endTime, mode, meetingLink, note } =
      req.body;

    if (!requestId || !date || !startTime || !endTime) {
      return res.status(400).json({
        message: "Request ID, date, start time and end time are required",
      });
    }

    const request = await MentorshipRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Mentorship request not found" });
    }

    if (request.menteeId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (request.status !== "accepted") {
      return res.status(400).json({
        message: "You can book a session only after mentor accepts the request",
      });
    }

    const existingSession = await Session.findOne({ requestId });

    if (existingSession) {
      return res.status(400).json({
        message: "Session already booked for this mentorship request",
      });
    }

    const session = await Session.create({
      mentorId: request.mentorId,
      menteeId: request.menteeId,
      requestId: request._id,
      date,
      startTime,
      endTime,
      mode: mode || "online",
      meetingLink: meetingLink || "",
      note: note || "",
      status: "scheduled",
    });

    return res.status(201).json({
      message: "Session booked successfully",
      session,
    });
  } catch (error) {
    console.log("Create session error:", error);
    return res.status(500).json({ message: error.message });
  }
};

const getMyMenteeSessions = async (req, res) => {
  try {
    const sessions = await Session.find({
      menteeId: req.user._id,
    })
      .populate("mentorId", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json(sessions);
  } catch (error) {
    console.log("Get mentee sessions error:", error);
    return res.status(500).json({ message: error.message });
  }
};

const getMyMentorSessions = async (req, res) => {
  try {
    const sessions = await Session.find({
      mentorId: req.user._id,
    })
      .populate("menteeId", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json(sessions);
  } catch (error) {
    console.log("Get mentor sessions error:", error);
    return res.status(500).json({ message: error.message });
  }
};

const updateSessionStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["scheduled", "completed", "cancelled"].includes(status)) {
      return res.status(400).json({
        message: "Status must be scheduled, completed, or cancelled",
      });
    }

    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    const isMentor = session.mentorId.toString() === req.user._id.toString();
    const isMentee = session.menteeId.toString() === req.user._id.toString();

    if (!isMentor && !isMentee) {
      return res.status(403).json({ message: "Not authorized" });
    }

    session.status = status;
    await session.save();

    return res.status(200).json({
      message: "Session status updated successfully",
      session,
    });
  } catch (error) {
    console.log("Update session status error:", error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createSession,
  getMyMenteeSessions,
  getMyMentorSessions,
  updateSessionStatus,
};