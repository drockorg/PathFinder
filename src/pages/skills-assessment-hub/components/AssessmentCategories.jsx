import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AssessmentCategories = ({ categories, onStartAssessment }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner':
        return 'text-green-600 bg-green-50';
      case 'intermediate':
        return 'text-yellow-600 bg-yellow-50';
      case 'advanced':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Assessment Categories</h2>
        <div className="text-sm text-muted-foreground">
          Choose a category to begin your skills evaluation
        </div>
      </div>
      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories?.map((category, index) => (
          <motion.div
            key={category?.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group"
          >
            <div 
              className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-all duration-300 cursor-pointer h-full"
              onClick={() => setSelectedCategory(selectedCategory === category?.id ? null : category?.id)}
            >
              {/* Category Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 ${category?.color} rounded-xl flex items-center justify-center text-white`}>
                  <Icon name={category?.icon} size={28} />
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(category?.difficulty)}`}>
                    {category?.difficulty}
                  </span>
                  <Icon 
                    name={selectedCategory === category?.id ? "ChevronUp" : "ChevronDown"} 
                    size={16} 
                    className="text-muted-foreground group-hover:text-primary transition-colors" 
                  />
                </div>
              </div>

              {/* Category Info */}
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-foreground mb-2">{category?.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{category?.description}</p>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={14} />
                    <span>{category?.estimatedTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="FileText" size={14} />
                    <span>{category?.totalQuestions} questions</span>
                  </div>
                </div>
              </div>

              {/* Skill Areas */}
              <div className="mb-4">
                <div className="text-xs font-medium text-muted-foreground mb-2">Skill Areas:</div>
                <div className="flex flex-wrap gap-1">
                  {category?.skillAreas?.slice(0, 3)?.map((skill, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                  {category?.skillAreas?.length > 3 && (
                    <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md">
                      +{category?.skillAreas?.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {selectedCategory === category?.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-border pt-4 mt-4"
                  >
                    <div className="space-y-3">
                      <h4 className="font-medium text-foreground">Available Assessments:</h4>
                      {category?.assessments?.map((assessment, idx) => (
                        <motion.div
                          key={assessment?.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.1 }}
                          className="bg-muted/50 rounded-lg p-3"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="font-medium text-foreground">{assessment?.title}</div>
                              <div className="text-xs text-muted-foreground">
                                {assessment?.questions} questions • {assessment?.duration}
                              </div>
                            </div>
                            <Button
                              size="sm"
                              onClick={(e) => {
                                e?.stopPropagation();
                                onStartAssessment?.(assessment);
                              }}
                              className="ml-2"
                            >
                              Start
                            </Button>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {assessment?.skills?.map((skill, skillIdx) => (
                              <span 
                                key={skillIdx}
                                className="px-1.5 py-0.5 text-xs bg-background text-muted-foreground rounded"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Quick Start Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={24} className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Quick Assessment</h3>
              <p className="text-sm text-muted-foreground">
                Not sure where to start? Take our 5-minute quick assessment to get personalized recommendations.
              </p>
            </div>
          </div>
          <Button variant="outline" className="shrink-0">
            <Icon name="Play" size={16} className="mr-2" />
            Quick Start
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default AssessmentCategories;