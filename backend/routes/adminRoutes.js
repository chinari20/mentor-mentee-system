const express = require("express");
const {
  getAdminDashboardData,
  getAllUsers,
  approveMentor,
} = require("../controllers/adminController");
const { protect } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/dashboard", protect, allowRoles("admin"), getAdminDashboardData);
router.get("/users", protect, allowRoles("admin"), getAllUsers);
router.put("/mentor/:id/approve", protect, allowRoles("admin"), approveMentor);

module.exports = router;