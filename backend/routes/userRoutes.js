const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getStaffs,
  getAdmin,
  getStaff,
} = require("../controllers/userController");
const auth = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getstaffs", auth.adminGuard, getStaffs);
router.get("/admin", auth.adminGuard, getAdmin);
router.get("/staff", auth.userGuard, getStaff);

module.exports = router;
