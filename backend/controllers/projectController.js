// controllers/projectController.js
const mongoose = require("mongoose");
const User = require("../models/User");
const Project = require("../models/Project");
const { obfuscateId, deobfuscateId } = require("../utils/idUtils");
const transporter = require("../config/nodemailerConfig"); // Assuming you have a mailer configuration

// Upload a new project with images & videos
exports.uploadProject = async (req, res) => {
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

        // Return obfuscated project ID in the response
        const responseProject = newProject.toObject();
        responseProject.obfuscatedId = obfuscateId(newProject._id);

        res.status(200).json({ message: "Project uploaded successfully!", project: responseProject });
    } catch (err) {
        console.error("Error uploading project:", err);
        res.status(500).json({ message: "Error uploading project" });
    }
};

// Get all projects of the authenticated user
exports.getUserProjects = async (req, res) => {
    try {
        const userId = req.user.id;  // Extract user ID from JWT

        if (!userId) {
            return res.status(401).json({ success: false, message: "User not authenticated" });
        }

        // Fetch projects where the user field contains the userId
        const projects = await Project.find({ userId: userId });

        if (projects.length === 0) {
            return res.status(200).json({ success: true, projects: [] });
        }

        // Add obfuscated IDs to all projects
        const projectsWithObfuscatedIds = projects.map(project => {
            const projectObj = project.toObject();
            projectObj.obfuscatedId = obfuscateId(project._id);
            return projectObj;
        });

        // Return projects with obfuscated IDs
        res.status(200).json({ success: true, projects: projectsWithObfuscatedIds });
    } catch (error) {
        console.error("Error fetching user projects:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Get a specific project by obfuscated ID
exports.getProjectByObfuscatedId = async (req, res) => {
    try {
        const obfuscatedId = req.params.obfuscatedId;
        
        // Decode the obfuscated ID to get the original MongoDB ID
        const projectId = deobfuscateId(obfuscatedId);
        
        if (!projectId) {
            return res.status(400).json({ success: false, message: "Invalid project ID" });
        }
        
        // Find the project by decoded ID
        const project = await Project.findById(projectId);
        
        if (!project) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }

        // Find the owner's information
        const user = await User.findById(project.userId, 'name profilePicture');
        
        // Include the owner's obfuscated ID
        const userWithObfuscatedId = user.toObject();
        userWithObfuscatedId.obfuscatedId = obfuscateId(user._id);
        
        // Return project with owner information
        res.status(200).json({ 
            success: true, 
            project: {
                ...project._doc,
                obfuscatedId: obfuscatedId, // Include the obfuscated ID in the response
                owner: userWithObfuscatedId
            } 
        });
    } catch (error) {
        console.error("Error fetching project details:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Fetch all projects and shuffle them randomly
exports.getAllProjects = async (req, res) => {
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

        // Add obfuscated IDs to each project
        const projectsWithObfuscatedIds = projects.map(project => {
            const projectObj = project.toObject();
            projectObj.obfuscatedId = obfuscateId(project._id);
            
            // Also obfuscate user ID if it exists
            if (projectObj.userId && projectObj.userId._id) {
                projectObj.userId.obfuscatedId = obfuscateId(projectObj.userId._id);
            }
            
            return projectObj;
        });

        res.status(200).json({ success: true, projects: projectsWithObfuscatedIds });
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Get project by obfuscated ID
exports.getProjectById = async (req, res) => {
    try {
        // Decode the obfuscated ID
        const projectId = deobfuscateId(req.params.obfuscatedId);
        
        if (!projectId) {
            return res.status(400).json({
                success: false, 
                message: 'Invalid project ID format'
            });
        }
        
        // Using populate to get the user data along with the project
        const project = await Project.findById(projectId)
            .populate({
                path: 'userId',
                select: 'name profilePicture title' // Select the user fields you need
            });

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        // Convert to object to add obfuscated IDs
        const projectObj = project.toObject();
        
        // Add obfuscated user ID if it exists
        if (projectObj.userId && projectObj.userId._id) {
            projectObj.userId.obfuscatedId = obfuscateId(projectObj.userId._id);
        }
        
        // Return the project with success flag
        return res.json({
            success: true,
            project: projectObj
        });
    } catch (error) {
        console.error('Error fetching project details:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error while fetching project details',
            error: error.message
        });
    }
};

// Get user profile by obfuscated ID
exports.getUserProfile = async (req, res) => {
    try {
        const obfuscatedUserId = req.params.obfuscatedUserId;
        
        // Decode the obfuscated ID
        const userId = deobfuscateId(obfuscatedUserId);
        
        if (!userId) {
            return res.status(400).json({ success: false, message: 'Invalid user ID format' });
        }

        // Validate if userId is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: 'Invalid user ID format' });
        }

        const user = await User.findById(userId)
            .select('-password -resetPasswordToken -resetPasswordExpires -__v');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Return user without exposing actual MongoDB ID
        const userObj = user.toObject();
        userObj.obfuscatedId = obfuscatedUserId; // Use the passed obfuscated ID
        
        res.json({
            success: true,
            user: userObj
        });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching user profile'
        });
    }
};

// Get projects by obfuscated user ID
exports.getUserProjectsById = async (req, res) => {
    try {
        const obfuscatedUserId = req.params.obfuscatedUserId;
        
        // Decode the obfuscated ID
        const userId = deobfuscateId(obfuscatedUserId);
        
        if (!userId) {
            return res.status(400).json({ success: false, message: 'Invalid user ID format' });
        }

        // Validate if userId is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: 'Invalid user ID format' });
        }

        const projects = await Project.find({ userId: userId })
            .sort({ createdAt: -1 }) // Sort by newest first
            .populate('userId', 'name profilePicture');

        // Add obfuscated IDs to projects
        const projectsWithObfuscatedIds = projects.map(project => {
            const projectObj = project.toObject();
            projectObj.obfuscatedId = obfuscateId(project._id);
            
            // Also obfuscate user ID if it exists
            if (projectObj.userId && projectObj.userId._id) {
                projectObj.userId.obfuscatedId = obfuscatedUserId; // Use the passed obfuscated ID
            }
            
            return projectObj;
        });

        res.json({
            success: true,
            projects: projectsWithObfuscatedIds
        });
    } catch (error) {
        console.error("Error fetching user projects:", error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching user projects'
        });
    }
};

