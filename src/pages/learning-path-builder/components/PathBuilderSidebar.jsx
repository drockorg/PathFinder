import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PathBuilderSidebar = ({ onAddModule, selectedCategory, onCategoryChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    {
      id: 'technical',
      name: 'Technical Skills',
      icon: 'Code',
      color: 'bg-blue-100 text-blue-700',
      modules: [
        {
          id: 'web-dev-basics',
          title: 'Web Development Fundamentals',
          duration: '4 weeks',
          difficulty: 'Beginner',
          description: 'HTML, CSS, JavaScript basics',
          prerequisites: [],
          skills: ['HTML', 'CSS', 'JavaScript']
        },
        {
          id: 'react-intro',
          title: 'React.js Introduction',
          duration: '3 weeks',
          difficulty: 'Intermediate',
          description: 'Modern React development',
          prerequisites: ['web-dev-basics'],
          skills: ['React', 'JSX', 'Components']
        },
        {
          id: 'python-basics',
          title: 'Python Programming',
          duration: '5 weeks',
          difficulty: 'Beginner',
          description: 'Python fundamentals and syntax',
          prerequisites: [],
          skills: ['Python', 'Programming Logic']
        },
        {
          id: 'data-analysis',
          title: 'Data Analysis with Python',
          duration: '6 weeks',
          difficulty: 'Intermediate',
          description: 'Pandas, NumPy, data visualization',
          prerequisites: ['python-basics'],
          skills: ['Data Analysis', 'Pandas', 'NumPy']
        }
      ]
    },
    {
      id: 'soft-skills',
      name: 'Soft Skills',
      icon: 'Users',
      color: 'bg-green-100 text-green-700',
      modules: [
        {
          id: 'communication',
          title: 'Professional Communication',
          duration: '2 weeks',
          difficulty: 'Beginner',
          description: 'Workplace communication skills',
          prerequisites: [],
          skills: ['Communication', 'Presentation']
        },
        {
          id: 'leadership',
          title: 'Leadership Fundamentals',
          duration: '3 weeks',
          difficulty: 'Intermediate',
          description: 'Team leadership and management',
          prerequisites: ['communication'],
          skills: ['Leadership', 'Team Management']
        },
        {
          id: 'problem-solving',
          title: 'Critical Thinking & Problem Solving',
          duration: '2 weeks',
          difficulty: 'Beginner',
          description: 'Analytical thinking techniques',
          prerequisites: [],
          skills: ['Problem Solving', 'Critical Thinking']
        }
      ]
    },
    {
      id: 'ghana-specific',
      name: 'Ghana Professional Development',
      icon: 'MapPin',
      color: 'bg-orange-100 text-orange-700',
      modules: [
        {
          id: 'ghana-business',
          title: 'Ghana Business Environment',
          duration: '2 weeks',
          difficulty: 'Beginner',
          description: 'Understanding local business culture',
          prerequisites: [],
          skills: ['Local Business', 'Cultural Awareness']
        },
        {
          id: 'entrepreneurship-ghana',
          title: 'Entrepreneurship in Ghana',
          duration: '4 weeks',
          difficulty: 'Intermediate',
          description: 'Starting a business in Ghana',
          prerequisites: ['ghana-business'],
          skills: ['Entrepreneurship', 'Business Planning']
        },
        {
          id: 'digital-ghana',
          title: 'Digital Ghana Initiative',
          duration: '1 week',
          difficulty: 'Beginner',
          description: 'Government digital transformation',
          prerequisites: [],
          skills: ['Digital Literacy', 'E-Government']
        }
      ]
    },
    {
      id: 'certifications',
      name: 'Certifications',
      icon: 'Award',
      color: 'bg-purple-100 text-purple-700',
      modules: [
        {
          id: 'google-analytics',
          title: 'Google Analytics Certification',
          duration: '1 week',
          difficulty: 'Intermediate',
          description: 'Web analytics certification',
          prerequisites: [],
          skills: ['Analytics', 'Digital Marketing']
        },
        {
          id: 'aws-cloud',
          title: 'AWS Cloud Practitioner',
          duration: '3 weeks',
          difficulty: 'Intermediate',
          description: 'Cloud computing fundamentals',
          prerequisites: [],
          skills: ['Cloud Computing', 'AWS']
        },
        {
          id: 'project-management',
          title: 'Project Management Professional',
          duration: '6 weeks',
          difficulty: 'Advanced',
          description: 'PMP certification preparation',
          prerequisites: ['leadership'],
          skills: ['Project Management', 'Planning']
        }
      ]
    }
  ];

  const currentCategory = categories?.find(cat => cat?.id === selectedCategory) || categories?.[0];
  
  const filteredModules = currentCategory?.modules?.filter(module =>
    module.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    module.skills?.some(skill => skill?.toLowerCase()?.includes(searchTerm?.toLowerCase()))
  );

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'Advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="w-80 bg-card border-r border-border h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground mb-3">Learning Modules</h2>
        
        {/* Search */}
        <div className="relative mb-4">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search modules..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Category Tabs */}
        <div className="grid grid-cols-2 gap-2">
          {categories?.map((category) => (
            <Button
              key={category?.id}
              variant={selectedCategory === category?.id ? "default" : "outline"}
              size="sm"
              onClick={() => onCategoryChange(category?.id)}
              iconName={category?.icon}
              iconPosition="left"
              iconSize={14}
              className="text-xs justify-start"
            >
              {category?.name?.split(' ')?.[0]}
            </Button>
          ))}
        </div>
      </div>
      {/* Modules List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredModules?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No modules found</p>
          </div>
        ) : (
          filteredModules?.map((module) => (
            <div
              key={module.id}
              className="bg-background border border-border rounded-lg p-3 hover:shadow-sm transition-shadow cursor-pointer"
              onClick={() => onAddModule(module)}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-foreground text-sm leading-tight">{module.title}</h3>
                <Icon name="Plus" size={16} className="text-muted-foreground hover:text-primary transition-colors" />
              </div>
              
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{module.description}</p>
              
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(module.difficulty)}`}>
                    {module.difficulty}
                  </span>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Icon name="Clock" size={12} className="mr-1" />
                    {module.duration}
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1">
                {module.skills?.slice(0, 3)?.map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-muted text-xs rounded">
                    {skill}
                  </span>
                ))}
                {module.skills?.length > 3 && (
                  <span className="px-2 py-1 bg-muted text-xs rounded">
                    +{module.skills?.length - 3}
                  </span>
                )}
              </div>

              {/* Prerequisites */}
              {module.prerequisites?.length > 0 && (
                <div className="mt-2 flex items-center text-xs text-muted-foreground">
                  <Icon name="Link" size={12} className="mr-1" />
                  Requires: {module.prerequisites?.length} module(s)
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PathBuilderSidebar;