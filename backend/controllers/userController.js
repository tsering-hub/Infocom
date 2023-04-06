const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// @desc Register New User
// @route /users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, name, email, password } = req.body;

  // Validation
  if (!username || !name || !email || !password) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  // find if user already exists
  const userEmailExists = await User.findOne({
    email,
  });

  if (userEmailExists) {
    res.status(400);
    throw new Error("Email already exists");
  }

  const usernameExists = await User.findOne({
    username,
  });

  if (usernameExists) {
    res.status(400);
    throw new Error("Username already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  // Create User
  const user = await User.create({
    username,
    name,
    email,
    password: hashPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Login User
// @route /users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
  });

  // Check user and password match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      usertype: user.userType,
      token: generateToken(user._id),
    });
  } else if (user) {
    res.status(401);
    throw new Error("Incorrect Password");
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});

// @desc Get Staffs
// @route /users/getstaffs
// @access Private admin
const getStaffs = asyncHandler(async (req, res) => {
  const staffs = await User.find(
    {
      userType: "Staff",
    },
    { createdAt: 0, updatedAt: 0, userType: 0, password: 0, __v: 0 }
  );
  if (staffs) {
    res.status(200).json({
      staffs: staffs,
    });
  } else {
    res.status(400);
    throw new Error("Can not Find staffs");
  }
});

// @desc Get admin
// @route /users/admin
// @access Private admin
const getAdmin = asyncHandler(async (req, res) => {
  res.status(200).json({
    user: req.adminInfo,
  });
});

// @desc Get Staff
// @route /users/staff
// @access Private staff
const getStaff = asyncHandler(async (req, res) => {
  res.status(200).json({
    user: req.userInfo,
  });
});

// Generate token
const generateToken = (id) => {
  return jwt.sign({ userId: id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getStaffs,
  getAdmin,
  getStaff,
};
