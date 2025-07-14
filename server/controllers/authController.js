const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');
const { OAuth2Client } = require('google-auth-library');
const User = require("../model/User");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Local registration (sign-up)
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser.password) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      account_number: uuidv4(),
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log("Error in registering user", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Local login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate request
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user || !user.password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Create a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, message: "Logged in successfully" });
  } catch (error) {
    console.log("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Google OAuth login/signup
exports.googleAuth = async (req, res) => {
  try {
    const { token } = req.body; // Expecting a token from the frontend

    // Verify the Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    const { sub, email, name, picture } = payload;

    // Check if the user already exists in the database
    let user = await User.findOne({ email });

    if (!user) {
      // If the user doesn't exist, create a new one
      user = await User.create({
        googleId: sub,
        username: name,
        email: email,
        profilePhoto: picture,
        account_number: uuidv4(),
      });
    }

    // Create a JWT token
    const authToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token: authToken, message: "Logged in successfully via Google" });
  } catch (error) {
    console.log("Error during Google login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
