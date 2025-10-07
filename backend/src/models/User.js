const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  profilePicture: {
    type: String,
  },
  bio: {
    type: String,
    maxlength: 500
  },
  dateOfBirth: {
    type: Date
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other', 'prefer-not-to-say']
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'employer'],
    default: 'user'
  },
  location: {
    city: String,
    region: String,
    country: { type: String, default: 'Ghana' }
  },
  preferences: {
    language: {
      type: String,
      enum: ['english', 'twi', 'ga', 'ewe'],
      default: 'english'
    },
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      sms: { type: Boolean, default: false }
    },
    theme: {
      type: String,
      enum: ['light', 'dark', 'system'],
      default: 'system'
    }
  },
  skills: [{
    name: String,
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'expert']
    },
    verified: { type: Boolean, default: false }
  }],
  education: [{
    institution: String,
    degree: String,
    field: String,
    startDate: Date,
    endDate: Date,
    current: Boolean
  }],
  experience: [{
    company: String,
    position: String,
    description: String,
    startDate: Date,
    endDate: Date,
    current: Boolean
  }],
  certifications: [{
    name: String,
    issuer: String,
    issueDate: Date,
    expiryDate: Date,
    verificationUrl: String
  }],
  socialLinks: {
    linkedin: String,
    github: String,
    portfolio: String
  },
  mobileNumber: {
    type: String,
    validate: {
      validator: function(v) {
        return /^\+233\d{9}$/.test(v); // Ghana phone number format
      },
      message: props => `${props.value} is not a valid Ghana phone number!`
    }
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
  },
  lastActive: {
    type: Date,
    default: Date.now
  },
  refreshToken: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date
}, {
  timestamps: true,
  indexes: [
    { email: 1, unique: true },
    { mobileNumber: 1 },
    { 'skills.name': 1 },
    { role: 1 },
    { status: 1 },
    { lastActive: -1 }
  ]
});

// Password hashing middleware
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to check password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Method to get public profile
userSchema.methods.getPublicProfile = function() {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.refreshToken;
  return userObject;
};

const User = mongoose.model('User', userSchema);

module.exports = User;