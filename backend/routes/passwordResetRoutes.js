// routes/passwordReset.js
const express = require('express');
const router = express.Router();
const passwordResetController = require('../controllers/passwordResetController');

// Request password reset
router.post('/resetpassword', passwordResetController.requestPasswordReset);

// Change password with token
router.post('/changepasswordwithtoken', passwordResetController.changePasswordWithToken);

module.exports = router;