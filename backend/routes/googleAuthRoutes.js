const express = require("express");
const passport = require("passport");
const User = require("../models/User"); // Import User model

const router = express.Router();

// ✅ Google OAuth Login Route
router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"], prompt: "select_account" })
);

// ✅ Google OAuth Callback Route
router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    async (req, res) => {
        console.log("✅ Google Login Success. User:", req.user);

        if (!req.user) {
            return res.redirect("/login"); // Redirect if user data is not found
        }

        const currentTime = new Date();

        try {
            // ✅ Update user in the database
            await User.findOneAndUpdate(
                { email: req.user.email },
                {
                    isLoggedIn: true,
                    lastLogin: currentTime
                },
                { new: true }
            );

            // Store user in session
            req.session.user = req.user;

            // ✅ Redirect based on user role
            if (req.user.email === "harshvekriya441@gmail.com") {
                res.redirect("http://localhost:5173/admin-dashboard");
            } else {
                res.redirect("http://localhost:5173/dashboard");
            }
        } catch (error) {
            console.error("❌ Error updating user login status:", error);
            res.redirect("/error");
        }
    }
);

module.exports = router;
