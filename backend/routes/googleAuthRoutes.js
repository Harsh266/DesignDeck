const express = require("express");
const passport = require("passport");
const User = require("../models/User"); // Import User model

const router = express.Router();

// ✅ Admin Email List
const adminEmails = ["harshvekriya441@gmail.com"];

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
            // ✅ Find or Create User
            let user = await User.findOne({ email: req.user.email });

            if (!user) {
                const isAdmin = adminEmails.includes(req.user.email); // Check if admin
                user = new User({
                    name: req.user.displayName,
                    email: req.user.email,
                    isAdmin,
                    isLoggedIn: true,
                    lastLogin: currentTime,
                });
                await user.save();
            } else {
                user.isLoggedIn = true;
                user.lastLogin = currentTime;
                await user.save();
            }

            // Store user in session
            req.session.user = user;

            // ✅ Redirect based on user role
            if (user.isAdmin) {
                res.redirect("http://localhost:5173/admin-dashboard");
            } else {
                res.redirect("http://localhost:5173/landingpage");
            }
        } catch (error) {
            console.error("❌ Error updating user login status:", error);
            res.redirect("/error");
        }
    }
);

module.exports = router;
