const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authValidation = require('../middleware/validation');
const { auth, loginRateLimit, refreshAuth } = require('../middleware/auth');

// Public routes
router.post('/register', authValidation.register, authController.register);
router.post('/login', loginRateLimit, authValidation.login, authController.login);
router.post('/refresh-token', refreshAuth, authController.refresh);
router.post('/forgot-password', authValidation.forgotPassword, authController.forgotPassword);
router.post('/reset-password', authValidation.resetPassword, authController.resetPassword);

// Protected routes
router.use(auth); // Apply authentication middleware to all routes below
router.post('/logout', authController.logout);
router.get('/me', authController.getCurrentUser);

module.exports = router;