const express = require("express");
const {
  getMyMentorProfile,
  updateMyMentorProfile,
  getApprovedMentors,
  getMentorById,
} = require("../controllers/mentorController");
const { protect } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/my-profile", protect, allowRoles("mentor"), getMyMentorProfile);
router.put("/my-profile", protect, allowRoles("mentor"), updateMyMentorProfile);
router.get("/", getApprovedMentors);
router.get("/:id", getMentorById);

module.exports = router;