const express = require("express");
const Notification = require("../models/Notification");
const adminAuth = require("../middleware/adminAuth"); // Import adminAuth middleware
const router = express.Router();

// User fetches notifications
router.get("/user-notifications", async (req, res) => {
    try {
        const notifications = await Notification.find().sort({ createdAt: -1 });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Admin sends a notification (Protected)
router.post("/admin-notifications", adminAuth, async (req, res) => {
    try {
        const { message } = req.body;
        const newNotification = new Notification({ message });
        await newNotification.save();

        // Emit notification via Socket.io
        req.io.emit("newNotification", newNotification);

        res.status(201).json(newNotification);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Admin Notification Page Access Route (Protected)
router.get("/admin-page", adminAuth, (req, res) => {
    res.json({ message: "Welcome to the Admin Notification Page!" });
});

module.exports = router;