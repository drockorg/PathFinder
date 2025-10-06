import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SkillRecommendations = ({ recommendations }) => {
  const getRecommendationType = (type) => {
    switch (type) {
      case 'improvement':
        return {
          icon: 'TrendingUp',
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200'
        };
      case 'new_skill':
        return {
          icon: 'Plus',
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200'
        };
      case 'certification':
        return {
          icon: 'Award',
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200'
        };
      default:
        return {
          icon: 'Lightbulb',
          color: 'text-purple-600',
          bgColor: 'bg-purple-50',
          borderColor: 'border-purple-200'
        };
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
          <Icon name="Target" size={20} className="text-accent" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">Skill Recommendations</h2>
          <p className="text-sm text-muted-foreground">Based on your assessment results</p>
        </div>
      </div>
      {recommendations?.length === 0 ? (
        <div className="bg-card rounded-xl border border-border p-8 text-center">
          <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Target" size={32} className="text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-foreground mb-2">No recommendations yet</h3>
          <p className="text-sm text-muted-foreground">
            Complete an assessment to get personalized skill recommendations
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {recommendations?.map((recommendation, index) => {
            const typeConfig = getRecommendationType(recommendation?.type);
            
            return (
              <motion.div
                key={recommendation?.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-card rounded-xl border ${typeConfig?.borderColor} p-6 hover:shadow-md transition-all duration-300`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 ${typeConfig?.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon name={typeConfig?.icon} size={24} className={typeConfig?.color} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">{recommendation?.title}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(recommendation?.priority)}`}>
                        {recommendation?.priority} priority
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4">{recommendation?.description}</p>
                    
                    {/* Progress Bar for Improvements */}
                    {recommendation?.type === 'improvement' && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-muted-foreground">Current Level</span>
                          <span className="text-xs font-medium text-muted-foreground">Target Level</span>
                        </div>
                        <div className="bg-muted rounded-full h-3 relative">
                          <motion.div
                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${(recommendation?.currentLevel / 100) * 100}%` }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                          />
                          <div 
                            className="absolute top-0 w-1 h-3 bg-green-500 rounded-full"
                            style={{ left: `${recommendation?.targetLevel}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-blue-600 font-medium">{recommendation?.currentLevel}%</span>
                          <span className="text-xs text-green-600 font-medium">{recommendation?.targetLevel}%</span>
                        </div>
                      </div>
                    )}
                    
                    {/* Learning Paths */}
                    <div className="mb-4">
                      <div className="text-xs font-medium text-muted-foreground mb-2">Recommended Learning Paths:</div>
                      <div className="flex flex-wrap gap-2">
                        {recommendation?.learningPaths?.map((path, idx) => (
                          <span 
                            key={idx}
                            className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-md font-medium"
                          >
                            {path}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Time Estimate */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Icon name="Clock" size={14} />
                          <span>Est. {recommendation?.estimatedTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="BookOpen" size={14} />
                          <span>{recommendation?.learningPaths?.length} paths</span>
                        </div>
                      </div>
                      
                      <Button size="sm" className="shrink-0">
                        Start Learning
                        <Icon name="ArrowRight" size={14} className="ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Sparkles" size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Get More Recommendations</h3>
              <p className="text-sm text-muted-foreground">Take more assessments to unlock personalized learning paths</p>
            </div>
          </div>
          <Button variant="outline">
            Browse Assessments
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SkillRecommendations;