const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['technical', 'soft-skills', 'language', 'industry-specific']
  },
  skillLevel: {
    type: String,
    required: true,
    enum: ['beginner', 'intermediate', 'advanced', 'expert']
  },
  duration: {
    type: Number, // in minutes
    required: true
  },
  questions: [{
    type: {
      type: String,
      required: true,
      enum: ['multiple-choice', 'coding', 'practical', 'written']
    },
    question: {
      type: String,
      required: true
    },
    options: [{
      text: String,
      correct: Boolean
    }],
    codeTemplate: {
      type: String,
      // For coding questions
    },
    testCases: [{
      input: String,
      expectedOutput: String,
      // For coding questions
    }],
    points: {
      type: Number,
      required: true
    },
    skillTags: [String],
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      required: true
    }
  }],
  passingScore: {
    type: Number,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

const progressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assessment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assessment',
    required: true
  },
  status: {
    type: String,
    enum: ['started', 'in-progress', 'completed', 'expired'],
    default: 'started'
  },
  currentQuestion: {
    type: Number,
    default: 0
  },
  answers: [{
    questionId: mongoose.Schema.Types.ObjectId,
    answer: mongoose.Schema.Types.Mixed,
    timeSpent: Number, // in seconds
    correct: Boolean
  }],
  timeRemaining: {
    type: Number, // in seconds
    required: true
  },
  score: {
    type: Number,
    default: 0
  },
  skillBreakdown: {
    type: Map,
    of: Number
  },
  startedAt: {
    type: Date,
    default: Date.now
  },
  completedAt: Date,
  certificate: {
    id: String,
    url: String,
    issuedAt: Date
  }
}, {
  timestamps: true
});

// Indexes for querying user progress
progressSchema.index({ user: 1, assessment: 1 });
progressSchema.index({ status: 1 });
progressSchema.index({ completedAt: -1 });
progressSchema.index({ startedAt: -1 });
progressSchema.index({ score: -1 });

// Indexes for assessment searches
assessmentSchema.index({ category: 1, skillLevel: 1 });
assessmentSchema.index({ 'questions.skillTags': 1 });
assessmentSchema.index({ isActive: 1 });
assessmentSchema.index({ createdBy: 1 });
assessmentSchema.index({ updatedAt: -1 });
assessmentSchema.index({ title: 'text', description: 'text' }); // Text search index

const Assessment = mongoose.model('Assessment', assessmentSchema);
const Progress = mongoose.model('Progress', progressSchema);

module.exports = {
  Assessment,
  Progress
};