// routes/authRoutes.js
const express = require("express");
const passport = require("passport");
const googleAuthController = require("../controllers/googleAuthController");

const router = express.Router();

// ✅ Google OAuth Login Route
router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"], prompt: "select_account" })
);

// ✅ Google OAuth Callback Route
router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    googleAuthController.googleCallback
);

// Logout route
router.get("/logout", googleAuthController.logout);

module.exports = router;