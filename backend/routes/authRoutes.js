const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const passport = require("passport");
const router = express.Router();
const currentUser = require("../middleware/currentUserMiddleware");
const adminAuth = require("../middleware/adminAuth"); // ✅ Import adminAuth middleware

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

// ✅ Login Route
router.post("/login", async (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        console.log(err);
        if (err) return res.status(500).json({ message: "Server error" });
        if (!user) return res.status(400).json({ message: info.message });

        req.login(user, (err) => {
            if (err) return res.status(500).json({ message: "Login failed" });
            req.session.user = user; // ✅ Store user in session
            req.session.save((err) => {
                if (err) return res.status(500).json({ message: "Session error" });
                res.status(200).json({ message: "Login successful", user });
            });
        });
    })(req, res, next);
});

// ✅ Get Authenticated User Route
router.get("/me", currentUser, async (req, res) => {
    try {
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

router.get("/admin-dashboard", adminAuth, (req, res) => {
    res.status(200).json({ message: "Welcome Admin!", isAdmin: true });
});

// ✅ Logout Route
router.post("/logout", (req, res) => {
    res.clearCookie("token", { httpOnly: true, sameSite: "lax" });

    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                console.error("Logout Error:", err);
                return res.status(500).json({ message: "Logout failed" });
            }
        });
    }

    res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;
