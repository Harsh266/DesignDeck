// routes/notificationRoutes.js
const express = require("express");
const notificationController = require("../controllers/notificationController");
const adminAuth = require("../middleware/adminAuth");
const router = express.Router();

// User fetches notifications
router.get("/user-notifications", notificationController.getUserNotifications);

// Admin sends a notification
router.post("/admin-notifications", notificationController.createNotification);

// Admin Notification Page Access Route (Protected with adminAuth middleware)
router.get("/admin-page", adminAuth, notificationController.getAdminPage);

module.exports = router;