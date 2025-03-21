const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    googleId: { type: String, unique: true, sparse: true }, // Optional for non-Google users
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Optional for Google users
    profilePicture: { type: String }, // Stores the profile picture URL
    bannerImage: { type: String }, // Stores the banner image URL
    bio: { type: String, maxlength: 500 }, // User bio with a max length
    dribbbleProfile: { type: String }, // Instagram profile link
    behanceProfile: { type: String }, // Behance profile link
    isAdmin: { type: Boolean, default: false },
    lastLogin: { type: Date, default: null },
    isLoggedIn: { type: Boolean, default: false },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
