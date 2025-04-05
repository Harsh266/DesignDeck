// controllers/notificationController.js
const Notification = require("../models/Notification");

const notificationController = {
  // Get all notifications for users
  getUserNotifications: async (req, res) => {
    try {
      const notifications = await Notification.find().sort({ createdAt: -1 });
      res.json(notifications);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Create a new notification (admin only)
  createNotification: async (req, res) => {
    try {
      const { message } = req.body;

      if (!message || message.trim() === "") {
        return res.status(400).json({ success: false, message: "Message cannot be empty!" });
      }

      // Save notification in the database
      const newNotification = new Notification({
        message,
        createdAt: new Date(),
      });

      await newNotification.save();

      res.status(201).json({
        success: true,
        message: "Notification sent successfully!",
        data: newNotification,
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  // Admin page access
  getAdminPage: (req, res) => {
    res.json({ message: "Welcome to the Admin Notification Page!" });
  }
};

module.exports = notificationController;