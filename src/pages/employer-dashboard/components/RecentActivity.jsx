import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RecentActivity = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'application':
        return 'UserPlus';
      case 'interview':
        return 'Calendar';
      case 'hire':
        return 'Award';
      case 'message':
        return 'MessageCircle';
      case 'job_posted':
        return 'Briefcase';
      default:
        return 'Bell';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'application':
        return 'text-blue-600 bg-blue-50';
      case 'interview':
        return 'text-purple-600 bg-purple-50';
      case 'hire':
        return 'text-green-600 bg-green-50';
      case 'message':
        return 'text-orange-600 bg-orange-50';
      case 'job_posted':
        return 'text-indigo-600 bg-indigo-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
          <p className="text-sm text-muted-foreground">Latest updates from your recruitment pipeline</p>
        </div>
        <Icon name="Activity" size={20} className="text-muted-foreground" />
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities?.map((activity, index) => (
          <div key={index} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-150">
            <div className={`p-2 rounded-full ${getActivityColor(activity?.type)}`}>
              <Icon name={getActivityIcon(activity?.type)} size={16} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                {activity?.candidateAvatar && (
                  <Image
                    src={activity?.candidateAvatar}
                    alt={activity?.candidateName}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                )}
                <p className="text-sm font-medium text-foreground truncate">
                  {activity?.title}
                </p>
              </div>
              
              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                {activity?.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  {activity?.jobTitle && (
                    <>
                      <Icon name="Briefcase" size={12} />
                      <span>{activity?.jobTitle}</span>
                    </>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">
                  {formatTimeAgo(activity?.timestamp)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {activities?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Inbox" size={48} className="text-muted-foreground/50 mx-auto mb-4" />
          <p className="text-muted-foreground">No recent activity</p>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;