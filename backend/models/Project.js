const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String }],
    videos: [{ type: String }],
    codes: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model("Project", ProjectSchema);