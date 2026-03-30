const express = require("express");
const {
  createSession,
  getMyMenteeSessions,
  getMyMentorSessions,
  updateSessionStatus,
} = require("../controllers/sessionController");
const { protect } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/", protect, allowRoles("mentee"), createSession);
router.get("/my-mentee-sessions", protect, allowRoles("mentee"), getMyMenteeSessions);
router.get("/my-mentor-sessions", protect, allowRoles("mentor"), getMyMentorSessions);
router.put("/:id/status", protect, updateSessionStatus);

module.exports = router;