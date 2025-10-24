const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, confirmpassword } = req.body;

    // Passwords match check
    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if user already exists
    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ message: "User already exists" });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // Send success JSON response
    res.status(200).json({ message: "Registered Successfully", username: newUser.username, userId: newUser._id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

    // Create JWT token
    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Send JSON with token and user info
    res.status(200).json({ token, username: user.username, userId: user._id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
