const asyncHandler = require("express-async-handler");
const Task = require("../models/taskModel");

// @desc Adding New Task
// @route /task/add
// @access Private Admin
const addTask = asyncHandler(async (req, res) => {
  const { title, desc, assignedto } = req.body;

  // Validation
  if (!title || !desc || !assignedto) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  // Create task
  const task = await Task.create({
    title: title,
    desc: desc,
    assignedto: assignedto,
  });

  if (task) {
    res.status(201).json({
      msg: "Task added successfully",
    });
  } else {
    res.status(400);
    throw new Error("Task not added");
  }
});

// @desc Get All Tasks by admin
// @route /task/getbyadmin
// @access Private Admin
const getByAdmin = asyncHandler(async (req, res) => {
  const tasks = await Task.find()
    .sort({
      createdAt: "desc",
    })
    .populate("assignedto");
  if (tasks) {
    res.status(200).json({
      success: true,
      data: tasks,
    });
  } else {
    res.status(400);
    throw new Error("Task not Found");
  }
});

// @desc Get All Tasks by staff
// @route /task/getbystaff
// @access Private Staff
const getByStaff = asyncHandler(async (req, res) => {
  const tasks = await Task.find({
    assignedto: req.userInfo._id,
  }).sort({
    createdAt: "desc",
  });

  if (tasks) {
    res.status(200).json({
      success: true,
      data: tasks,
    });
  } else {
    res.status(400);
    throw new Error("Task not Found");
  }
});

// @desc Get All Pending Tasks by staff
// @route /task/getpendingtask
// @access Private Staff
const getPendingTask = asyncHandler(async (req, res) => {
  const tasks = await Task.find({
    $and: [
      {
        assignedto: req.userInfo._id,
      },
      {
        status: "pending",
      },
    ],
  }).sort({
    createdAt: "desc",
  });

  if (tasks) {
    res.status(200).json({
      success: true,
      data: tasks,
    });
  } else {
    res.status(400);
    throw new Error("Task not Found");
  }
});

// @desc Get All started Tasks by staff
// @route /task/getstartedtask
// @access Private Staff
const getStartedTask = asyncHandler(async (req, res) => {
  const tasks = await Task.find({
    $and: [
      {
        assignedto: req.userInfo._id,
      },
      {
        status: "started",
      },
    ],
  }).sort({
    createdAt: "desc",
  });

  if (tasks) {
    res.status(200).json({
      success: true,
      data: tasks,
    });
  } else {
    res.status(400);
    throw new Error("Task not Found");
  }
});

// @desc Get All completed Tasks by staff
// @route /task/getcompletedtask
// @access Private Staff
const getCompletedTask = asyncHandler(async (req, res) => {
  const tasks = await Task.find({
    $and: [
      {
        assignedto: req.userInfo._id,
      },
      {
        status: "completed",
      },
    ],
  }).sort({
    createdAt: "desc",
  });

  if (tasks) {
    res.status(200).json({
      success: true,
      data: tasks,
    });
  } else {
    res.status(400);
    throw new Error("Task not Found");
  }
});

// @desc Updating Task Status
// @route /task/updatestatus
// @access Private Staff
const updateTask = asyncHandler(async (req, res) => {
  const { id, status } = req.body;

  const task = await Task.updateOne(
    { _id: id },
    {
      status: status,
    }
  );

  if (task !== null) {
    res.status(201).json({
      msg: "Task Updated successfully",
    });
  } else {
    res.status(400);
    throw new Error("Task not Updated");
  }
});

// @desc delete Task
// @route /task/delete/:id
// @access Private Admin
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.deleteOne({ _id: req.params.id });

  if (task) {
    res.status(200).json({
      msg: "Task Deleted successfully",
    });
  } else {
    res.status(400);
    throw new Error("Something Went Wrong, Please Try Again!!!");
  }
});

module.exports = {
  addTask,
  getByAdmin,
  getByStaff,
  getPendingTask,
  getStartedTask,
  getCompletedTask,
  updateTask,
  deleteTask,
};
