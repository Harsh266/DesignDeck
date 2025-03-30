const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig"); // Import Multer configuration
const Project = require("../models/Project");
const authMiddleware = require("../middleware/currentUserMiddleware"); // Import authentication middleware

// ✅ Route to upload a new project with images & videos
router.post(
  "/upload",
  authMiddleware, // Ensure user is authenticated
  upload.fields([
    { name: "projectImage", maxCount: 5 }, // Max 5 images per project
    { name: "projectVideo", maxCount: 3 }, // Max 3 videos per project
  ]),
  async (req, res) => {
    try {
      const userId = req.session.user._id; // Get user ID from session

      console.log("Files uploaded successfully");

      // ✅ Extract new file URLs
      const images = req.files.projectImage
        ? req.files.projectImage.map((file) => `http://localhost:${process.env.PORT || 5000}/uploads/projects/images/${file.filename}`)
        : [];

      const videos = req.files.projectVideo
        ? req.files.projectVideo.map((file) => `http://localhost:${process.env.PORT || 5000}/uploads/projects/videos/${file.filename}`)
        : [];

      const { title, description } = req.body;

      // ✅ Ensure all required fields are provided
      if (!title || !description || images.length === 0) {
        return res.status(400).json({ message: "Title, description, and at least one image are required." });
      }

      // ✅ Create a new project entry in MongoDB
      const newProject = new Project({
        userId,
        title,
        description,
        images,
        videos,
      });

      await newProject.save(); // ✅ Save new project to MongoDB

      console.log("New project saved in MongoDB");

      res.status(201).json({ message: "Project uploaded successfully!", project: newProject });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error uploading project" });
    }
  } 
);

module.exports = router;
