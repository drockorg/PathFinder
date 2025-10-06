import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIRecommendations = ({ selectedCareer, currentModules, onAddRecommendation }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const careerPaths = {
    'software-developer': {
      name: 'Software Developer',
      icon: 'Code',
      color: 'bg-blue-100 text-blue-700',
      recommendations: [
        {
          id: 'git-version-control',
          title: 'Git & Version Control',
          reason: 'Essential for collaborative development',
          priority: 'High',
          duration: '1 week',
          difficulty: 'Beginner',
          skills: ['Git', 'GitHub', 'Version Control'],
          jobMatch: 95
        },
        {
          id: 'database-fundamentals',
          title: 'Database Fundamentals',
          reason: 'Most applications require data storage',
          priority: 'High',
          duration: '3 weeks',
          difficulty: 'Intermediate',
          skills: ['SQL', 'Database Design', 'MySQL'],
          jobMatch: 88
        },
        {
          id: 'api-development',
          title: 'REST API Development',
          reason: 'Critical for modern web applications',
          priority: 'Medium',
          duration: '2 weeks',
          difficulty: 'Intermediate',
          skills: ['REST API', 'HTTP', 'JSON'],
          jobMatch: 82
        }
      ]
    },
    'digital-marketer': {
      name: 'Digital Marketer',
      icon: 'TrendingUp',
      color: 'bg-green-100 text-green-700',
      recommendations: [
        {
          id: 'social-media-marketing',
          title: 'Social Media Marketing',
          reason: 'High demand in Ghana market',
          priority: 'High',
          duration: '2 weeks',
          difficulty: 'Beginner',
          skills: ['Facebook Ads', 'Instagram Marketing', 'Content Strategy'],
          jobMatch: 92
        },
        {
          id: 'seo-fundamentals',
          title: 'Search Engine Optimization',
          reason: 'Essential for online visibility',
          priority: 'High',
          duration: '3 weeks',
          difficulty: 'Intermediate',
          skills: ['SEO', 'Keyword Research', 'Content Optimization'],
          jobMatch: 87
        },
        {
          id: 'email-marketing',
          title: 'Email Marketing Automation',
          reason: 'High ROI marketing channel',
          priority: 'Medium',
          duration: '1 week',
          difficulty: 'Beginner',
          skills: ['Email Marketing', 'Automation', 'Analytics'],
          jobMatch: 78
        }
      ]
    },
    'data-analyst': {
      name: 'Data Analyst',
      icon: 'BarChart3',
      color: 'bg-purple-100 text-purple-700',
      recommendations: [
        {
          id: 'excel-advanced',
          title: 'Advanced Excel & Spreadsheets',
          reason: 'Foundation for data analysis',
          priority: 'High',
          duration: '2 weeks',
          difficulty: 'Intermediate',
          skills: ['Excel', 'Pivot Tables', 'Data Visualization'],
          jobMatch: 90
        },
        {
          id: 'sql-data-analysis',
          title: 'SQL for Data Analysis',
          reason: 'Query databases effectively',
          priority: 'High',
          duration: '4 weeks',
          difficulty: 'Intermediate',
          skills: ['SQL', 'Data Querying', 'Database Analysis'],
          jobMatch: 94
        },
        {
          id: 'tableau-basics',
          title: 'Data Visualization with Tableau',
          reason: 'Create compelling data stories',
          priority: 'Medium',
          duration: '3 weeks',
          difficulty: 'Intermediate',
          skills: ['Tableau', 'Data Visualization', 'Dashboards'],
          jobMatch: 85
        }
      ]
    }
  };

  useEffect(() => {
    if (selectedCareer) {
      setIsLoading(true);
      // Simulate AI processing delay
      setTimeout(() => {
        const careerData = careerPaths?.[selectedCareer];
        if (careerData) {
          // Filter out modules already in the path
          const currentModuleIds = currentModules?.map(m => m?.id);
          const filteredRecommendations = careerData?.recommendations?.filter(
            rec => !currentModuleIds?.includes(rec?.id)
          );
          setRecommendations(filteredRecommendations);
        }
        setIsLoading(false);
      }, 1500);
    }
  }, [selectedCareer, currentModules]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'Advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (!selectedCareer) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 text-center">
        <Icon name="Target" size={48} className="mx-auto text-muted-foreground mb-3" />
        <h3 className="font-semibold text-foreground mb-2">Select a Career Goal</h3>
        <p className="text-muted-foreground text-sm">
          Choose your target career to get AI-powered module recommendations
        </p>
      </div>
    );
  }

  const currentCareer = careerPaths?.[selectedCareer];

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-3 mb-2">
          <div className={`p-2 rounded-lg ${currentCareer?.color}`}>
            <Icon name={currentCareer?.icon} size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">AI Recommendations</h3>
            <p className="text-sm text-muted-foreground">For {currentCareer?.name}</p>
          </div>
        </div>
        
        <div className="flex items-center text-xs text-muted-foreground">
          <Icon name="Sparkles" size={12} className="mr-1" />
          Powered by AI career analysis
        </div>
      </div>
      {/* Loading State */}
      {isLoading && (
        <div className="p-6 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-3"></div>
          <p className="text-sm text-muted-foreground">Analyzing career requirements...</p>
        </div>
      )}
      {/* Recommendations */}
      {!isLoading && recommendations?.length > 0 && (
        <div className="p-4 space-y-3">
          {recommendations?.map((recommendation) => (
            <div key={recommendation?.id} className="bg-background border border-border rounded-lg p-3 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-medium text-foreground text-sm">{recommendation?.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{recommendation?.reason}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onAddRecommendation({
                    ...recommendation,
                    description: recommendation?.reason
                  })}
                  iconName="Plus"
                  iconSize={14}
                  className="text-primary hover:text-primary"
                />
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(recommendation?.priority)}`}>
                  {recommendation?.priority} Priority
                </span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(recommendation?.difficulty)}`}>
                  {recommendation?.difficulty}
                </span>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Icon name="Clock" size={12} className="mr-1" />
                  {recommendation?.duration}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {recommendation?.skills?.slice(0, 2)?.map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-muted text-xs rounded">
                      {skill}
                    </span>
                  ))}
                  {recommendation?.skills?.length > 2 && (
                    <span className="px-2 py-1 bg-muted text-xs rounded">
                      +{recommendation?.skills?.length - 2}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center text-xs text-success">
                  <Icon name="Target" size={12} className="mr-1" />
                  {recommendation?.jobMatch}% job match
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* No Recommendations */}
      {!isLoading && recommendations?.length === 0 && (
        <div className="p-6 text-center">
          <Icon name="CheckCircle" size={32} className="mx-auto text-success mb-2" />
          <p className="text-sm text-muted-foreground">
            Great! You have all the recommended modules for this career path.
          </p>
        </div>
      )}
    </div>
  );
};

export default AIRecommendations;