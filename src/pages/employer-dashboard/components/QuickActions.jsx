import React from 'react';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onPostJob, onViewCandidates, onScheduleInterview, onViewAnalytics }) => {
  const quickActionItems = [
    {
      label: 'Post New Job',
      description: 'Create and publish a new job posting',
      icon: 'Plus',
      color: 'default',
      action: onPostJob
    },
    {
      label: 'Browse Candidates',
      description: 'Search through available talent pool',
      icon: 'Search',
      color: 'outline',
      action: onViewCandidates
    },
    {
      label: 'Schedule Interview',
      description: 'Set up interviews with shortlisted candidates',
      icon: 'Calendar',
      color: 'outline',
      action: onScheduleInterview
    },
    {
      label: 'View Analytics',
      description: 'Check recruitment performance metrics',
      icon: 'BarChart3',
      color: 'outline',
      action: onViewAnalytics
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
          <p className="text-sm text-muted-foreground">Common recruitment tasks</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActionItems?.map((item, index) => (
          <div key={index} className="group">
            <Button
              variant={item?.color}
              size="lg"
              onClick={item?.action}
              iconName={item?.icon}
              iconPosition="left"
              iconSize={20}
              fullWidth
              className="h-auto p-4 flex-col items-start text-left group-hover:shadow-md transition-shadow duration-200"
            >
              <div className="w-full">
                <div className="font-medium mb-1">{item?.label}</div>
                <div className="text-xs text-muted-foreground font-normal">
                  {item?.description}
                </div>
              </div>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;