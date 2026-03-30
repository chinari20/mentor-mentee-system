const express = require("express");
const {
  createRequest,
  getMyMenteeRequests,
  getMyMentorRequests,
  updateRequestStatus,
} = require("../controllers/requestController");
const { protect } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/", protect, allowRoles("mentee"), createRequest);
router.get("/my-mentee-requests", protect, allowRoles("mentee"), getMyMenteeRequests);
router.get("/my-mentor-requests", protect, allowRoles("mentor"), getMyMentorRequests);
router.put("/:id/status", protect, allowRoles("mentor"), updateRequestStatus);

module.exports = router;