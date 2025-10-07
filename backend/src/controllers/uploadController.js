const User = require('../models/User');
const logger = require('../utils/logger');
const path = require('path');
const fs = require('fs').promises;

const uploadController = {
  /**
   * Upload profile picture
   */
  uploadAvatar: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      const user = await User.findById(req.user._id);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Delete old avatar if exists
      if (user.profilePicture) {
        const oldAvatarPath = path.join(__dirname, '../../', user.profilePicture);
        try {
          await fs.unlink(oldAvatarPath);
        } catch (err) {
          logger.warn('Could not delete old avatar:', err.message);
        }
      }

      // Save new avatar path
      const avatarUrl = `/uploads/avatars/${req.file.filename}`;
      user.profilePicture = avatarUrl;
      await user.save();

      res.json({
        message: 'Avatar uploaded successfully',
        avatarUrl
      });
    } catch (error) {
      logger.error('Upload avatar error:', error);
      res.status(500).json({ message: 'Error uploading avatar' });
    }
  },

  /**
   * Delete profile picture
   */
  deleteAvatar: async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (!user.profilePicture) {
        return res.status(400).json({ message: 'No avatar to delete' });
      }

      // Delete avatar file
      const avatarPath = path.join(__dirname, '../../', user.profilePicture);
      try {
        await fs.unlink(avatarPath);
      } catch (err) {
        logger.warn('Could not delete avatar file:', err.message);
      }

      // Remove from database
      user.profilePicture = null;
      await user.save();

      res.json({ message: 'Avatar deleted successfully' });
    } catch (error) {
      logger.error('Delete avatar error:', error);
      res.status(500).json({ message: 'Error deleting avatar' });
    }
  }
};

module.exports = uploadController;