// Contact user
exports.contactUser = async (req, res) => {
    try {
        const { recipientId, subject, message, projectDetails, timeline, budget } = req.body;
        
        // Decode recipientId if it's obfuscated
        let actualRecipientId = recipientId;
        if (recipientId && recipientId.indexOf('_') >= 0) {
            actualRecipientId = deobfuscateId(recipientId);
        }

        // Find the sender (current logged-in user)
        const sender = await User.findById(req.user.id).select("-password");

        // Find the recipient
        const recipient = await User.findById(actualRecipientId);

        if (!recipient || !recipient.email) {
            return res.status(404).json({
                success: false,
                message: "Recipient not found or has no email address"
            });
        }

        // Simple email content with plain text or minimal HTML
        const mailOptions = {
            from: `"DesignDeck"`,
            to: recipient.email,
            subject: subject || `New message from ${sender.name} on DesignDeck`,
            text: `
New Contact Request from DesignDeck

From: ${sender.name}

Message: ${message}

Project Details:
Description: ${projectDetails || 'Not provided'}
Timeline: ${timeline || 'Not specified'}
Budget: ${budget ? `$${budget}` : 'Not specified'}

You can reply directly to the sender at: ${sender.email}

This message was sent through DesignDeck. Please do not reply to this email.
            `
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        return res.status(200).json({
            success: true,
            message: "Message sent successfully"
        });

    } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({
            success: false,
            message: "Error sending message",
            error: error.message
        });
    }
};