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

        const { title, description, category } = req.body;
        if (!title || !description || !category) {
            return res.status(400).json({ message: "Title and description are required" });
        }

        const newProject = new Project({
            title,
            description,
            category,
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

// Route to get all projects of the authenticated user
router.get("/user-projects", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;  // Extract user ID from JWT

        if (!userId) {
            return res.status(401).json({ success: false, message: "User not authenticated" });
        }

        // Fetch projects where the user field contains the userId
        const projects = await Project.find({ userId: userId });

        if (projects.length === 0) {
            return res.status(200).json({ success: true, message: "No projects found" });
        }

        // Prepare a response with title and first image of each project
        const projectDetails = projects.map(project => ({
            title: project.title,
            firstImage: project.images && project.images[0] ? project.images[0] : null,
            videos: project.videos,
            category: project.category,
            description: project.description,
        }));

        res.status(200).json({ success: true, projects: projectDetails });
    } catch (error) {
        console.error("Error fetching user projects:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});


// Fetch all projects and shuffle them randomly
router.get("/all-projects", async (req, res) => {
    try {
        const { category } = req.query;
        const sessionKey = category ? `shuffled_${category}` : 'shuffled_all';

        // Apply category filter if provided
        let filter = category ? { category } : {};

        // Fetch projects from the database
        let projects = await Project.find(filter)
            .populate("userId", "name profilePicture")
            .exec();

        // Check if we have a stored shuffle order for this category
        if (!req.session[sessionKey]) {
            // First time viewing this category, shuffle and store
            projects = projects.sort(() => Math.random() - 0.5);
            
            // Store project IDs in session for this category
            req.session[sessionKey] = projects.map(p => p._id.toString());
        } else {
            // We have a stored order, sort according to it
            const orderMap = {};
            req.session[sessionKey].forEach((id, index) => {
                orderMap[id] = index;
            });
            
            // Sort based on saved order
            projects.sort((a, b) => {
                const idA = a._id.toString();
                const idB = b._id.toString();
                
                // Handle new projects (not in the stored order)
                if (orderMap[idA] === undefined) return 1;
                if (orderMap[idB] === undefined) return -1;
                
                return orderMap[idA] - orderMap[idB];
            });
        }

        res.status(200).json({ success: true, projects: projects });
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});


module.exports = router;
