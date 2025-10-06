import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AssessmentHistory = ({ history }) => {
  const [selectedHistory, setSelectedHistory] = useState(null);

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 75) return 'text-blue-600 bg-blue-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Technical Skills': return 'Code';
      case 'Soft Skills': return 'Users';
      case 'Industry-Specific': return 'Building2';
      default: return 'FileCheck';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Assessment History</h2>
          <p className="text-sm text-muted-foreground">
            Review your past assessments and track your progress over time
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Icon name="Download" size={16} className="mr-2" />
          Export Results
        </Button>
      </div>
      {history?.length === 0 ? (
        <div className="bg-card rounded-xl border border-border p-12 text-center">
          <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="FileText" size={32} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No assessments yet</h3>
          <p className="text-muted-foreground mb-6">
            Take your first assessment to start tracking your skills progress
          </p>
          <Button>Start Assessment</Button>
        </div>
      ) : (
        <div className="space-y-4">
          {history?.map((item, index) => (
            <motion.div
              key={item?.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-xl border border-border p-6 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                {/* Assessment Info */}
                <div className="flex items-start space-x-4 flex-1">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={getCategoryIcon(item?.category)} size={24} className="text-primary" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">{item?.title}</h3>
                      <span className="px-2 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full">
                        {item?.category}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center space-x-1">
                        <Icon name="Calendar" size={14} />
                        <span>{new Date(item?.completedDate)?.toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={14} />
                        <span>{item?.timeSpent}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="FileCheck" size={14} />
                        <span>{item?.correctAnswers}/{item?.totalQuestions} correct</span>
                      </div>
                    </div>

                    {/* Skills Breakdown Preview */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {Object.entries(item?.skillBreakdown || {})?.slice(0, 3)?.map(([skill, score]) => (
                        <div key={skill} className="flex items-center space-x-2 px-2 py-1 bg-muted/50 rounded-md">
                          <span className="text-xs font-medium text-foreground">{skill}</span>
                          <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${getScoreColor(score)}`}>
                            {score}%
                          </span>
                        </div>
                      ))}
                      {Object.keys(item?.skillBreakdown || {})?.length > 3 && (
                        <span className="text-xs text-muted-foreground px-2 py-1">
                          +{Object.keys(item?.skillBreakdown || {})?.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Score and Actions */}
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground mb-1">Score</div>
                    <div className={`text-2xl font-bold px-3 py-1 rounded-lg ${getScoreColor(item?.score)}`}>
                      {item?.score}%
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedHistory(selectedHistory === item?.id ? null : item?.id)}
                    >
                      {selectedHistory === item?.id ? 'Hide Details' : 'View Details'}
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Icon name="RotateCcw" size={14} className="mr-1" />
                      Retake
                    </Button>
                  </div>
                </div>
              </div>

              {/* Detailed View */}
              {selectedHistory === item?.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-border pt-6 mt-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Detailed Skills Breakdown */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-4">Skills Performance</h4>
                      <div className="space-y-3">
                        {Object.entries(item?.skillBreakdown || {})?.map(([skill, score]) => (
                          <div key={skill} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-foreground">{skill}</span>
                              <span className={`text-sm font-bold px-2 py-1 rounded ${getScoreColor(score)}`}>
                                {score}%
                              </span>
                            </div>
                            <div className="bg-muted rounded-full h-2">
                              <motion.div
                                className="bg-gradient-to-r from-primary to-primary-dark h-2 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${score}%` }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-4">Recommended Learning Paths</h4>
                      <div className="space-y-3">
                        {item?.recommendedPaths?.map((path, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <Icon name="BookOpen" size={16} className="text-primary" />
                              <span className="text-sm font-medium text-foreground">{path}</span>
                            </div>
                            <Button size="sm" variant="ghost">
                              <Icon name="ArrowRight" size={14} />
                            </Button>
                          </div>
                        )) || (
                          <p className="text-sm text-muted-foreground">No specific recommendations available</p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      )}
      {/* Load More */}
      {history?.length > 0 && (
        <div className="text-center">
          <Button variant="outline">
            Load More Assessments
          </Button>
        </div>
      )}
    </div>
  );
};

export default AssessmentHistory;