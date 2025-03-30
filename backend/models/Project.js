const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [String], // Array of image URLs
      required: true,
    },
    videos: {
      type: [String], // Array of video URLs
      default: [], // Videos are optional
    },
    createdAt: {
      type: Date,
      default: Date.now, // Auto-set the timestamp
    },
  },
  { timestamps: true } // Adds `createdAt` and `updatedAt` timestamps
);

module.exports = mongoose.model("Project", ProjectSchema);
