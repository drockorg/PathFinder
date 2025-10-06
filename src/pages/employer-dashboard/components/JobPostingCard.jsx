import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const JobPostingCard = ({ job, onViewApplications, onEditJob, onToggleStatus }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-50';
      case 'paused':
        return 'text-yellow-600 bg-yellow-50';
      case 'closed':
        return 'text-gray-600 bg-gray-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-orange-600 bg-orange-50';
      case 'low':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-lg font-semibold text-foreground">{job?.title}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job?.status)}`}>
              {job?.status?.charAt(0)?.toUpperCase() + job?.status?.slice(1)}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(job?.urgency)}`}>
              {job?.urgency?.charAt(0)?.toUpperCase() + job?.urgency?.slice(1)} Priority
            </span>
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={14} />
              <span>{job?.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} />
              <span>{job?.type}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="DollarSign" size={14} />
              <span>GHS {job?.salary?.toLocaleString()}</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{job?.description}</p>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEditJob(job?.id)}
            iconName="Edit"
            iconSize={16}
            title="Edit job posting"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleStatus(job?.id)}
            iconName={job?.status === 'active' ? 'Pause' : 'Play'}
            iconSize={16}
            title={job?.status === 'active' ? 'Pause posting' : 'Activate posting'}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{job?.applications}</div>
          <div className="text-xs text-muted-foreground">Applications</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{job?.qualifiedCandidates}</div>
          <div className="text-xs text-muted-foreground">Qualified</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">{job?.interviews}</div>
          <div className="text-xs text-muted-foreground">Interviews</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{job?.views}</div>
          <div className="text-xs text-muted-foreground">Views</div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          <span>Posted {job?.postedDate}</span>
          <span>Expires {job?.expiryDate}</span>
        </div>
        <Button
          variant="default"
          size="sm"
          onClick={() => onViewApplications(job?.id)}
          iconName="Users"
          iconPosition="left"
          iconSize={16}
        >
          View Applications
        </Button>
      </div>
    </div>
  );
};

export default JobPostingCard;