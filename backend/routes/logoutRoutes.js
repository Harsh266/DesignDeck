const express = require("express");

const router = express.Router();

// ✅ Logout Route
router.post("/logout", (req, res) => {
    res.clearCookie("token", { httpOnly: true, sameSite: "lax" });

    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                console.error("Logout Error:", err);
                return res.status(500).json({ message: "Logout failed" });
            }
        });
    }

    res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;
