
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    googleId: { type: String, unique: true, sparse: true }, // Optional for non-Google users
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Optional for Google users
    profilePicture: { type: String }, // Optional for non-Google users
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
