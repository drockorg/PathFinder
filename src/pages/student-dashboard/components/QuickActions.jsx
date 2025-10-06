import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 'continue-learning',
      title: 'Continue Learning',
      description: 'Resume your active path',
      icon: 'Play',
      color: 'bg-primary text-primary-foreground',
      hoverColor: 'hover:bg-primary/90',
      action: () => navigate('/learning-path-builder')
    },
    {
      id: 'explore-jobs',
      title: 'Explore Jobs',
      description: 'Find new opportunities',
      icon: 'Search',
      color: 'bg-secondary text-secondary-foreground',
      hoverColor: 'hover:bg-secondary/90',
      action: () => navigate('/job-explorer')
    },
    {
      id: 'build-path',
      title: 'Build New Path',
      description: 'Create learning journey',
      icon: 'Plus',
      color: 'bg-success text-success-foreground',
      hoverColor: 'hover:bg-success/90',
      action: () => navigate('/learning-path-builder?new=true')
    },
    {
      id: 'view-profile',
      title: 'Update Profile',
      description: 'Manage your account',
      icon: 'User',
      color: 'bg-warning text-warning-foreground',
      hoverColor: 'hover:bg-warning/90',
      action: () => navigate('/profile')
    }
  ];

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
          <Icon name="Zap" size={20} className="text-accent" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
          <p className="text-sm text-muted-foreground">Jump to key features</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quickActions?.map((action, index) => (
          <motion.div
            key={action?.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant="ghost"
              onClick={action?.action}
              className={`w-full h-auto p-4 ${action?.color} ${action?.hoverColor} transition-all duration-200 border border-transparent hover:border-border/20`}
            >
              <div className="flex items-center space-x-4 w-full">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={action?.icon} size={24} />
                </div>
                <div className="text-left flex-1">
                  <h4 className="font-semibold mb-1">{action?.title}</h4>
                  <p className="text-sm opacity-90">{action?.description}</p>
                </div>
                <Icon name="ArrowRight" size={16} className="opacity-70" />
              </div>
            </Button>
          </motion.div>
        ))}
      </div>
      {/* Additional Quick Stats */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">12</div>
            <div className="text-xs text-muted-foreground">Days Streak</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-secondary">8</div>
            <div className="text-xs text-muted-foreground">Certificates</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-success">95%</div>
            <div className="text-xs text-muted-foreground">Completion Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;