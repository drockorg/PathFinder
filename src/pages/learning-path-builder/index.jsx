import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import PathBuilderSidebar from './components/PathBuilderSidebar';
import PathBuilderWorkspace from './components/PathBuilderWorkspace';
import AIRecommendations from './components/AIRecommendations';
import PathTemplates from './components/PathTemplates';
import PathPreviewModal from './components/PathPreviewModal';

const LearningPathBuilder = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('builder'); // 'builder', 'templates', 'recommendations'
  const [selectedCategory, setSelectedCategory] = useState('technical');
  const [selectedCareer, setSelectedCareer] = useState('');
  const [pathModules, setPathModules] = useState([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [savedPaths, setSavedPaths] = useState([]);

  const careerOptions = [
    { value: '', label: 'Select career goal...' },
    { value: 'software-developer', label: 'Software Developer' },
    { value: 'digital-marketer', label: 'Digital Marketer' },
    { value: 'data-analyst', label: 'Data Analyst' },
    { value: 'entrepreneur', label: 'Entrepreneur' },
    { value: 'mobile-developer', label: 'Mobile App Developer' },
    { value: 'cybersecurity', label: 'Cybersecurity Specialist' }
  ];

  // Load saved paths from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('learningPaths');
    if (saved) {
      setSavedPaths(JSON.parse(saved));
    }
  }, []);

  const handleAddModule = (module) => {
    // Check if module already exists
    const exists = pathModules?.some(m => m?.id === module.id);
    if (!exists) {
      setPathModules([...pathModules, module]);
    }
  };

  const handleRemoveModule = (index) => {
    const newModules = pathModules?.filter((_, i) => i !== index);
    setPathModules(newModules);
  };

  const handleReorderModules = (newModules) => {
    setPathModules(newModules);
  };

  const handleSavePath = (pathData) => {
    const newPath = {
      id: Date.now()?.toString(),
      ...pathData,
      createdAt: new Date()?.toISOString(),
      status: 'draft'
    };
    
    const updatedPaths = [...savedPaths, newPath];
    setSavedPaths(updatedPaths);
    localStorage.setItem('learningPaths', JSON.stringify(updatedPaths));
    
    // Show success message (you could add a toast notification here)
    alert('Learning path saved successfully!');
  };

  const handlePreviewPath = () => {
    const pathData = {
      name: 'My Learning Path',
      description: 'Custom learning path created with AI recommendations',
      modules: pathModules
    };
    setPreviewData(pathData);
    setIsPreviewOpen(true);
  };

  const handleStartPath = (pathData) => {
    // Save the path and navigate to dashboard
    handleSavePath(pathData);
    setIsPreviewOpen(false);
    navigate('/student-dashboard');
  };

  const handleSelectTemplate = (template) => {
    setPathModules(template?.modules_list);
    setCurrentView('builder');
  };

  const handleAddRecommendation = (recommendation) => {
    handleAddModule(recommendation);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="student" />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          <NavigationBreadcrumbs userRole="student" />
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                Learning Path Builder
              </h1>
              <p className="text-muted-foreground">
                Create personalized learning journeys aligned with your career goals
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Select
                options={careerOptions}
                value={selectedCareer}
                onChange={setSelectedCareer}
                placeholder="Select career goal"
                className="w-48"
              />
              
              <div className="flex items-center bg-muted rounded-lg p-1">
                <Button
                  variant={currentView === 'templates' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setCurrentView('templates')}
                  iconName="Layout"
                  iconSize={16}
                >
                  Templates
                </Button>
                <Button
                  variant={currentView === 'builder' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setCurrentView('builder')}
                  iconName="Wrench"
                  iconSize={16}
                >
                  Builder
                </Button>
                <Button
                  variant={currentView === 'recommendations' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setCurrentView('recommendations')}
                  iconName="Sparkles"
                  iconSize={16}
                >
                  AI Recommendations
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            {currentView === 'templates' && (
              <div className="p-6">
                <PathTemplates onSelectTemplate={handleSelectTemplate} />
              </div>
            )}

            {currentView === 'builder' && (
              <div className="flex h-[calc(100vh-200px)]">
                <PathBuilderSidebar
                  onAddModule={handleAddModule}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                />
                <PathBuilderWorkspace
                  pathModules={pathModules}
                  onRemoveModule={handleRemoveModule}
                  onReorderModules={handleReorderModules}
                  onSavePath={handleSavePath}
                  onPreviewPath={handlePreviewPath}
                />
              </div>
            )}

            {currentView === 'recommendations' && (
              <div className="p-6">
                <div className="max-w-4xl mx-auto">
                  <AIRecommendations
                    selectedCareer={selectedCareer}
                    currentModules={pathModules}
                    onAddRecommendation={handleAddRecommendation}
                  />
                  
                  {pathModules?.length > 0 && (
                    <div className="mt-8 p-4 bg-muted rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-foreground">Current Path Progress</h3>
                          <p className="text-sm text-muted-foreground">
                            {pathModules?.length} modules added to your learning path
                          </p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Button
                            variant="outline"
                            onClick={() => setCurrentView('builder')}
                            iconName="Edit"
                            iconSize={16}
                          >
                            Edit Path
                          </Button>
                          <Button
                            variant="default"
                            onClick={handlePreviewPath}
                            iconName="Eye"
                            iconSize={16}
                          >
                            Preview Path
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          {pathModules?.length > 0 && currentView !== 'recommendations' && (
            <div className="mt-6 bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Icon name="BookOpen" size={16} className="mr-2" />
                    {pathModules?.length} modules
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Icon name="Clock" size={16} className="mr-2" />
                    {pathModules?.reduce((total, module) => {
                      const weeks = parseInt(module.duration?.split(' ')?.[0]);
                      return total + weeks;
                    }, 0)} weeks total
                  </div>
                  <div className="flex items-center text-sm text-success">
                    <Icon name="CheckCircle" size={16} className="mr-2" />
                    Ready to save
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setPathModules([])}
                    iconName="RotateCcw"
                    iconSize={16}
                  >
                    Clear All
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handlePreviewPath}
                    iconName="Eye"
                    iconSize={16}
                  >
                    Preview
                  </Button>
                  <Button
                    variant="default"
                    onClick={() => handleSavePath({
                      name: 'My Learning Path',
                      description: 'Custom learning path',
                      modules: pathModules
                    })}
                    iconName="Save"
                    iconSize={16}
                  >
                    Save Path
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Preview Modal */}
      <PathPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        pathData={previewData}
        onStartPath={handleStartPath}
      />
    </div>
  );
};

export default LearningPathBuilder;