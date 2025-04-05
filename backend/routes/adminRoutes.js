// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");
const adminController = require("../controllers/adminController");

// Admin Dashboard Route
router.get("/admin-dashboard", adminAuth, adminController.getDashboard);

// Get All Users for Admin Dashboard
router.get("/all-users", adminAuth, adminController.getAllUsers);

// DELETE User by ID (Admin Only)
router.delete("/delete-user/:id", adminAuth, adminController.deleteUser);

// Admin Send mail to all users
router.post("/send-email", adminAuth, adminController.sendEmailToAllUsers);

// Admin Logout
router.post("/logout", adminAuth, adminController.logout);

module.exports = router;