const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const uploadController = require('../controllers/uploadController');
const upload = require('../middleware/upload');
const { auth } = require('../middleware/auth');

// All routes require authentication
router.use(auth);

// Profile routes
router.get('/', profileController.getProfile);
router.put('/', profileController.updateProfile);
router.put('/preferences', profileController.updatePreferences);

// Avatar routes
router.post('/avatar', upload.single('avatar'), uploadController.uploadAvatar);
router.delete('/avatar', uploadController.deleteAvatar);

// Education routes
router.post('/education', profileController.addEducation);
router.put('/education/:educationId', profileController.updateEducation);
router.delete('/education/:educationId', profileController.deleteEducation);

// Experience routes
router.post('/experience', profileController.addExperience);
router.put('/experience/:experienceId', profileController.updateExperience);
router.delete('/experience/:experienceId', profileController.deleteExperience);

// Skills routes
router.post('/skills', profileController.addSkill);
router.put('/skills/:skillId', profileController.updateSkill);
router.delete('/skills/:skillId', profileController.deleteSkill);

module.exports = router;
