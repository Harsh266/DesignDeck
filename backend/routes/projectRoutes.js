const express = require("express");
const router = express.Router();
const uploadProject = require("../config/uploadProject"); // Import Multer configuration
const Project = require("../models/Project");
const authMiddleware = require("../middleware/currentUserMiddleware"); // Import authentication middleware

// ✅ Route to upload a new project with images & videos
router.post("/upload", authMiddleware, uploadProject.fields([
  { name: "projectImage", maxCount: 10 },
  { name: "projectVideo", maxCount: 10 },
]), async (req, res) => {
  try {

      if (!req.files || (!req.files["projectImage"] && !req.files["projectVideo"])) {
          return res.status(400).json({ message: "Files are missing!" });
      }

      const { title, description } = req.body;
      if (!title || !description) {
          return res.status(400).json({ message: "Title and description are required" });
      }

      const newProject = new Project({
          title,
          description,
          images: req.files["projectImage"] ? req.files["projectImage"].map(file => `/uploads/projects/images/${file.filename}`) : [],
          videos: req.files["projectVideo"] ? req.files["projectVideo"].map(file => `/uploads/projects/videos/${file.filename}`) : [],
          userId: req.user._id,
      });

      await newProject.save();

      res.status(200).json({ message: "Project uploaded successfully!", project: newProject });
  } catch (err) {
      console.error("Error uploading project:", err);
      res.status(500).json({ message: "Error uploading project" });
  }
});



module.exports = router;
