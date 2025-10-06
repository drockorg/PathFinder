import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PathTemplates = ({ onSelectTemplate }) => {
  const templates = [
    {
      id: 'web-developer-beginner',
      name: 'Web Developer (Beginner)',
      description: 'Complete path from HTML basics to full-stack development',
      duration: '16 weeks',
      modules: 8,
      difficulty: 'Beginner to Intermediate',
      icon: 'Code',
      color: 'bg-blue-100 text-blue-700',
      popularity: 95,
      jobOpportunities: 127,
      modules_list: [
        { id: 'html-css-basics', title: 'HTML & CSS Fundamentals', duration: '2 weeks', difficulty: 'Beginner' },
        { id: 'javascript-intro', title: 'JavaScript Introduction', duration: '3 weeks', difficulty: 'Beginner' },
        { id: 'responsive-design', title: 'Responsive Web Design', duration: '2 weeks', difficulty: 'Intermediate' },
        { id: 'react-basics', title: 'React.js Fundamentals', duration: '3 weeks', difficulty: 'Intermediate' },
        { id: 'node-intro', title: 'Node.js & Express', duration: '3 weeks', difficulty: 'Intermediate' },
        { id: 'database-basics', title: 'Database Integration', duration: '2 weeks', difficulty: 'Intermediate' },
        { id: 'deployment', title: 'Web App Deployment', duration: '1 week', difficulty: 'Intermediate' }
      ]
    },
    {
      id: 'digital-marketing-ghana',
      name: 'Digital Marketing (Ghana Focus)',
      description: 'Marketing strategies tailored for the Ghanaian market',
      duration: '12 weeks',
      modules: 6,
      difficulty: 'Beginner to Intermediate',
      icon: 'TrendingUp',
      color: 'bg-green-100 text-green-700',
      popularity: 88,
      jobOpportunities: 89,
      modules_list: [
        { id: 'digital-marketing-basics', title: 'Digital Marketing Fundamentals', duration: '2 weeks', difficulty: 'Beginner' },
        { id: 'social-media-ghana', title: 'Social Media Marketing in Ghana', duration: '3 weeks', difficulty: 'Beginner' },
        { id: 'content-creation', title: 'Content Creation & Strategy', duration: '2 weeks', difficulty: 'Intermediate' },
        { id: 'paid-advertising', title: 'Facebook & Google Ads', duration: '3 weeks', difficulty: 'Intermediate' },
        { id: 'analytics-reporting', title: 'Marketing Analytics & Reporting', duration: '2 weeks', difficulty: 'Intermediate' }
      ]
    },
    {
      id: 'data-analyst-python',
      name: 'Data Analyst with Python',
      description: 'From spreadsheets to Python-powered data analysis',
      duration: '14 weeks',
      modules: 7,
      difficulty: 'Beginner to Advanced',
      icon: 'BarChart3',
      color: 'bg-purple-100 text-purple-700',
      popularity: 76,
      jobOpportunities: 54,
      modules_list: [
        { id: 'excel-advanced', title: 'Advanced Excel & Spreadsheets', duration: '2 weeks', difficulty: 'Beginner' },
        { id: 'python-basics', title: 'Python Programming Basics', duration: '3 weeks', difficulty: 'Beginner' },
        { id: 'pandas-numpy', title: 'Data Manipulation with Pandas', duration: '3 weeks', difficulty: 'Intermediate' },
        { id: 'data-visualization', title: 'Data Visualization', duration: '2 weeks', difficulty: 'Intermediate' },
        { id: 'statistics-basics', title: 'Statistics for Data Analysis', duration: '2 weeks', difficulty: 'Intermediate' },
        { id: 'sql-analysis', title: 'SQL for Data Analysis', duration: '2 weeks', difficulty: 'Advanced' }
      ]
    },
    {
      id: 'entrepreneur-ghana',
      name: 'Entrepreneur (Ghana)',
      description: 'Start and grow your business in Ghana',
      duration: '10 weeks',
      modules: 5,
      difficulty: 'Beginner to Intermediate',
      icon: 'Briefcase',
      color: 'bg-orange-100 text-orange-700',
      popularity: 82,
      jobOpportunities: 'Self-employed',
      modules_list: [
        { id: 'business-planning', title: 'Business Planning & Strategy', duration: '2 weeks', difficulty: 'Beginner' },
        { id: 'ghana-business-law', title: 'Ghana Business Registration & Law', duration: '2 weeks', difficulty: 'Intermediate' },
        { id: 'financial-management', title: 'Financial Management for SMEs', duration: '3 weeks', difficulty: 'Intermediate' },
        { id: 'marketing-smes', title: 'Marketing for Small Businesses', duration: '2 weeks', difficulty: 'Beginner' },
        { id: 'scaling-business', title: 'Scaling Your Business', duration: '1 week', difficulty: 'Intermediate' }
      ]
    },
    {
      id: 'mobile-app-developer',
      name: 'Mobile App Developer',
      description: 'Build mobile apps for Android and iOS',
      duration: '18 weeks',
      modules: 9,
      difficulty: 'Intermediate to Advanced',
      icon: 'Smartphone',
      color: 'bg-indigo-100 text-indigo-700',
      popularity: 71,
      jobOpportunities: 43,
      modules_list: [
        { id: 'mobile-dev-basics', title: 'Mobile Development Fundamentals', duration: '2 weeks', difficulty: 'Intermediate' },
        { id: 'react-native', title: 'React Native Development', duration: '4 weeks', difficulty: 'Intermediate' },
        { id: 'ui-ux-mobile', title: 'Mobile UI/UX Design', duration: '2 weeks', difficulty: 'Intermediate' },
        { id: 'api-integration', title: 'API Integration & Backend', duration: '3 weeks', difficulty: 'Advanced' },
        { id: 'app-store-deployment', title: 'App Store Deployment', duration: '1 week', difficulty: 'Advanced' }
      ]
    },
    {
      id: 'cybersecurity-basics',
      name: 'Cybersecurity Fundamentals',
      description: 'Protect digital assets and learn security basics',
      duration: '12 weeks',
      modules: 6,
      difficulty: 'Beginner to Intermediate',
      icon: 'Shield',
      color: 'bg-red-100 text-red-700',
      popularity: 68,
      jobOpportunities: 38,
      modules_list: [
        { id: 'security-basics', title: 'Cybersecurity Fundamentals', duration: '2 weeks', difficulty: 'Beginner' },
        { id: 'network-security', title: 'Network Security', duration: '3 weeks', difficulty: 'Intermediate' },
        { id: 'ethical-hacking', title: 'Ethical Hacking Basics', duration: '3 weeks', difficulty: 'Intermediate' },
        { id: 'incident-response', title: 'Incident Response', duration: '2 weeks', difficulty: 'Intermediate' },
        { id: 'security-tools', title: 'Security Tools & Technologies', duration: '2 weeks', difficulty: 'Intermediate' }
      ]
    }
  ];

  const getDifficultyColor = (difficulty) => {
    if (difficulty?.includes('Beginner')) return 'bg-green-100 text-green-700';
    if (difficulty?.includes('Advanced')) return 'bg-red-100 text-red-700';
    return 'bg-yellow-100 text-yellow-700';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Popular Learning Path Templates</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Start with proven paths designed for the Ghanaian job market
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates?.map((template) => (
          <div key={template?.id} className="bg-card border border-border rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-start space-x-3 mb-3">
              <div className={`p-2 rounded-lg ${template?.color} flex-shrink-0`}>
                <Icon name={template?.icon} size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground">{template?.name}</h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{template?.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Icon name="Clock" size={14} className="mr-2" />
                  {template?.duration}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Icon name="BookOpen" size={14} className="mr-2" />
                  {template?.modules} modules
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Icon name="TrendingUp" size={14} className="mr-2" />
                  {template?.popularity}% popular
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Icon name="Briefcase" size={14} className="mr-2" />
                  {typeof template?.jobOpportunities === 'number' ? `${template?.jobOpportunities} jobs` : template?.jobOpportunities}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(template?.difficulty)}`}>
                {template?.difficulty}
              </span>
              <div className="flex items-center text-xs text-success">
                <Icon name="CheckCircle" size={12} className="mr-1" />
                Job-ready curriculum
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <p className="text-xs font-medium text-muted-foreground">Sample modules:</p>
              <div className="space-y-1">
                {template?.modules_list?.slice(0, 3)?.map((module, index) => (
                  <div key={index} className="flex items-center justify-between text-xs">
                    <span className="text-foreground">{module.title}</span>
                    <span className="text-muted-foreground">{module.duration}</span>
                  </div>
                ))}
                {template?.modules_list?.length > 3 && (
                  <div className="text-xs text-muted-foreground">
                    +{template?.modules_list?.length - 3} more modules
                  </div>
                )}
              </div>
            </div>

            <Button
              variant="outline"
              fullWidth
              onClick={() => onSelectTemplate(template)}
              iconName="ArrowRight"
              iconPosition="right"
              iconSize={14}
            >
              Use This Template
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PathTemplates;