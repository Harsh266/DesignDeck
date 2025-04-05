// routes/projectRoutes.js
const express = require("express");
const router = express.Router();
const uploadProject = require("../config/uploadProject"); // Import Multer configuration
const authMiddleware = require("../middleware/currentUserMiddleware"); // Import authentication middleware
const projectController = require("../controllers/projectController");

// Route to upload a new project with images & videos
router.post("/upload",
    authMiddleware,
    uploadProject.fields([
        { name: "projectImage", maxCount: 10 },
        { name: "projectVideo", maxCount: 10 },
    ]),
    projectController.uploadProject
);

// Route to get all projects of the authenticated user
router.get("/user-projects",
    authMiddleware,
    projectController.getUserProjects
);

// Route to get a specific project by obfuscated ID
router.get("/project/:obfuscatedId",
    projectController.getProjectByObfuscatedId
);

// Fetch all projects and shuffle them randomly
router.get("/all-projects",
    projectController.getAllProjects
);

// Get project by obfuscated ID
router.get('/:obfuscatedId',
    projectController.getProjectById
);

// Get user profile by obfuscated ID
router.get('/users/:obfuscatedUserId',
    projectController.getUserProfile
);

// Get projects by obfuscated user ID
router.get('/projects/user/:obfuscatedUserId',
    projectController.getUserProjectsById
);

// Contact route with authentication middleware
router.post("/users/contact",
    authMiddleware,
    projectController.contactUser
);

module.exports = router;