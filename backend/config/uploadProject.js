const multer = require("multer");
const path = require("path");

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "projectImage") {
      cb(null, "uploads/projects/images/");
    } else if (file.fieldname === "projectVideo") {
      cb(null, "uploads/projects/videos/");
    } else {
      cb(new Error("Invalid fieldname"), false);
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

// Multer instance
const upload = multer({ storage });

module.exports = upload;
