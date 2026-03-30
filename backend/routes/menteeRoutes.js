const express = require("express");
const {
  getMyMenteeProfile,
  updateMyMenteeProfile,
} = require("../controllers/menteeController");
const { protect } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/my-profile", protect, allowRoles("mentee"), getMyMenteeProfile);
router.put("/my-profile", protect, allowRoles("mentee"), updateMyMenteeProfile);

module.exports = router;