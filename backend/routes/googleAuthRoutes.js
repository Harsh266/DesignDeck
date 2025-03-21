const express = require("express");
const passport = require("passport");

const router = express.Router();

// ✅ Google OAuth Login Route
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"], prompt: "select_account", }));

// ✅ Google OAuth Callback Route
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/" }), (req, res) => {
    console.log("✅ Google Login Success. User:", req.user);

    // Store user in session
    req.session.user = req.user;

    // ✅ Check if logged-in user is the admin
    if (req.user.email === "harshvekriya441@gmail.com") {
        res.redirect("http://localhost:5173/admin-dashboard"); // ✅ Redirect to Admin Dashboard
    } else {
        res.redirect("http://localhost:5173/dashboard"); // 🚫 Redirect non-admins to user dashboard
    }
});

module.exports = router;
