const User = require("../models/User"); // Import User model

const adminAuth = async (req, res, next) => {
    try {
        if (req.user && req.user.email === "harshvekriya441@gmail.com") {
            // ✅ Ensure isAdmin is set to true in the database
            await User.findOneAndUpdate(
                { email: req.user.email },
                { isAdmin: true }
            );

            req.user.isAdmin = true; // ✅ Ensure request object is updated too
            next();
        } else {
            return res.status(403).json({ message: "Access Denied"});
        }
    } catch (error) {
        console.error("Admin Auth Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = adminAuth;
