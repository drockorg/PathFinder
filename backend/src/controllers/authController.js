const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const emailService = require('../utils/emailService');
const logger = require('../utils/logger');

// Import Redis client - will be available after server starts
let redisClient;
setTimeout(() => {
  redisClient = require('../index').redisClient;
}, 1000);

/**
 * Generate JWT tokens
 */
const generateTokens = (userId) => {
  const accessToken = jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  const refreshToken = jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
  );

  return { accessToken, refreshToken };
};

const authController = {
  /**
   * Register a new user
   */
  register: async (req, res) => {
    try {
      console.log('=== REGISTRATION REQUEST ===');
      console.log('Request body:', JSON.stringify(req.body, null, 2));
      
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log('Validation errors:', errors.array());
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password, name, mobileNumber, dateOfBirth, gender, location } = req.body;
      
      console.log('Extracted fields:', {
        email,
        name,
        mobileNumber,
        dateOfBirth,
        gender,
        location
      });

      // Check if user already exists
      let user = await User.findOne({ email: email.toLowerCase() });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Create new user
      user = new User({
        email: email.toLowerCase(),
        password,
        name,
        mobileNumber,
        dateOfBirth,
        gender,
        location
      });

      await user.save();

      // Generate tokens
      const { accessToken, refreshToken } = generateTokens(user._id);

      // Save refresh token
      user.refreshToken = refreshToken;
      await user.save();

      res.status(201).json({
        user: user.getPublicProfile(),
        tokens: { accessToken, refreshToken }
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Server error during registration' });
    }
  },

  /**
   * Login user
   */
  login: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      // Find user
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Check password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        // Increment failed login attempts in Redis (if available)
        if (redisClient && redisClient.isOpen) {
          try {
            const key = `login_${req.ip}`;
            await redisClient.incr(key);
            await redisClient.expire(key, 900); // 15 minutes
          } catch (redisError) {
            // Continue without Redis
          }
        }

        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Reset failed login attempts (if Redis available)
      if (redisClient && redisClient.isOpen) {
        try {
          await redisClient.del(`login_${req.ip}`);
        } catch (redisError) {
          // Continue without Redis
        }
      }

      // Generate tokens
      const { accessToken, refreshToken } = generateTokens(user._id);

      // Save refresh token
      user.refreshToken = refreshToken;
      await user.save();

      res.json({
        user: user.getPublicProfile(),
        tokens: { accessToken, refreshToken }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error during login' });
    }
  },

  /**
   * Refresh token
   */
  refresh: async (req, res) => {
    try {
      const user = req.user;
      const { accessToken, refreshToken } = generateTokens(user._id);

      // Update refresh token
      user.refreshToken = refreshToken;
      await user.save();

      res.json({ accessToken, refreshToken });
    } catch (error) {
      console.error('Token refresh error:', error);
      res.status(500).json({ message: 'Server error during token refresh' });
    }
  },

  /**
   * Logout user
   */
  logout: async (req, res) => {
    try {
      const user = req.user;
      const token = req.token;

      // Blacklist current token
      await redisClient.setEx(`bl_${token}`, 
        parseInt(process.env.JWT_EXPIRES_IN) * 24 * 60 * 60, 
        'true'
      );

      // Clear refresh token
      user.refreshToken = null;
      await user.save();

      res.json({ message: 'Logged out successfully' });
    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({ message: 'Server error during logout' });
    }
  },

  /**
   * Get current user
   */
  forgotPassword: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email } = req.body;
      const user = await User.findOne({ email: email.toLowerCase() });

      // Don't reveal if user exists or not
      if (!user) {
        return res.json({ message: 'If an account exists, a password reset email has been sent' });
      }

      // Generate reset token
      const resetToken = crypto.randomBytes(32).toString('hex');
      const hashedToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

      // Save hashed token to user
      user.resetPasswordToken = hashedToken;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
      await user.save();

      // Log reset URL for development (when email service not configured)
      const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
      logger.info(`Password reset requested for ${user.email}`);
      logger.info(`Reset URL: ${resetUrl}`);
      console.log('\n=================================');
      console.log('PASSWORD RESET LINK:');
      console.log(resetUrl);
      console.log('=================================\n');

      // Try to send reset email (optional - won't fail if email service not configured)
      try {
        await emailService.sendPasswordResetEmail(user.email, resetToken);
        logger.info('Password reset email sent successfully');
      } catch (emailError) {
        logger.warn('Email service not configured. Use the reset URL from logs above.');
      }

      res.json({ message: 'If an account exists, a password reset email has been sent' });
    } catch (error) {
      logger.error('Forgot password error:', error);
      res.status(500).json({ message: 'Error processing password reset request' });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { token, password } = req.body;
      const hashedToken = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');

      const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { $gt: Date.now() }
      });

      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired reset token' });
      }

      // Update password
      user.password = password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();

      // Send notification
      await emailService.sendPasswordChangeNotification(user.email);

      res.json({ message: 'Password has been reset successfully' });
    } catch (error) {
      logger.error('Reset password error:', error);
      res.status(500).json({ message: 'Error resetting password' });
    }
  },

  getCurrentUser: async (req, res) => {
    try {
      const user = req.user;
      res.json(user.getPublicProfile());
    } catch (error) {
      console.error('Get current user error:', error);
      res.status(500).json({ message: 'Server error getting user data' });
    }
  }
};

module.exports = authController;