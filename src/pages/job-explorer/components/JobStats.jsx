import React from 'react';
import Icon from '../../../components/AppIcon';

const JobStats = ({ stats }) => {
  const statItems = [
    {
      label: 'Total Jobs',
      value: stats?.totalJobs,
      icon: 'Briefcase',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'New This Week',
      value: stats?.newThisWeek,
      icon: 'Plus',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      label: 'High Match',
      value: stats?.highMatch,
      icon: 'Target',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      label: 'Remote Available',
      value: stats?.remoteJobs,
      icon: 'Home',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statItems?.map((item, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${item?.bgColor}`}>
              <Icon name={item?.icon} size={20} className={item?.color} />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {item?.value?.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">{item?.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobStats;