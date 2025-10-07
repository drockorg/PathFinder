import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AssessmentResults = ({ results, onBackToOverview }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      {/* Header */}
      <div className="text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="CheckCircle" size={40} className="text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Assessment Complete!</h2>
        <p className="text-muted-foreground">
          Great job completing the {results.title}. Here's how you performed:
        </p>
      </div>

      {/* Score Overview */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className={`text-4xl font-bold mb-2 ${getScoreColor(results.score)}`}>
              {results.score}%
            </div>
            <div className="text-sm text-muted-foreground">Overall Score</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">
              {results.correctAnswers}/{results.totalQuestions}
            </div>
            <div className="text-sm text-muted-foreground">Questions Correct</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">{results.timeSpent}</div>
            <div className="text-sm text-muted-foreground">Time Spent</div>
          </div>
        </div>
      </div>

      {/* Skill Breakdown */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Skill Breakdown</h3>
        <div className="space-y-4">
          {Object.entries(results.skillBreakdown).map(([skill, score]) => (
            <div key={skill}>
              <div className="flex justify-between text-sm mb-2">
                <span>{skill}</span>
                <span className={getScoreColor(score)}>{score}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${score}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className={`h-full ${score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      {results.recommendedPaths?.length > 0 && (
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Recommended Learning Paths</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.recommendedPaths.map((path) => (
              <div
                key={path}
                className="p-4 bg-muted rounded-lg flex items-start space-x-3"
              >
                <div className="bg-primary/10 rounded-full p-2">
                  <Icon name="GraduationCap" className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium">{path}</div>
                  <div className="text-sm text-muted-foreground">
                    Recommended based on your assessment results
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-center space-x-4">
        <Button onClick={onBackToOverview} variant="outline">
          Back to Overview
        </Button>
        <Button>
          Start Learning Path
        </Button>
      </div>
    </motion.div>
  );
};

export default AssessmentResults;