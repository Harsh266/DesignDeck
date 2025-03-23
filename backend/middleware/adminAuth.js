const adminAuth = (req, res, next) => {
  if (req.user && req.user.email === "harshvekriya441@gmail.com", {isAdmin: true})  {
      next(); // ✅ Admin Allowed
  } else {
      return res.status(403).json({ message: "Access Denied", isAdmin: false });
  }
};

module.exports = adminAuth;
