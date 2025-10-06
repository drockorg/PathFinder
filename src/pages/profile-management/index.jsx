import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import ProfileOverview from './components/ProfileOverview';
import PersonalInformation from './components/PersonalInformation';
import EducationBackground from './components/EducationBackground';
import SkillsInventory from './components/SkillsInventory';
import CareerPreferences from './components/CareerPreferences';
import PortfolioSection from './components/PortfolioSection';
import PrivacySettings from './components/PrivacySettings';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';



const ProfileManagement = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('personal');
  const [userRole, setUserRole] = useState('student'); // Can be 'student' or 'employer'
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Mock user profile data
  const [profileData, setProfileData] = useState({
    personal: {
      firstName: 'Kwame',
      lastName: 'Asante',
      email: 'kwame.asante@pathfinders.gh',
      phone: '+233 24 123 4567',
      dateOfBirth: '1998-05-15',
      gender: 'male',
      location: 'Accra, Ghana',
      region: 'Greater Accra',
      profilePicture: null,
      bio: 'Aspiring full-stack developer passionate about creating innovative solutions for Ghana\'s digital transformation.',
      linkedin: 'linkedin.com/in/kwame-asante',
      github: 'github.com/kwame-asante',
      portfolio: 'kwameasante.dev'
    },
    education: [
      {
        id: 'edu-1',
        institution: 'University of Ghana',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        startDate: '2018-09',
        endDate: '2022-06',
        grade: 'Second Class Upper',
        isCurrently: false
      },
      {
        id: 'edu-2',
        institution: 'Ghana Institute of Management and Public Administration',
        degree: 'Certificate',
        field: 'Digital Marketing',
        startDate: '2023-01',
        endDate: '2023-06',
        grade: 'Distinction',
        isCurrently: false
      }
    ],
    skills: {
      technical: [
        { name: 'JavaScript', level: 85, verified: true, category: 'Programming' },
        { name: 'React', level: 80, verified: true, category: 'Frontend' },
        { name: 'Node.js', level: 75, verified: false, category: 'Backend' },
        { name: 'Python', level: 70, verified: true, category: 'Programming' },
        { name: 'HTML/CSS', level: 90, verified: true, category: 'Frontend' },
        { name: 'MongoDB', level: 65, verified: false, category: 'Database' }
      ],
      soft: [
        { name: 'Communication', level: 88, verified: true, category: 'Interpersonal' },
        { name: 'Problem Solving', level: 82, verified: true, category: 'Analytical' },
        { name: 'Teamwork', level: 85, verified: false, category: 'Collaboration' },
        { name: 'Leadership', level: 78, verified: false, category: 'Management' },
        { name: 'Time Management', level: 80, verified: true, category: 'Organization' }
      ]
    },
    careerPreferences: {
      jobTypes: ['full-time', 'contract'],
      workArrangement: 'hybrid',
      salaryRange: { min: 6000, max: 12000, currency: 'GHS' },
      preferredLocations: ['Accra', 'Kumasi', 'Remote'],
      industries: ['Technology', 'Fintech', 'E-commerce', 'Education'],
      careerGoals: 'Become a senior full-stack developer and eventually start my own tech company in Ghana',
      availabilityDate: '2025-11-01',
      willingToRelocate: true
    },
    portfolio: [
      {
        id: 'port-1',
        title: 'E-Commerce Platform for Local Businesses',
        description: 'A comprehensive online marketplace connecting Ghanaian small businesses with customers',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        imageUrl: null,
        projectUrl: 'https://ghanamarketplace.demo',
        githubUrl: 'https://github.com/kwame-asante/ghana-marketplace',
        type: 'web-application',
        featured: true
      },
      {
        id: 'port-2',
        title: 'Mobile Money Integration Library',
        description: 'JavaScript library for easy integration with Ghana\'s mobile money services',
        technologies: ['JavaScript', 'API Integration', 'Documentation'],
        imageUrl: null,
        projectUrl: null,
        githubUrl: 'https://github.com/kwame-asante/momo-js',
        type: 'library',
        featured: false
      }
    ],
    privacy: {
      profileVisibility: 'public',
      contactInfoVisible: 'verified-employers',
      skillsVisible: 'public',
      portfolioVisible: 'public',
      educationVisible: 'public',
      allowJobAlerts: true,
      allowMentorshipRequests: true,
      allowSkillEndorsements: true,
      twoFactorEnabled: false
    },
    completionStats: {
      overall: 85,
      sections: {
        personal: 95,
        education: 100,
        skills: 80,
        career: 75,
        portfolio: 60,
        privacy: 90
      }
    }
  });

  const profileTabs = [
    { id: 'personal', name: 'Personal Info', icon: 'User', description: 'Basic information and contact details' },
    { id: 'education', name: 'Education', icon: 'GraduationCap', description: 'Academic background and certifications' },
    { id: 'skills', name: 'Skills', icon: 'Brain', description: 'Technical and soft skills inventory' },
    { id: 'career', name: 'Career Preferences', icon: 'Briefcase', description: 'Job preferences and career goals' },
    { id: 'portfolio', name: 'Portfolio', icon: 'FolderOpen', description: 'Projects and work samples' },
    { id: 'privacy', name: 'Privacy & Settings', icon: 'Shield', description: 'Control your profile visibility' }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleProfileUpdate = (section, data) => {
    setProfileData(prev => ({
      ...prev,
      [section]: { ...prev?.[section], ...data }
    }));
    setHasUnsavedChanges(true);
  };

  const handleSaveChanges = async () => {
    // Simulate saving
    setIsLoading(true);
    
    setTimeout(() => {
      setHasUnsavedChanges(false);
      setIsLoading(false);
      // Show success notification
    }, 1500);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header userRole={userRole} isAuthenticated={true} />
        <div className="pt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-muted rounded w-1/4"></div>
              <div className="h-48 bg-muted rounded-xl"></div>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="h-96 bg-muted rounded-xl"></div>
                <div className="lg:col-span-3 h-96 bg-muted rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return (
          <PersonalInformation 
            data={profileData?.personal}
            onUpdate={(data) => handleProfileUpdate('personal', data)}
          />
        );
      case 'education':
        return (
          <EducationBackground 
            data={profileData?.education}
            onUpdate={(data) => handleProfileUpdate('education', data)}
          />
        );
      case 'skills':
        return (
          <SkillsInventory 
            data={profileData?.skills}
            onUpdate={(data) => handleProfileUpdate('skills', data)}
          />
        );
      case 'career':
        return (
          <CareerPreferences 
            data={profileData?.careerPreferences}
            onUpdate={(data) => handleProfileUpdate('careerPreferences', data)}
          />
        );
      case 'portfolio':
        return (
          <PortfolioSection 
            data={profileData?.portfolio}
            onUpdate={(data) => handleProfileUpdate('portfolio', data)}
          />
        );
      case 'privacy':
        return (
          <PrivacySettings 
            data={profileData?.privacy}
            onUpdate={(data) => handleProfileUpdate('privacy', data)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userRole={userRole} isAuthenticated={true} />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <NavigationBreadcrumbs 
            userRole={userRole} 
            customPath={[
              { name: 'Dashboard', href: userRole === 'student' ? '/student-dashboard' : '/employer-dashboard' },
              { name: 'Profile Management', href: '/profile-management' }
            ]}
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Profile Overview */}
            <ProfileOverview 
              profileData={profileData}
              hasUnsavedChanges={hasUnsavedChanges}
              onSave={handleSaveChanges}
            />

            {/* Main Profile Content */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar - Navigation Tabs */}
              <div className="lg:col-span-1">
                <div className="bg-card rounded-xl border border-border p-6 sticky top-24">
                  <h3 className="font-semibold text-foreground mb-4">Profile Sections</h3>
                  <nav className="space-y-2">
                    {profileTabs?.map((tab) => (
                      <button
                        key={tab?.id}
                        onClick={() => setActiveTab(tab?.id)}
                        className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                          activeTab === tab?.id
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-muted text-muted-foreground'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon name={tab?.icon} size={18} />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium truncate">{tab?.name}</div>
                            <div className="text-xs opacity-75 truncate">{tab?.description}</div>
                          </div>
                          {/* Completion indicator */}
                          <div className="w-8 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-success transition-all duration-300"
                              style={{ 
                                width: `${profileData?.completionStats?.sections?.[tab?.id] || 0}%` 
                              }}
                            />
                          </div>
                        </div>
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                <div className="bg-card rounded-xl border border-border p-8">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderTabContent()}
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Save Changes Bar */}
            {hasUnsavedChanges && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded-lg p-4 shadow-lg z-50"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="AlertCircle" size={16} />
                    <span>You have unsaved changes</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => setHasUnsavedChanges(false)}>
                      Discard
                    </Button>
                    <Button size="sm" onClick={handleSaveChanges}>
                      Save Changes
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;