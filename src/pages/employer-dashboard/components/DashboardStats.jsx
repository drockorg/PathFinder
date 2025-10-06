import React from 'react';
import Icon from '../../../components/AppIcon';

const DashboardStats = ({ stats }) => {
  const statItems = [
    {
      label: 'Active Job Postings',
      value: stats?.activeJobs,
      icon: 'Briefcase',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: stats?.jobsChange,
      changeType: stats?.jobsChange > 0 ? 'increase' : 'decrease'
    },
    {
      label: 'Total Applications',
      value: stats?.totalApplications,
      icon: 'Users',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: stats?.applicationsChange,
      changeType: stats?.applicationsChange > 0 ? 'increase' : 'decrease'
    },
    {
      label: 'Qualified Candidates',
      value: stats?.qualifiedCandidates,
      icon: 'UserCheck',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      change: stats?.qualifiedChange,
      changeType: stats?.qualifiedChange > 0 ? 'increase' : 'decrease'
    },
    {
      label: 'Interviews Scheduled',
      value: stats?.interviewsScheduled,
      icon: 'Calendar',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      change: stats?.interviewsChange,
      changeType: stats?.interviewsChange > 0 ? 'increase' : 'decrease'
    },
    {
      label: 'Successful Hires',
      value: stats?.successfulHires,
      icon: 'Award',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      change: stats?.hiresChange,
      changeType: stats?.hiresChange > 0 ? 'increase' : 'decrease'
    },
    {
      label: 'Average Time to Hire',
      value: `${stats?.avgTimeToHire} days`,
      icon: 'Clock',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      change: stats?.timeToHireChange,
      changeType: stats?.timeToHireChange < 0 ? 'increase' : 'decrease'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
      {statItems?.map((item, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${item?.bgColor}`}>
              <Icon name={item?.icon} size={24} className={item?.color} />
            </div>
            {item?.change !== 0 && (
              <div className={`flex items-center space-x-1 text-xs ${
                item?.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}>
                <Icon 
                  name={item?.changeType === 'increase' ? 'TrendingUp' : 'TrendingDown'} 
                  size={12} 
                />
                <span>{Math.abs(item?.change)}%</span>
              </div>
            )}
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-foreground">{item?.value}</div>
            <div className="text-sm text-muted-foreground">{item?.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;