import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { useSubmitAssessmentMutation } from '../../../store/services/api';
import {
  setAnswer,
  nextQuestion,
  previousQuestion,
  updateTimeRemaining,
} from '../../../store/slices/assessmentSlice';

const ActiveAssessment = ({ assessment, onComplete, onBack }) => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const currentProgress = useSelector((state) => state.assessment.currentProgress);
  const { currentQuestionIndex, answers, timeRemaining } = currentProgress;

  const [submitAssessment] = useSubmitAssessmentMutation();

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeRemaining > 0) {
        dispatch(updateTimeRemaining(timeRemaining - 1));
      } else {
        handleSubmit();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  const handleAnswer = (questionId, answer) => {
    dispatch(setAnswer({ questionId, answer }));
  };

  const handleNext = () => {
    dispatch(nextQuestion());
  };

  const handlePrevious = () => {
    dispatch(previousQuestion());
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const results = await submitAssessment({
        assessmentId: assessment.id,
        answers
      }).unwrap();
      
      onComplete(results);
    } catch (error) {
      console.error('Failed to submit assessment:', error);
      // TODO: Show error notification
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentQuestion = assessment.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === assessment.questions.length - 1;
  const hasAnsweredCurrent = answers[currentQuestion.id] !== undefined;

  if (isSubmitting) {
    return (
      <div className="min-h-[600px] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6"
        >
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Icon name="Loader2" size={32} className="text-primary" />
            </motion.div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Processing Your Assessment</h3>
            <p className="text-muted-foreground">Analyzing your responses and generating personalized recommendations...</p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (isSubmitting) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6"
        >
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <div>
            <h3 className="text-xl font-semibold mb-2">Processing Your Assessment</h3>
            <p className="text-muted-foreground">Please wait while we analyze your answers...</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="max-w-3xl mx-auto"
    >
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center text-muted-foreground hover:text-foreground"
          >
            <Icon name="ArrowLeft" className="w-4 h-4 mr-2" />
            Back to Overview
          </button>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {assessment.questions.length}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Icon name="Clock" className="w-4 h-4 mr-1" />
              {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
            </div>
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-card rounded-lg shadow-lg p-6 mb-6">
        <div className="mb-6">
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <span className="bg-primary/10 text-primary rounded px-2 py-0.5 mr-2">
              {currentQuestion.skill}
            </span>
            <span className="capitalize">{currentQuestion.difficulty}</span>
          </div>
          <h3 className="text-xl font-semibold mb-4">{currentQuestion.question}</h3>
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(currentQuestion.id, index)}
                className={`w-full text-left p-4 rounded-lg border transition-colors ${
                  answers[currentQuestion.id] === index
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                    answers[currentQuestion.id] === index
                      ? 'border-primary'
                      : 'border-muted-foreground'
                  }`}>
                    {answers[currentQuestion.id] === index && (
                      <div className="w-3 h-3 rounded-full bg-primary" />
                    )}
                  </div>
                  {option}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>
        {isLastQuestion ? (
          <Button
            onClick={handleSubmit}
            disabled={!hasAnsweredCurrent || isSubmitting}
            className="min-w-[120px]"
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Submitting...
              </div>
            ) : (
              'Submit'
            )}
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            disabled={!hasAnsweredCurrent}
            className="min-w-[120px]"
          >
            Next
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default ActiveAssessment;