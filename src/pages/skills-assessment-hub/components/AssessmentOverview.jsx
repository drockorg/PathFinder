import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const AssessmentOverview = ({ userStats }) => {
  const stats = [
    {
      id: 'total-assessments',
      label: 'Assessments Taken',
      value: userStats?.totalAssessments || 0,
      icon: 'FileCheck',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '+2 this month'
    },
    {
      id: 'average-score',
      label: 'Average Score',
      value: `${userStats?.averageScore || 0}%`,
      icon: 'TrendingUp',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: '+5% improvement'
    },
    {
      id: 'strongest-skill',
      label: 'Strongest Skill',
      value: userStats?.strongestSkill || 'N/A',
      icon: 'Award',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      change: '92% mastery'
    },
    {
      id: 'streak',
      label: 'Assessment Streak',
      value: `${userStats?.assessmentStreak || 0} days`,
      icon: 'Flame',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      change: 'Keep it up!'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Skills Assessment Hub</h1>
          <p className="text-muted-foreground mt-2">
            Discover your strengths and find the perfect learning path for your career goals
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Clock" size={16} />
          <span>Last assessment: {userStats?.lastAssessment || 'Never'}</span>
        </div>
      </div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats?.map((stat, index) => (
          <motion.div
            key={stat?.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 ${stat?.bgColor} rounded-lg flex items-center justify-center`}>
                <Icon name={stat?.icon} size={24} className={stat?.color} />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-foreground">{stat?.value}</div>
                <div className="text-xs text-muted-foreground">{stat?.label}</div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">{stat?.change}</div>
          </motion.div>
        ))}
      </div>
      {/* Quick Actions Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Compass" size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Ready for your next assessment?</h3>
              <p className="text-sm text-muted-foreground">
                Complete assessments to unlock personalized learning paths and job matches
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Recommended next:</div>
              <div className="font-semibold text-primary">Backend Development</div>
            </div>
            <Icon name="ArrowRight" size={16} className="text-primary" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AssessmentOverview;