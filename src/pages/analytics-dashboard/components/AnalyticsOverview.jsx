import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, BookOpen, Briefcase, Target, Award } from 'lucide-react';

const AnalyticsOverview = ({ data, selectedMetric, onMetricChange }) => {
  const metrics = [
    {
      id: 'learning',
      title: 'Learning Hours',
      value: data?.totalLearningHours || 0,
      change: '+12%',
      trend: 'up',
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Total time spent learning'
    },
    {
      id: 'completion',
      title: 'Completion Rate',
      value: `${data?.completionRate || 0}%`,
      change: '+5.2%',
      trend: 'up',
      icon: Target,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'Course completion percentage'
    },
    {
      id: 'applications',
      title: 'Job Applications',
      value: data?.jobApplications || 0,
      change: '+23%',
      trend: 'up',
      icon: Briefcase,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'Total applications sent'
    },
    {
      id: 'success',
      title: 'Interview Success',
      value: `${data?.interviewSuccessRate || 0}%`,
      change: '+8.1%',
      trend: 'up',
      icon: Award,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      description: 'Interview to offer ratio'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {metrics?.map((metric, index) => {
        const IconComponent = metric?.icon;
        const isSelected = selectedMetric === metric?.id;
        
        return (
          <motion.div
            key={metric?.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-300 cursor-pointer hover:shadow-lg ${
              isSelected 
                ? 'border-primary bg-primary/5 shadow-md' 
                : 'border-border bg-card hover:border-primary/50'
            }`}
            onClick={() => onMetricChange?.(metric?.id)}
          >
            <div className="p-6">
              {/* Icon and Trend */}
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${metric?.bgColor}`}>
                  <IconComponent className={`w-6 h-6 ${metric?.color}`} />
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-green-600">
                    {metric?.change}
                  </span>
                </div>
              </div>

              {/* Main Value */}
              <div className="mb-2">
                <h3 className="text-2xl font-bold text-foreground mb-1">
                  {metric?.value}
                </h3>
                <p className="text-sm font-medium text-foreground">
                  {metric?.title}
                </p>
              </div>

              {/* Description */}
              <p className="text-xs text-muted-foreground">
                {metric?.description}
              </p>

              {/* Selection Indicator */}
              {isSelected && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  className="absolute bottom-0 left-0 h-1 bg-primary"
                />
              )}
            </div>
            {/* Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </motion.div>
        );
      })}
    </div>
  );
};

export default AnalyticsOverview;