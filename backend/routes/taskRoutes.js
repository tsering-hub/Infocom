const express = require("express");
const router = new express.Router();
const auth = require("../middleware/authMiddleware");
const {
  addTask,
  getByAdmin,
  getByStaff,
  getPendingTask,
  getStartedTask,
  getCompletedTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

router.post("/add", auth.adminGuard, addTask);
router.get("/getbyadmin", auth.adminGuard, getByAdmin);
router.get("/getbystaff", auth.userGuard, getByStaff);
router.get("/getpendingtask", auth.userGuard, getPendingTask);
router.get("/getstartedtask", auth.userGuard, getStartedTask);
router.get("/getcompletedtask", auth.userGuard, getCompletedTask);
router.put("/updatestatus", auth.userGuard, updateTask);
router.delete("/delete/:id", auth.adminGuard, deleteTask);

module.exports = router;
