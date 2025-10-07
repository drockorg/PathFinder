const { check } = require('express-validator');

const authValidation = {
  register: [
    check('email')
      .trim()
      .normalizeEmail()
      .isEmail()
      .withMessage('Please enter a valid email address'),
    check('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long')
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/)
      .withMessage('Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character'),
    check('name')
      .trim()
      .notEmpty()
      .withMessage('Name is required')
      .isLength({ min: 2, max: 50 })
      .withMessage('Name must be between 2 and 50 characters'),
    check('mobileNumber')
      .optional()
      .matches(/^\+233\d{9}$/)
      .withMessage('Please enter a valid Ghana phone number (+233XXXXXXXXX)')
  ],

  login: [
    check('email')
      .trim()
      .normalizeEmail()
      .isEmail()
      .withMessage('Please enter a valid email address'),
    check('password')
      .notEmpty()
      .withMessage('Password is required')
  ],

  forgotPassword: [
    check('email')
      .trim()
      .normalizeEmail()
      .isEmail()
      .withMessage('Please enter a valid email address')
  ],

  resetPassword: [
    check('token')
      .notEmpty()
      .withMessage('Reset token is required'),
    check('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long')
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/)
      .withMessage('Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character'),
    check('confirmPassword')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password confirmation does not match password');
        }
        return true;
      })
  ],

  updateProfile: [
    check('name')
      .optional()
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Name must be between 2 and 50 characters'),
    check('mobileNumber')
      .optional()
      .matches(/^\+233\d{9}$/)
      .withMessage('Please enter a valid Ghana phone number (+233XXXXXXXXX)'),
    check('location.city')
      .optional()
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('City must be between 2 and 50 characters'),
    check('location.region')
      .optional()
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Region must be between 2 and 50 characters'),
    check('preferences.language')
      .optional()
      .isIn(['english', 'twi', 'ga', 'ewe'])
      .withMessage('Invalid language selection'),
    check('preferences.notifications.email')
      .optional()
      .isBoolean()
      .withMessage('Email notification must be boolean'),
    check('preferences.notifications.push')
      .optional()
      .isBoolean()
      .withMessage('Push notification must be boolean'),
    check('preferences.notifications.sms')
      .optional()
      .isBoolean()
      .withMessage('SMS notification must be boolean')
  ],

  changePassword: [
    check('currentPassword')
      .notEmpty()
      .withMessage('Current password is required'),
    check('newPassword')
      .isLength({ min: 8 })
      .withMessage('New password must be at least 8 characters long')
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/)
      .withMessage('New password must contain at least one number, one uppercase letter, one lowercase letter, and one special character'),
    check('confirmPassword')
      .custom((value, { req }) => {
        if (value !== req.body.newPassword) {
          throw new Error('Password confirmation does not match new password');
        }
        return true;
      })
  ]
};

module.exports = authValidation;