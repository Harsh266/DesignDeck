const User = require("../models/User");

const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const profileImageUrl = req.files.profileImage
      ? `http://localhost:${process.env.PORT || 5000}/uploads/profileImages/${req.files.profileImage[0].filename}`
      : user.profilePicture;

    const coverImageUrl = req.files.coverImage
      ? `http://localhost:${process.env.PORT || 5000}/uploads/coverImages/${req.files.coverImage[0].filename}`
      : user.bannerImage;

    const { bio, dribbbleProfile, behanceProfile } = req.body;

    user.bio = bio || user.bio;
    user.dribbbleProfile = dribbbleProfile || user.dribbbleProfile;
    user.behanceProfile = behanceProfile || user.behanceProfile;
    user.profilePicture = profileImageUrl;
    user.bannerImage = coverImageUrl;

    await user.save();

    res.json({ message: "Profile updated successfully!", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating profile" });
  }
};

module.exports = {
  updateUserProfile,
};
