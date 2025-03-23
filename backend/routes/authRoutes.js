const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const passport = require("passport");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth"); // Import adminAuth middleware
const jwt = require("jsonwebtoken");

// ✅ Register Route
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully", user: { name, email } });
    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ Login Route (Modified to update lastLogin and isLoggedIn)
router.post("/login", async (req, res, next) => {
    passport.authenticate("local", async (err, user, info) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Server error" });
        }
        if (!user) return res.status(400).json({ message: info.message });

        req.login(user, async (err) => {
            if (err) return res.status(500).json({ message: "Login failed" });

            req.session.user = user; // ✅ Store user in session

            // Update isLoggedIn status to true
            await User.findByIdAndUpdate(user._id, { isLoggedIn: true });

            // Set JWT cookie
            res.cookie("token", jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "1d"
            }), {
                httpOnly: true,
                sameSite: "lax"
            });

            req.session.save((err) => {
                if (err) return res.status(500).json({ message: "Session error" });
                res.status(200).json({ message: "Login successful", user });
            });
        });
    })(req, res, next);
});

// ✅ Get Authenticated User Route
router.get("/me", async (req, res) => {
    try {
        if (!req.isAuthenticated()) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // ✅ Fetch complete user data from MongoDB
        const user = await User.findById(req.user.id).select("-password"); // Exclude password
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("User Fetch Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// ✅ Admin Dashboard Route
router.get("/admin-dashboard", adminAuth, (req, res) => {
    res.status(200).json({ message: "Welcome Admin!", isAdmin: true });
});

// ✅ Get All Users for Admin Dashboard
router.get("/all-users", adminAuth, async (req, res) => {
    try {
        const users = await User.find().select("name email isLoggedIn lastLogin"); // Fetch required fields
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ Logout Route (Modified to update isLoggedIn)
router.post("/logout", async (req, res) => {
    try {
        // Get the token from cookies
        const token = req.cookies.token;
        if (!token) return res.status(400).json({ message: "No token found" });

        // Verify the token to get user ID
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        // Update the user status in the database
        await User.findByIdAndUpdate(userId, { isLoggedIn: false });

        // Clear the cookie and send response
        res.clearCookie("token", { httpOnly: true, sameSite: "lax" });
        res.status(200).json({ message: "User logged out successfully" });

    } catch (error) {
        console.error("Logout Error:", error);
        res.status(500).json({ message: "Logout failed", error });
    }
});

module.exports = router;