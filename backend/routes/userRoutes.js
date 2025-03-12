const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// ✅ Get Authenticated User Route
router.get("/me", async (req, res) => {
    try {
        if (req.session.user) {
            return res.json(req.session.user);
        }

        const token = req.cookies.token;
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) return res.status(403).json({ message: "Invalid token" });

            const user = await User.findById(decoded.userId).select("-password");
            if (!user) return res.status(404).json({ message: "User not found" });

            res.status(200).json(user);
        });
    } catch (error) {
        console.error("User Fetch Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
