const asyncHandler = require("express-async-handler");
const userData = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please fill out all the required fields !!");
  }
  const isUserAvailable = await userData.findOne({ email });
  if (isUserAvailable) {
    res.status(400);
    throw new Error("User email Already Exists !!");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const insertUser_into_DB = await userData.create({
    username,
    email,
    password: hashPassword,
  });
  if (insertUser_into_DB) {
    res
      .status(200)
      .json({ _id: insertUser_into_DB._id, email: insertUser_into_DB.email });
  } else {
    res.status(400);
    throw new Error("Error Occured ");
  }
  res.status(200).json({ message: "User Created Successfully" });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill out all the required fields !!");
  }
  const user = await userData.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const excessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.EXCESS_TOKEN,
      { expiresIn: "15m" }
    );
    res.status(200).json({ excessToken });
  } else {
    res.status(400);
    throw new Error("Error occured !!");
  }
});

const currentUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};
