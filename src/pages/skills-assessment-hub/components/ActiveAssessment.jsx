import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActiveAssessment = ({ assessment, onComplete, onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(15 * 60); // 15 minutes in seconds
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock questions data
  const questions = [
    {
      id: 'q1',
      type: 'multiple-choice',
      question: 'What is the primary purpose of React hooks?',
      options: [
        'To replace class components entirely',
        'To allow state and lifecycle features in functional components',
        'To improve React performance',
        'To handle routing in React applications'
      ],
      correct: 1,
      skill: 'React',
      difficulty: 'intermediate'
    },
    {
      id: 'q2',
      type: 'multiple-choice',
      question: 'Which CSS property is used to create a flexbox container?',
      options: [
        'display: flex',
        'flex: container',
        'layout: flexbox',
        'container: flex'
      ],
      correct: 0,
      skill: 'CSS',
      difficulty: 'beginner'
    },
    {
      id: 'q3',
      type: 'scenario',
      question: 'You need to fetch data from an API when a component mounts. Which React hook would you use?',
      options: [
        'useState',
        'useEffect',
        'useContext',
        'useReducer'
      ],
      correct: 1,
      skill: 'React',
      difficulty: 'intermediate'
    },
    {
      id: 'q4',
      type: 'skill-level',
      question: 'Rate your proficiency in JavaScript ES6+ features',
      options: [
        'Beginner - I know basic syntax',
        'Intermediate - I use arrow functions and destructuring',
        'Advanced - I work with modules, async/await, and modern features',
        'Expert - I contribute to JavaScript libraries and frameworks'
      ],
      skill: 'JavaScript',
      difficulty: 'self-assessment'
    },
    {
      id: 'q5',
      type: 'practical',
      question: 'What would be the output of: console.log([1, 2, 3].map(x => x * 2))',
      options: [
        '[2, 4, 6]',
        '[1, 2, 3, 2, 4, 6]',
        '2, 4, 6',
        'undefined'
      ],
      correct: 0,
      skill: 'JavaScript',
      difficulty: 'intermediate'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleSubmitAssessment();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const handleAnswer = (questionId, answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions?.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      handleSubmitAssessment();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmitAssessment = async () => {
    setIsSubmitting(true);
    
    // Calculate results
    let correctCount = 0;
    const skillBreakdown = {};
    
    questions?.forEach((question, index) => {
      const userAnswer = answers?.[question?.id];
      const isCorrect = question?.correct === userAnswer;
      
      if (isCorrect) correctCount++;
      
      if (!skillBreakdown?.[question?.skill]) {
        skillBreakdown[question.skill] = { correct: 0, total: 0 };
      }
      
      skillBreakdown[question.skill].total++;
      if (isCorrect) skillBreakdown[question.skill].correct++;
    });

    const score = Math.round((correctCount / questions?.length) * 100);
    
    // Convert skill breakdown to percentages
    Object.keys(skillBreakdown)?.forEach(skill => {
      const data = skillBreakdown?.[skill];
      skillBreakdown[skill] = Math.round((data?.correct / data?.total) * 100);
    });

    const results = {
      assessmentId: assessment?.id,
      title: assessment?.title,
      score,
      totalQuestions: questions?.length,
      correctAnswers: correctCount,
      timeSpent: `${Math.floor((15 * 60 - timeRemaining) / 60)} mins`,
      skillBreakdown,
      answers
    };

    // Simulate processing time
    setTimeout(() => {
      onComplete?.(results);
      setIsSubmitting(false);
    }, 2000);
  };

  const progress = ((currentQuestion + 1) / questions?.length) * 100;
  const currentQ = questions?.[currentQuestion];

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

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Assessment Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="flex items-center"
          >
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Back to Hub
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{assessment?.title}</h1>
            <p className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {questions?.length}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Time Remaining</div>
            <div className={`text-lg font-mono font-bold ${timeRemaining < 300 ? 'text-red-600' : 'text-foreground'}`}>
              {formatTime(timeRemaining)}
            </div>
          </div>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="bg-muted rounded-full h-2">
        <motion.div
          className="bg-primary h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      {/* Question Content */}
      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-card rounded-xl border border-border p-8"
      >
        {/* Question Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-4">
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                {currentQ?.skill}
              </span>
              <span className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full capitalize">
                {currentQ?.difficulty}
              </span>
              <span className="px-3 py-1 bg-secondary/10 text-secondary text-sm rounded-full capitalize">
                {currentQ?.type?.replace('-', ' ')}
              </span>
            </div>
            <h2 className="text-xl font-semibold text-foreground leading-relaxed">
              {currentQ?.question}
            </h2>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground ml-6">
            <Icon name="HelpCircle" size={16} />
            <span>Select one answer</span>
          </div>
        </div>

        {/* Answer Options */}
        <div className="space-y-3">
          {currentQ?.options?.map((option, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => handleAnswer(currentQ?.id, index)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                answers?.[currentQ?.id] === index
                  ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50 hover:bg-muted/50'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  answers?.[currentQ?.id] === index
                    ? 'border-primary bg-primary' :'border-muted-foreground'
                }`}>
                  {answers?.[currentQ?.id] === index && (
                    <Icon name="Check" size={16} className="text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{String.fromCharCode(65 + index)}.</div>
                  <div>{option}</div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="flex items-center"
        >
          <Icon name="ChevronLeft" size={16} className="mr-2" />
          Previous
        </Button>

        <div className="text-sm text-muted-foreground">
          {Object.keys(answers)?.length} of {questions?.length} answered
        </div>

        <Button
          onClick={handleNext}
          disabled={answers?.[currentQ?.id] === undefined}
          className="flex items-center"
        >
          {currentQuestion === questions?.length - 1 ? 'Submit Assessment' : 'Next Question'}
          <Icon name="ChevronRight" size={16} className="ml-2" />
        </Button>
      </div>
      {/* Question Navigation Dots */}
      <div className="flex items-center justify-center space-x-2">
        {questions?.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentQuestion(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentQuestion
                ? 'bg-primary'
                : answers?.[questions?.[index]?.id] !== undefined
                ? 'bg-success' :'bg-muted'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ActiveAssessment;