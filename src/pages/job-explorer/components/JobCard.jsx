import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const JobCard = ({ job, onSave, onApply, onViewDetails }) => {
  const [isSaved, setIsSaved] = useState(job?.isSaved || false);

  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave(job?.id, !isSaved);
  };

  const getSkillMatchColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600 bg-green-50';
    if (percentage >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const formatSalary = (min, max) => {
    return `GHS ${min?.toLocaleString()} - GHS ${max?.toLocaleString()}`;
  };

  const getDaysAgo = (date) => {
    const now = new Date();
    const posted = new Date(date);
    const diffTime = Math.abs(now - posted);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 1 ? '1 day ago' : `${diffDays} days ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-1 line-clamp-2">
            {job?.title}
          </h3>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Building2" size={16} />
            <span>{job?.company}</span>
            <span>•</span>
            <Icon name="MapPin" size={16} />
            <span>{job?.location}</span>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSave}
          iconName={isSaved ? "Heart" : "Heart"}
          iconSize={18}
          className={`ml-2 ${isSaved ? 'text-red-500 hover:text-red-600' : 'text-muted-foreground hover:text-foreground'}`}
          title={isSaved ? 'Remove from saved' : 'Save job'}
        />
      </div>
      {/* Job Details */}
      <div className="space-y-3 mb-4">
        {/* Salary and Experience */}
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center space-x-1">
            <Icon name="DollarSign" size={16} className="text-green-600" />
            <span className="font-medium text-foreground">
              {formatSalary(job?.salaryMin, job?.salaryMax)}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={16} className="text-blue-600" />
            <span className="text-muted-foreground">{job?.experienceLevel}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Calendar" size={16} className="text-orange-600" />
            <span className="text-muted-foreground">{getDaysAgo(job?.postedDate)}</span>
          </div>
        </div>

        {/* Skill Match */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Skill Match:</span>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getSkillMatchColor(job?.skillMatch)}`}>
              {job?.skillMatch}%
            </div>
          </div>
          
          {job?.applicationDeadline && (
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Icon name="AlertCircle" size={16} />
              <span>Deadline: {new Date(job.applicationDeadline)?.toLocaleDateString('en-GB')}</span>
            </div>
          )}
        </div>

        {/* Skills Required */}
        <div className="flex flex-wrap gap-2">
          {job?.skills?.slice(0, 4)?.map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
            >
              {skill}
            </span>
          ))}
          {job?.skills?.length > 4 && (
            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
              +{job?.skills?.length - 4} more
            </span>
          )}
        </div>

        {/* Learning Path Recommendation */}
        {job?.recommendedLearningPath && (
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
            <div className="flex items-start space-x-2">
              <Icon name="Lightbulb" size={16} className="text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-800">Improve your chances</p>
                <p className="text-xs text-blue-600 mt-1">
                  Complete "{job?.recommendedLearningPath}" to increase skill match to {job?.potentialSkillMatch}%
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Actions */}
      <div className="flex items-center space-x-3 pt-4 border-t border-border">
        <Button
          variant="default"
          size="sm"
          onClick={() => onApply(job?.id)}
          iconName="Send"
          iconPosition="left"
          iconSize={16}
          className="flex-1"
        >
          Apply Now
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(job?.id)}
          iconName="Eye"
          iconPosition="left"
          iconSize={16}
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default JobCard;