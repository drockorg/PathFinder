const User = require('../models/User');
const logger = require('../utils/logger');
const { validationResult } = require('express-validator');

const profileController = {
  /**
   * Get current user profile
   */
  getProfile: async (req, res) => {
    try {
      const user = await User.findById(req.user._id).select('-password -refreshToken');
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      logger.error('Get profile error:', error);
      res.status(500).json({ message: 'Error fetching profile' });
    }
  },

  /**
   * Update user profile
   */
  updateProfile: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {
        name,
        mobileNumber,
        location,
        bio,
        dateOfBirth,
        gender,
        socialLinks
      } = req.body;

      const user = await User.findById(req.user._id);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Update fields
      if (name) user.name = name;
      if (mobileNumber) user.mobileNumber = mobileNumber;
      if (location) user.location = { ...user.location, ...location };
      if (bio) user.bio = bio;
      if (dateOfBirth) user.dateOfBirth = dateOfBirth;
      if (gender) user.gender = gender;
      if (socialLinks) user.socialLinks = { ...user.socialLinks, ...socialLinks };

      await user.save();

      res.json({
        message: 'Profile updated successfully',
        user: user.getPublicProfile()
      });
    } catch (error) {
      logger.error('Update profile error:', error);
      res.status(500).json({ message: 'Error updating profile' });
    }
  },

  /**
   * Update user preferences
   */
  updatePreferences: async (req, res) => {
    try {
      const { language, notifications, theme } = req.body;

      const user = await User.findById(req.user._id);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Update preferences
      if (language) user.preferences.language = language;
      if (notifications) {
        user.preferences.notifications = {
          ...user.preferences.notifications,
          ...notifications
        };
      }
      if (theme) user.preferences.theme = theme;

      await user.save();

      res.json({
        message: 'Preferences updated successfully',
        preferences: user.preferences
      });
    } catch (error) {
      logger.error('Update preferences error:', error);
      res.status(500).json({ message: 'Error updating preferences' });
    }
  },

  /**
   * Add education entry
   */
  addEducation: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { institution, degree, field, startDate, endDate, current } = req.body;

      const user = await User.findById(req.user._id);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.education.push({
        institution,
        degree,
        field,
        startDate,
        endDate,
        current
      });

      await user.save();

      res.json({
        message: 'Education added successfully',
        education: user.education
      });
    } catch (error) {
      logger.error('Add education error:', error);
      res.status(500).json({ message: 'Error adding education' });
    }
  },

  /**
   * Update education entry
   */
  updateEducation: async (req, res) => {
    try {
      const { educationId } = req.params;
      const { institution, degree, field, startDate, endDate, current } = req.body;

      const user = await User.findById(req.user._id);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const education = user.education.id(educationId);
      
      if (!education) {
        return res.status(404).json({ message: 'Education entry not found' });
      }

      if (institution) education.institution = institution;
      if (degree) education.degree = degree;
      if (field) education.field = field;
      if (startDate) education.startDate = startDate;
      if (endDate !== undefined) education.endDate = endDate;
      if (current !== undefined) education.current = current;

      await user.save();

      res.json({
        message: 'Education updated successfully',
        education: user.education
      });
    } catch (error) {
      logger.error('Update education error:', error);
      res.status(500).json({ message: 'Error updating education' });
    }
  },

  /**
   * Delete education entry
   */
  deleteEducation: async (req, res) => {
    try {
      const { educationId } = req.params;

      const user = await User.findById(req.user._id);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.education.pull(educationId);
      await user.save();

      res.json({
        message: 'Education deleted successfully',
        education: user.education
      });
    } catch (error) {
      logger.error('Delete education error:', error);
      res.status(500).json({ message: 'Error deleting education' });
    }
  },

  /**
   * Add experience entry
   */
  addExperience: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { company, position, description, startDate, endDate, current } = req.body;

      const user = await User.findById(req.user._id);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.experience.push({
        company,
        position,
        description,
        startDate,
        endDate,
        current
      });

      await user.save();

      res.json({
        message: 'Experience added successfully',
        experience: user.experience
      });
    } catch (error) {
      logger.error('Add experience error:', error);
      res.status(500).json({ message: 'Error adding experience' });
    }
  },

  /**
   * Update experience entry
   */
  updateExperience: async (req, res) => {
    try {
      const { experienceId } = req.params;
      const { company, position, description, startDate, endDate, current } = req.body;

      const user = await User.findById(req.user._id);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const experience = user.experience.id(experienceId);
      
      if (!experience) {
        return res.status(404).json({ message: 'Experience entry not found' });
      }

      if (company) experience.company = company;
      if (position) experience.position = position;
      if (description) experience.description = description;
      if (startDate) experience.startDate = startDate;
      if (endDate !== undefined) experience.endDate = endDate;
      if (current !== undefined) experience.current = current;

      await user.save();

      res.json({
        message: 'Experience updated successfully',
        experience: user.experience
      });
    } catch (error) {
      logger.error('Update experience error:', error);
      res.status(500).json({ message: 'Error updating experience' });
    }
  },

  /**
   * Delete experience entry
   */
  deleteExperience: async (req, res) => {
    try {
      const { experienceId } = req.params;

      const user = await User.findById(req.user._id);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.experience.pull(experienceId);
      await user.save();

      res.json({
        message: 'Experience deleted successfully',
        experience: user.experience
      });
    } catch (error) {
      logger.error('Delete experience error:', error);
      res.status(500).json({ message: 'Error deleting experience' });
    }
  },

  /**
   * Add skill
   */
  addSkill: async (req, res) => {
    try {
      const { name, level } = req.body;

      if (!name || !level) {
        return res.status(400).json({ message: 'Name and level are required' });
      }

      const user = await User.findById(req.user._id);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Check if skill already exists
      const existingSkill = user.skills.find(s => s.name.toLowerCase() === name.toLowerCase());
      if (existingSkill) {
        return res.status(400).json({ message: 'Skill already exists' });
      }

      user.skills.push({ name, level, verified: false });
      await user.save();

      res.json({
        message: 'Skill added successfully',
        skills: user.skills
      });
    } catch (error) {
      logger.error('Add skill error:', error);
      res.status(500).json({ message: 'Error adding skill' });
    }
  },

  /**
   * Update skill
   */
  updateSkill: async (req, res) => {
    try {
      const { skillId } = req.params;
      const { name, level } = req.body;

      const user = await User.findById(req.user._id);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const skill = user.skills.id(skillId);
      
      if (!skill) {
        return res.status(404).json({ message: 'Skill not found' });
      }

      if (name) skill.name = name;
      if (level) skill.level = level;

      await user.save();

      res.json({
        message: 'Skill updated successfully',
        skills: user.skills
      });
    } catch (error) {
      logger.error('Update skill error:', error);
      res.status(500).json({ message: 'Error updating skill' });
    }
  },

  /**
   * Delete skill
   */
  deleteSkill: async (req, res) => {
    try {
      const { skillId } = req.params;

      const user = await User.findById(req.user._id);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.skills.pull(skillId);
      await user.save();

      res.json({
        message: 'Skill deleted successfully',
        skills: user.skills
      });
    } catch (error) {
      logger.error('Delete skill error:', error);
      res.status(500).json({ message: 'Error deleting skill' });
    }
  }
};

module.exports = profileController;
