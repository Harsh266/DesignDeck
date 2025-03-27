const express = require("express");
const User = require("../models/User");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth"); // Import adminAuth middleware

// ✅ Admin Dashboard Route
router.get("/admin-dashboard", adminAuth, (req, res) => {
    res.status(200).json({ message: "Welcome Admin!", isAdmin: true });
});

// ✅ Get All Users for Admin Dashboard
router.get("/all-users", adminAuth, async (req, res) => {
    try {
        const users = await User.find().select("name email isLoggedIn lastLogin profileImage isAdmin"); // Added profileImage and isAdmin
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ Get Specific User by ID
router.get("/user/:id", adminAuth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("name email isLoggedIn lastLogin profileImage isAdmin");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user details:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
