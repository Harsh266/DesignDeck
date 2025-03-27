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
        const users = await User.find().select("name email isLoggedIn lastLogin"); // Fetch required fields
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;