const express = require("express");
const passport = require("passport");
const User = require("../models/User");

const router = express.Router();

// ✅ Google OAuth Login Route
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// ✅ Google OAuth Callback Route
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/" }), (req, res) => {
    const allowedPorts = [5173, 5174, 3000];
    const referer = req.headers.referer || ""; // Get the request origin

    try {
        // Extract port from referer (if available)
        const refererPort = new URL(referer)?.port || "5173"; // Default to 5173 if not found

        // Ensure port is allowed
        const redirectPort = allowedPorts.includes(Number(refererPort)) ? refererPort : "5173";

        // Redirect dynamically based on the frontend's port
        res.redirect(`http://localhost:${redirectPort}/dashboard`);
    } catch (error) {
        console.error("Google Callback Error:", error);
        res.redirect("http://localhost:5173/dashboard"); // Fallback redirect
    }
});

// ✅ Handle Google OAuth User Data
router.post("/google", async (req, res) => {
    try {
        const { name, email, profilePicture, googleId } = req.body;

        let user = await User.findOne({ googleId });
        if (!user) {
            user = new User({ googleId, name, email, profilePicture });
            await user.save();
        }

        req.session.user = user;
        res.json({ message: "Login successful", user });
    } catch (error) {
        console.error("Google Auth Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
