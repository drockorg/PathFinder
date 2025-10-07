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

  const handleStartAssessment = (assessmentId) => {
    onStartAssessment(assessmentId);
    setSelectedCategory(null);
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
        {categories?.map((category) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className={`group relative bg-card rounded-xl border border-border p-6 cursor-pointer transition-shadow hover:shadow-lg ${
              selectedCategory?.id === category.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {/* Category Header */}
            <div className="flex items-start justify-between mb-4">
              <div className={`${category.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                <Icon name={category.icon} className="w-6 h-6 text-white" />
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(category.difficulty)}`}>
                {category.difficulty}
              </div>
            </div>

            {/* Category Content */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">{category.title}</h3>
              <p className="text-muted-foreground text-sm">{category.description}</p>
            </div>

            {/* Category Stats */}
            <div className="mt-4 pt-4 border-t border-border">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Time</div>
                  <div className="font-medium">{category.estimatedTime}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Questions</div>
                  <div className="font-medium">{category.totalQuestions}</div>
                </div>
              </div>
            </div>

            {/* Skills List */}
            <div className="mt-4 flex flex-wrap gap-2">
              {category.skillAreas?.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 bg-muted rounded-full text-xs text-muted-foreground"
                >
                  {skill}
                </span>
              ))}
              {category.skillAreas?.length > 3 && (
                <span className="px-2 py-1 bg-muted rounded-full text-xs text-muted-foreground">
                  +{category.skillAreas.length - 3} more
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Assessment Details Modal */}
      <AnimatePresence>
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={() => setSelectedCategory(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-card rounded-xl shadow-xl border border-border p-6"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`${selectedCategory.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                    <Icon name={selectedCategory.icon} className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{selectedCategory.title}</h3>
                    <p className="text-sm text-muted-foreground">{selectedCategory.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Icon name="X" className="w-5 h-5" />
                </button>
              </div>

              {/* Available Assessments */}
              <div className="space-y-4">
                <h4 className="font-medium">Available Assessments</h4>
                <div className="space-y-3">
                  {selectedCategory.assessments?.map((assessment) => (
                    <div
                      key={assessment.id}
                      className="flex items-center justify-between p-4 bg-muted rounded-lg"
                    >
                      <div>
                        <h5 className="font-medium mb-1">{assessment.title}</h5>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <Icon name="Clock" className="w-4 h-4 mr-1" />
                            {assessment.duration}
                          </span>
                          <span className="flex items-center">
                            <Icon name="HelpCircle" className="w-4 h-4 mr-1" />
                            {assessment.questions} questions
                          </span>
                        </div>
                      </div>
                      <Button onClick={() => handleStartAssessment(assessment.id)}>
                        Start Assessment
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AssessmentCategories;