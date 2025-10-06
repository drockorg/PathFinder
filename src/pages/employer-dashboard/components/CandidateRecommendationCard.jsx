import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CandidateRecommendationCard = ({ candidate, onViewProfile, onSendMessage, onShortlist }) => {
  const getSkillMatchColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 75) return 'text-blue-600 bg-blue-50';
    if (score >= 60) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start space-x-4 mb-4">
        <div className="relative">
          <Image
            src={candidate?.avatar}
            alt={candidate?.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
            candidate?.isOnline ? 'bg-green-500' : 'bg-gray-400'
          }`} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-foreground">{candidate?.name}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSkillMatchColor(candidate?.matchScore)}`}>
              {candidate?.matchScore}% Match
            </span>
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={14} />
              <span>{candidate?.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="GraduationCap" size={14} />
              <span>{candidate?.education}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} />
              <span>{candidate?.experience} years</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{candidate?.bio}</p>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Learning Progress</span>
          <span className="text-sm text-muted-foreground">{candidate?.learningProgress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(candidate?.learningProgress)}`}
            style={{ width: `${candidate?.learningProgress}%` }}
          />
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          Current Path: {candidate?.currentLearningPath}
        </div>
      </div>
      <div className="mb-4">
        <div className="text-sm font-medium text-foreground mb-2">Top Skills</div>
        <div className="flex flex-wrap gap-2">
          {candidate?.topSkills?.map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted text-muted-foreground rounded-md text-xs"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-4 text-center">
        <div>
          <div className="text-lg font-bold text-primary">{candidate?.completedCourses}</div>
          <div className="text-xs text-muted-foreground">Courses</div>
        </div>
        <div>
          <div className="text-lg font-bold text-green-600">{candidate?.certifications}</div>
          <div className="text-xs text-muted-foreground">Certificates</div>
        </div>
        <div>
          <div className="text-lg font-bold text-orange-600">{candidate?.projectsCompleted}</div>
          <div className="text-xs text-muted-foreground">Projects</div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
          Last active: {candidate?.lastActive}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSendMessage(candidate?.id)}
            iconName="MessageCircle"
            iconSize={16}
            title="Send message"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => onShortlist(candidate?.id)}
            iconName="Star"
            iconSize={16}
          >
            Shortlist
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => onViewProfile(candidate?.id)}
            iconName="Eye"
            iconPosition="left"
            iconSize={16}
          >
            View Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CandidateRecommendationCard;