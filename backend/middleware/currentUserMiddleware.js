const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    if (req.session?.user) {
      return next();
    }

    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }

      // Fetch user from database
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // 🔹 Check if the user is logged out (isLoggedIn is false)
      if (!user.isLoggedIn) {
        return res.status(401).json({ message: "User is logged out" });
      }

      req.session.user = user;
      next();
    });

  } catch (error) {
    console.error("User Middleware Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
