import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProfileOverview = ({ profileData, hasUnsavedChanges, onSave }) => {
  const completionPercentage = profileData?.completionStats?.overall || 0;
  const personalInfo = profileData?.personal || {};
  const skillsCount = (profileData?.skills?.technical?.length || 0) + (profileData?.skills?.soft?.length || 0);
  const portfolioCount = profileData?.portfolio?.length || 0;

  const getCompletionColor = (percentage) => {
    if (percentage >= 90) return 'text-green-600 bg-green-50';
    if (percentage >= 70) return 'text-blue-600 bg-blue-50';
    if (percentage >= 50) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const quickStats = [
    {
      id: 'profile-completion',
      label: 'Profile Completion',
      value: `${completionPercentage}%`,
      icon: 'User',
      color: getCompletionColor(completionPercentage),
      subtext: completionPercentage >= 80 ? 'Excellent!' : 'Keep improving'
    },
    {
      id: 'skills-count',
      label: 'Skills Listed',
      value: skillsCount,
      icon: 'Brain',
      color: 'text-blue-600 bg-blue-50',
      subtext: `${profileData?.skills?.technical?.filter(s => s?.verified)?.length || 0} verified`
    },
    {
      id: 'portfolio-projects',
      label: 'Portfolio Projects',
      value: portfolioCount,
      icon: 'FolderOpen',
      color: 'text-purple-600 bg-purple-50',
      subtext: `${profileData?.portfolio?.filter(p => p?.featured)?.length || 0} featured`
    },
    {
      id: 'profile-visibility',
      label: 'Profile Visibility',
      value: profileData?.privacy?.profileVisibility || 'Private',
      icon: 'Eye',
      color: 'text-green-600 bg-green-50',
      subtext: 'Visible to employers'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
        {/* Profile Info */}
        <div className="flex items-start space-x-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center overflow-hidden">
              {personalInfo?.profilePicture ? (
                <img 
                  src={personalInfo?.profilePicture} 
                  alt="Profile" 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <span className="text-2xl font-bold text-white">
                  {personalInfo?.firstName?.charAt(0) || 'U'}{personalInfo?.lastName?.charAt(0) || ''}
                </span>
              )}
            </div>
            <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-white border-2 border-primary rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
              <Icon name="Camera" size={14} />
            </button>
          </div>
          
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {personalInfo?.firstName} {personalInfo?.lastName}
            </h1>
            <p className="text-muted-foreground mt-1">{personalInfo?.email}</p>
            <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="MapPin" size={14} />
                <span>{personalInfo?.location || 'Location not set'}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Phone" size={14} />
                <span>{personalInfo?.phone || 'Phone not set'}</span>
              </div>
            </div>
            {personalInfo?.bio && (
              <p className="text-sm text-muted-foreground mt-3 max-w-2xl leading-relaxed">
                {personalInfo?.bio}
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          {hasUnsavedChanges && (
            <Button onClick={onSave} className="flex items-center">
              <Icon name="Save" size={16} className="mr-2" />
              Save Changes
            </Button>
          )}
          <Button variant="outline" className="flex items-center">
            <Icon name="Eye" size={16} className="mr-2" />
            Preview Profile
          </Button>
          <Button variant="outline" className="flex items-center">
            <Icon name="Share" size={16} className="mr-2" />
            Share Profile
          </Button>
        </div>
      </div>
      {/* Completion Progress */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-foreground">Profile Completion</h3>
            <p className="text-sm text-muted-foreground">
              A complete profile increases your visibility to employers by 75%
            </p>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold px-3 py-1 rounded-lg ${getCompletionColor(completionPercentage)}`}>
              {completionPercentage}%
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="bg-muted rounded-full h-3 mb-4">
          <motion.div
            className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${completionPercentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>

        {/* Section Breakdown */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {Object.entries(profileData?.completionStats?.sections || {})?.map(([section, percentage]) => (
            <div key={section} className="text-center">
              <div className="text-sm font-medium text-foreground capitalize mb-1">
                {section === 'career' ? 'Career' : section}
              </div>
              <div className="bg-muted rounded-full h-2 mb-1">
                <motion.div
                  className={`h-2 rounded-full ${percentage >= 80 ? 'bg-green-500' : percentage >= 60 ? 'bg-blue-500' : 'bg-yellow-500'}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </div>
              <div className="text-xs text-muted-foreground">{percentage}%</div>
            </div>
          ))}
        </div>
      </div>
      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats?.map((stat, index) => (
          <motion.div
            key={stat?.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-card rounded-xl border border-border p-6 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat?.color?.split(' ')?.slice(1)?.join(' ')}`}>
                <Icon name={stat?.icon} size={24} className={stat?.color?.split(' ')?.[0]} />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-foreground">{stat?.value}</div>
                <div className="text-xs text-muted-foreground">{stat?.label}</div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">{stat?.subtext}</div>
          </motion.div>
        ))}
      </div>
      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Button size="sm" variant="outline" className="flex items-center">
          <Icon name="Download" size={14} className="mr-2" />
          Export CV
        </Button>
        <Button size="sm" variant="outline" className="flex items-center">
          <Icon name="Link" size={14} className="mr-2" />
          Copy Profile Link
        </Button>
        <Button size="sm" variant="outline" className="flex items-center">
          <Icon name="Settings" size={14} className="mr-2" />
          Account Settings
        </Button>
        <Button size="sm" variant="outline" className="flex items-center">
          <Icon name="HelpCircle" size={14} className="mr-2" />
          Profile Tips
        </Button>
      </div>
    </div>
  );
};

export default ProfileOverview;