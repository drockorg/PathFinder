import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const JobRecommendations = ({ jobRecommendations }) => {
  const navigate = useNavigate();

  const handleViewJob = (jobId) => {
    navigate(`/job-explorer?job=${jobId}`);
  };

  const handleExploreJobs = () => {
    navigate('/job-explorer');
  };

  const formatSalary = (salary) => {
    return `GHS ${salary?.toLocaleString()}`;
  };

  const getMatchPercentage = (match) => {
    return Math.round(match * 100);
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
            <Icon name="Briefcase" size={20} className="text-secondary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Recommended Jobs</h3>
            <p className="text-sm text-muted-foreground">Based on your skills</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleExploreJobs}
          iconName="Search"
          iconPosition="right"
          iconSize={16}
        >
          Explore All
        </Button>
      </div>
      <div className="space-y-4">
        {jobRecommendations?.map((job, index) => (
          <motion.div
            key={job?.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200 hover:border-primary/20"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-semibold text-foreground">{job?.title}</h4>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    getMatchPercentage(job?.matchScore) >= 90 ? 'bg-green-100 text-green-700 border border-green-200' :
                    getMatchPercentage(job?.matchScore) >= 70 ? 'bg-orange-100 text-orange-700 border border-orange-200': 'bg-blue-100 text-blue-700 border border-blue-200'
                  }`}>
                    {getMatchPercentage(job?.matchScore)}% match
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{job?.company}</p>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center space-x-1">
                    <Icon name="MapPin" size={12} />
                    <span>{job?.location}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="DollarSign" size={12} />
                    <span>{formatSalary(job?.salary)}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Calendar" size={12} />
                    <span>{job?.type}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Required Skills */}
            <div className="mb-4">
              <p className="text-xs font-medium text-muted-foreground mb-2">Required Skills:</p>
              <div className="flex flex-wrap gap-2">
                {job?.requiredSkills?.slice(0, 4)?.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md font-medium"
                  >
                    {skill}
                  </span>
                ))}
                {job?.requiredSkills?.length > 4 && (
                  <span className="text-xs text-muted-foreground px-2 py-1">
                    +{job?.requiredSkills?.length - 4} more
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Icon name="Clock" size={12} />
                <span>Posted {job?.postedDate}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewJob(job?.id)}
                  iconName="Eye"
                  iconPosition="left"
                  iconSize={14}
                >
                  View Details
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => handleViewJob(job?.id)}
                  iconName="Send"
                  iconPosition="left"
                  iconSize={14}
                >
                  Apply Now
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default JobRecommendations;