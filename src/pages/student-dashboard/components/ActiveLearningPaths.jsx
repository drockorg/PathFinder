import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActiveLearningPaths = ({ learningPaths }) => {
  const navigate = useNavigate();

  const handleContinuePath = (pathId) => {
    navigate(`/learning-path-builder?path=${pathId}`);
  };

  const handleViewAllPaths = () => {
    navigate('/learning-path-builder');
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="BookOpen" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Active Learning Paths</h3>
            <p className="text-sm text-muted-foreground">Continue your progress</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleViewAllPaths}
          iconName="ArrowRight"
          iconPosition="right"
          iconSize={16}
        >
          View All
        </Button>
      </div>
      <div className="space-y-4">
        {learningPaths?.map((path, index) => (
          <motion.div
            key={path?.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-1">{path?.title}</h4>
                <p className="text-sm text-muted-foreground mb-2">{path?.description}</p>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} />
                    <span>{path?.estimatedTime}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Target" size={12} />
                    <span>{path?.difficulty}</span>
                  </span>
                </div>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                path?.priority === 'high' ? 'bg-red-100 text-red-700 border border-red-200' :
                path?.priority === 'medium'? 'bg-yellow-100 text-yellow-700 border border-yellow-200' : 'bg-green-100 text-green-700 border border-green-200'
              }`}>
                {path?.priority} priority
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Progress</span>
                <span className="text-sm text-muted-foreground">{path?.progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${path?.progress}%` }}
                  transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                  className={`h-2 rounded-full ${
                    path?.progress >= 80 ? 'bg-green-500' :
                    path?.progress >= 50 ? 'bg-orange-500': 'bg-primary'
                  }`}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {path?.skills?.slice(0, 3)?.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-2 py-1 bg-muted text-xs rounded-md text-muted-foreground"
                  >
                    {skill}
                  </span>
                ))}
                {path?.skills?.length > 3 && (
                  <span className="text-xs text-muted-foreground">
                    +{path?.skills?.length - 3} more
                  </span>
                )}
              </div>
              <Button
                variant="default"
                size="sm"
                onClick={() => handleContinuePath(path?.id)}
                iconName="Play"
                iconPosition="left"
                iconSize={14}
              >
                Continue
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ActiveLearningPaths;