const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String }],
    videos: [{ type: String }],
}, { timestamps: true });

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
