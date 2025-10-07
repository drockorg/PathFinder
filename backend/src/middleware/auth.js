const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Redis client will be undefined if Redis is not connected
let redisClient;
try {
  redisClient = require('../index').redisClient;
} catch (err) {
  redisClient = null;
}

/**
 * Authentication middleware to verify JWT tokens
 */
const auth = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.header('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.substring(7);

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if token is blacklisted in Redis (skip if Redis not available)
    if (redisClient && redisClient.isOpen) {
      try {
        const isBlacklisted = await redisClient.get(`bl_${token}`);
        if (isBlacklisted) {
          return res.status(401).json({ message: 'Token has been invalidated' });
        }
      } catch (redisError) {
        // Continue without Redis check
      }
    }

    // Find user
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    if (user.status !== 'active') {
      return res.status(401).json({ message: 'Account is not active' });
    }

    // Update last active timestamp
    user.lastActive = new Date();
    await user.save();

    // Attach user to request object
    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Role-based authorization middleware
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'You do not have permission to perform this action'
      });
    }
    next();
  };
};

/**
 * Rate limiting middleware for login attempts
 */
const loginRateLimit = async (req, res, next) => {
  // Skip rate limiting if Redis is not available
  if (!redisClient || !redisClient.isOpen) {
    return next();
  }
  
  const key = `login_${req.ip}`;
  
  try {
    const attempts = await redisClient.get(key);
    if (attempts && parseInt(attempts) >= 5) {
      return res.status(429).json({
        message: 'Too many login attempts. Please try again in 15 minutes.'
      });
    }

    if (attempts) {
      await redisClient.incr(key);
    } else {
      await redisClient.setEx(key, 900, '1'); // 15 minutes expiry
    }
    
    next();
  } catch (error) {
    // If Redis fails, continue without rate limiting
    next();
  }
};

/**
 * Refresh token middleware
 */
const refreshAuth = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(401).json({ message: 'No refresh token provided' });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

    // Find user and check if refresh token matches
    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Refresh token expired' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  auth,
  authorize,
  loginRateLimit,
  refreshAuth
};
