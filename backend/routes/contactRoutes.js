// routes/emailRoutes.js
const express = require("express");
const { sendEmail } = require("../controllers/contactController");

const router = express.Router();

// Route for sending emails
router.post("/send-email", sendEmail);

module.exports = router;