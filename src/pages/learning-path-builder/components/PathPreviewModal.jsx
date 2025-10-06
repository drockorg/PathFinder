import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PathPreviewModal = ({ isOpen, onClose, pathData, onStartPath }) => {
  if (!isOpen || !pathData) return null;

  const totalDuration = pathData?.modules?.reduce((total, module) => {
    const weeks = parseInt(module.duration?.split(' ')?.[0]);
    return total + weeks;
  }, 0);

  const skillsCount = [...new Set(pathData.modules.flatMap(m => m.skills))]?.length;

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'Advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getProgressPercentage = (index) => {
    return ((index + 1) / pathData?.modules?.length) * 100;
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">{pathData?.name}</h2>
            <p className="text-muted-foreground text-sm mt-1">Learning Path Preview</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
            iconSize={20}
          />
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Path Overview */}
          <div className="p-6 border-b border-border">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-background rounded-lg p-3 text-center">
                <Icon name="BookOpen" size={24} className="mx-auto text-primary mb-2" />
                <div className="text-lg font-semibold text-foreground">{pathData?.modules?.length}</div>
                <div className="text-xs text-muted-foreground">Modules</div>
              </div>
              <div className="bg-background rounded-lg p-3 text-center">
                <Icon name="Clock" size={24} className="mx-auto text-primary mb-2" />
                <div className="text-lg font-semibold text-foreground">{totalDuration}</div>
                <div className="text-xs text-muted-foreground">Weeks</div>
              </div>
              <div className="bg-background rounded-lg p-3 text-center">
                <Icon name="Target" size={24} className="mx-auto text-primary mb-2" />
                <div className="text-lg font-semibold text-foreground">{skillsCount}</div>
                <div className="text-xs text-muted-foreground">Skills</div>
              </div>
              <div className="bg-background rounded-lg p-3 text-center">
                <Icon name="Award" size={24} className="mx-auto text-primary mb-2" />
                <div className="text-lg font-semibold text-foreground">1</div>
                <div className="text-xs text-muted-foreground">Certificate</div>
              </div>
            </div>

            {pathData?.description && (
              <div className="bg-muted rounded-lg p-4">
                <h3 className="font-medium text-foreground mb-2">Description</h3>
                <p className="text-sm text-muted-foreground">{pathData?.description}</p>
              </div>
            )}
          </div>

          {/* Learning Timeline */}
          <div className="p-6">
            <h3 className="font-semibold text-foreground mb-4">Learning Timeline</h3>
            <div className="space-y-4">
              {pathData?.modules?.map((module, index) => (
                <div key={`${module.id}-${index}`} className="relative">
                  {/* Progress Line */}
                  {index < pathData?.modules?.length - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-8 bg-border"></div>
                  )}

                  <div className="flex items-start space-x-4">
                    {/* Step Number */}
                    <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-medium">
                      {index + 1}
                    </div>

                    {/* Module Content */}
                    <div className="flex-1 bg-background rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-foreground">{module.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{module.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-foreground">{Math.round(getProgressPercentage(index))}%</div>
                          <div className="text-xs text-muted-foreground">Complete</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 mb-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(module.difficulty)}`}>
                          {module.difficulty}
                        </span>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Icon name="Clock" size={14} className="mr-1" />
                          {module.duration}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {module.skills?.map((skill, skillIndex) => (
                          <span key={skillIndex} className="px-2 py-1 bg-muted text-xs rounded">
                            {skill}
                          </span>
                        ))}
                      </div>

                      {module.prerequisites && module.prerequisites?.length > 0 && (
                        <div className="mt-2 flex items-center text-xs text-warning">
                          <Icon name="AlertTriangle" size={12} className="mr-1" />
                          Requires completion of previous modules
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Completion */}
              <div className="relative">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-success text-success-foreground rounded-full flex items-center justify-center">
                    <Icon name="Trophy" size={20} />
                  </div>
                  <div className="flex-1 bg-success/10 border border-success/20 rounded-lg p-4">
                    <h4 className="font-medium text-foreground mb-1">Path Completion</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Congratulations! You'll receive a certificate and be ready for job opportunities.
                    </p>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-sm text-success">
                        <Icon name="Award" size={14} className="mr-1" />
                        Certificate earned
                      </div>
                      <div className="flex items-center text-sm text-success">
                        <Icon name="Briefcase" size={14} className="mr-1" />
                        Job-ready skills
                      </div>
                      <div className="flex items-center text-sm text-success">
                        <Icon name="Users" size={14} className="mr-1" />
                        Portfolio projects
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/50">
          <div className="text-sm text-muted-foreground">
            Ready to start your learning journey?
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Back to Builder
            </Button>
            <Button
              variant="default"
              onClick={() => onStartPath(pathData)}
              iconName="Play"
              iconPosition="left"
              iconSize={16}
            >
              Start Learning Path
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PathPreviewModal;