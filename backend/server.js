require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

// ✅ CORS Configuration
app.use(cors({
  origin: "http://localhost:5173", // Update based on your frontend URL
  credentials: true
}));

// ✅ MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("❌ MongoDB URI is missing in .env file");
  process.exit(1);
}

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// ✅ User Model
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
});
const User = mongoose.model("User", UserSchema);

// ✅ Root Route (for checking if backend is running)
app.get("/", (req, res) => {
  res.send("🚀 Backend is running!");
});

// ✅ Register Route
app.post("/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully", user: { name, email } });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Login Route
app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.error("User not found:", email);
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.error("Incorrect password for:", email);
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT Token
    if (!process.env.JWT_SECRET) {
      console.error("Missing JWT_SECRET in .env file");
      return res.status(500).json({ message: "Server configuration error" });
    }

    const token = jwt.sign(
      { userId: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Send token in HTTP-only cookie
    res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "lax" });

    res.status(200).json({ message: "Login successful", user: { name: user.name, email: user.email } });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

// ✅ Middleware to Verify JWT Token
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    req.user = decoded; // Attach user data to request
    next();
  });
};

// ✅ Get Authenticated User Route
app.get("/auth/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user });
  } catch (error) {
    console.error("Fetch User Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Logout Route
app.post("/auth/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
