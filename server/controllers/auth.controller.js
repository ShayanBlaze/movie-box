const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const defaultProfilePictures = [
  "https://i.ibb.co/9kDvYVLQ/user-icon-three-removebg-preview.png",
  "https://i.ibb.co/7JW43TGt/user-icon-second-removebg-preview.png",
  "https://i.ibb.co/0pLKt9kC/user-icon-one-removebg-preview.png",
  "https://i.ibb.co/Xfd95FYJ/user-icon-four-removebg-preview.png",
  "https://i.ibb.co/5xskpTLg/user-icon-fifth-removebg-preview.png",
];

// function to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  console.log("--- Register Attempt ---");
  console.log("Received data:", { username, email, password: "***" });

  const userExists = await User.findOne({ $or: [{ email }, { username }] });
  if (userExists) {
    console.log("❌ Registration failed: User already exists.");
    res.status(400);
    throw new Error("User with this email or username already exists");
  }
  console.log("✅ User does not exist, proceeding...");

  const randomIndex = Math.floor(Math.random() * defaultProfilePictures.length);
  const profilePicture = defaultProfilePictures[randomIndex];
  console.log("Assigning profile picture:", profilePicture);

  try {
    console.log("Attempting to create user in database...");
    const user = await User.create({
      username,
      email,
      password,
      profilePicture,
    });

    if (user) {
      console.log("✅ User created successfully with ID:", user._id);
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        token: generateToken(user._id),
      });
    } else {
      console.log("❌ User creation returned null/undefined.");
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    console.error("❌ DATABASE ERROR during user creation:", error);
    res.status(500);
    throw new Error("Something went wrong during user creation.");
  }
};

// @desc    Login user
// @route   POST /api/auth/login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log("--- Login Attempt ---");
  console.log("Attempting to log in with email:", email);

  const user = await User.findOne({ email });

  if (user) {
    console.log("✅ User found:", user.email);
    const isMatch = await user.matchPassword(password);
    console.log("Password match result:", isMatch);

    if (isMatch) {
      console.log("✅ Password matches! Sending token.");
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        token: generateToken(user._id),
      });
    } else {
      console.log("❌ Password does not match.");
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } else {
    console.log("❌ User not found with that email.");
    res.status(401);
    throw new Error("Invalid email or password");
  }
};

// @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  res.status(200).json(req.user);
};

module.exports = { registerUser, loginUser, getMe };
