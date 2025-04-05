// controllers/googleAuthController.js
const User = require("../models/User");

// Admin Email List
const adminEmails = ["harshvekriya441@gmail.com", "ptwinkle837@gmail.com"];

const authController = {
  // Google OAuth login - this is just for reference since the actual auth is in the route
  googleLogin: (req, res, next) => {
    // Passport handles this directly in the route
    next();
  },

  // Google OAuth callback handler
  googleCallback: async (req, res) => {
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
        user.isAdmin = adminEmails.includes(user.email); // Ensure isAdmin is updated
        await user.save();
      }

      // Store user in session
      req.session.user = user;
      console.log("✅ Session User:", req.session.user);

      // ✅ Redirect based on user role
      if (user.isAdmin) {
        console.log("🔹 Redirecting to Admin Dashboard");
        return res.redirect("http://localhost:5173/admin-dashboard");
      } else {
        console.log("🔹 Redirecting to User Dashboard");
        return res.redirect("http://localhost:5173/dashboard");
      }
    } catch (error) {
      console.error("❌ Error updating user login status:", error);
      return res.redirect("/error");
    }
  },

  // You can add other authentication-related controller methods here
  logout: (req, res) => {
    req.logout((err) => {
      if (err) {
        console.error("❌ Error during logout:", err);
        return res.redirect("/error");
      }
      
      // Clear session
      req.session.destroy();
      res.redirect("/login");
    });
  }
};

module.exports = authController;