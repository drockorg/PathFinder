import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeAssessment: null,
  completedAssessment: null,
  assessmentHistory: [],
  categories: [],
  currentProgress: {
    currentQuestionIndex: 0,
    answers: {},
    timeRemaining: null,
    isSubmitting: false,
  },
  results: null,
  recommendations: [],
  isLoading: false,
  error: null,
};

const assessmentSlice = createSlice({
  name: 'assessment',
  initialState,
  reducers: {
    startAssessment: (state, action) => {
      state.activeAssessment = action.payload;
      state.currentProgress = {
        currentQuestionIndex: 0,
        answers: {},
        timeRemaining: action.payload.duration * 60, // Convert minutes to seconds
      };
      state.results = null;
    },
    setAnswer: (state, action) => {
      const { questionId, answer } = action.payload;
      state.currentProgress.answers[questionId] = answer;
    },
    nextQuestion: (state) => {
      if (state.currentProgress.currentQuestionIndex < state.activeAssessment.questions.length - 1) {
        state.currentProgress.currentQuestionIndex += 1;
      }
    },
    previousQuestion: (state) => {
      if (state.currentProgress.currentQuestionIndex > 0) {
        state.currentProgress.currentQuestionIndex -= 1;
      }
    },
    updateTimeRemaining: (state, action) => {
      state.currentProgress.timeRemaining = action.payload;
    },
    setSubmitting: (state, action) => {
      state.currentProgress.isSubmitting = action.payload;
    },
    resetAssessment: (state) => {
      state.activeAssessment = null;
      state.currentProgress = {
        currentQuestionIndex: 0,
        answers: {},
        timeRemaining: null,
        isSubmitting: false,
      };
      state.results = null;
    },
    setAssessmentResult: (state, action) => {
      state.completedAssessment = state.activeAssessment;
      state.results = action.payload;
      state.activeAssessment = null;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    completeAssessment: (state, action) => {
      state.completedAssessment = state.activeAssessment;
      state.results = action.payload;
      state.activeAssessment = null;
      state.currentProgress = {
        currentQuestionIndex: 0,
        answers: {},
        timeRemaining: null,
        isSubmitting: false,
      };
    },
  },
});

// Export actions
export const {
  startAssessment,
  setAnswer,
  nextQuestion,
  previousQuestion,
  updateTimeRemaining,
  setSubmitting,
  resetAssessment,
  setAssessmentResult,
  setCategories,
  completeAssessment,
} = assessmentSlice.actions;

// Export reducer
export default assessmentSlice.reducer;