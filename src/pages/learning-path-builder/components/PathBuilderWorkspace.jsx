import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PathBuilderWorkspace = ({ pathModules, onRemoveModule, onReorderModules, onSavePath, onPreviewPath }) => {
  const [pathName, setPathName] = useState('My Learning Path');
  const [pathDescription, setPathDescription] = useState('');
  const [draggedIndex, setDraggedIndex] = useState(null);

  const totalDuration = pathModules?.reduce((total, module) => {
    const weeks = parseInt(module.duration?.split(' ')?.[0]);
    return total + weeks;
  }, 0);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, dropIndex) => {
    e?.preventDefault();
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      const newModules = [...pathModules];
      const draggedModule = newModules?.[draggedIndex];
      newModules?.splice(draggedIndex, 1);
      newModules?.splice(dropIndex, 0, draggedModule);
      onReorderModules(newModules);
    }
    setDraggedIndex(null);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'Advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getProgressPercentage = (index) => {
    return ((index + 1) / pathModules?.length) * 100;
  };

  return (
    <div className="flex-1 bg-background p-6 overflow-y-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1 mr-4">
            <input
              type="text"
              value={pathName}
              onChange={(e) => setPathName(e?.target?.value)}
              className="text-2xl font-bold text-foreground bg-transparent border-none outline-none focus:bg-muted rounded px-2 py-1 w-full"
              placeholder="Enter path name..."
            />
            <textarea
              value={pathDescription}
              onChange={(e) => setPathDescription(e?.target?.value)}
              placeholder="Add a description for your learning path..."
              className="mt-2 w-full text-muted-foreground bg-transparent border border-border rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              rows={2}
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={onPreviewPath}
              iconName="Eye"
              iconPosition="left"
              iconSize={16}
              disabled={pathModules?.length === 0}
            >
              Preview
            </Button>
            <Button
              variant="default"
              onClick={() => onSavePath({ name: pathName, description: pathDescription, modules: pathModules })}
              iconName="Save"
              iconPosition="left"
              iconSize={16}
              disabled={pathModules?.length === 0}
            >
              Save Path
            </Button>
          </div>
        </div>

        {/* Path Stats */}
        <div className="flex items-center space-x-6 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Icon name="BookOpen" size={16} className="mr-2" />
            {pathModules?.length} modules
          </div>
          <div className="flex items-center">
            <Icon name="Clock" size={16} className="mr-2" />
            {totalDuration} weeks total
          </div>
          <div className="flex items-center">
            <Icon name="Target" size={16} className="mr-2" />
            Custom learning path
          </div>
        </div>
      </div>
      {/* Empty State */}
      {pathModules?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
            <Icon name="Plus" size={32} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Start Building Your Path</h3>
          <p className="text-muted-foreground mb-4 max-w-md">
            Drag and drop learning modules from the sidebar to create your personalized learning journey.
          </p>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="ArrowLeft" size={16} />
            <span>Select modules from the sidebar</span>
          </div>
        </div>
      )}
      {/* Learning Path Timeline */}
      {pathModules?.length > 0 && (
        <div className="space-y-4">
          {pathModules?.map((module, index) => (
            <div
              key={`${module.id}-${index}`}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              className="relative bg-card border border-border rounded-lg p-4 hover:shadow-sm transition-all cursor-move group"
            >
              {/* Progress Line */}
              {index < pathModules?.length - 1 && (
                <div className="absolute left-8 top-16 w-0.5 h-8 bg-border"></div>
              )}

              <div className="flex items-start space-x-4">
                {/* Step Number */}
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </div>

                {/* Module Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-foreground">{module.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{module.description}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveModule(index)}
                        iconName="X"
                        iconSize={16}
                        className="text-muted-foreground hover:text-destructive"
                      />
                      <Icon name="GripVertical" size={16} className="text-muted-foreground cursor-move" />
                    </div>
                  </div>

                  {/* Module Details */}
                  <div className="flex items-center space-x-4 mb-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(module.difficulty)}`}>
                      {module.difficulty}
                    </span>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Icon name="Clock" size={14} className="mr-1" />
                      {module.duration}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Icon name="BarChart3" size={14} className="mr-1" />
                      {Math.round(getProgressPercentage(index))}% complete
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {module.skills?.map((skill, skillIndex) => (
                      <span key={skillIndex} className="px-2 py-1 bg-muted text-xs rounded">
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Prerequisites Warning */}
                  {module.prerequisites?.length > 0 && (
                    <div className="flex items-center text-xs text-warning bg-warning/10 px-2 py-1 rounded">
                      <Icon name="AlertTriangle" size={12} className="mr-1" />
                      Requires completion of previous modules
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Completion Card */}
          <div className="relative bg-success/10 border border-success/20 rounded-lg p-4">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-success text-success-foreground rounded-full flex items-center justify-center">
                <Icon name="Trophy" size={16} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Path Completion</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Congratulations! You'll have completed your custom learning path and gained valuable skills.
                </p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center text-sm text-success">
                    <Icon name="Award" size={14} className="mr-1" />
                    Certificate earned
                  </div>
                  <div className="flex items-center text-sm text-success">
                    <Icon name="Briefcase" size={14} className="mr-1" />
                    Job-ready skills
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PathBuilderWorkspace;