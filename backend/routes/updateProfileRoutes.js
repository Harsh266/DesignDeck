const express = require("express");
const router = express.Router();
const upload = require("../config/upload");
const authMiddleware = require("../middleware/currentUserMiddleware");
const { updateUserProfile } = require("../controllers/updateProfileController");

router.post(
  "/updateprofile",
  authMiddleware,
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  updateUserProfile
);

module.exports = router;
