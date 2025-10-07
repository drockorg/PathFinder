import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import PersonalInformation from './components/PersonalInformation';
import EducationBackground from './components/EducationBackground';
import SkillsInventory from './components/SkillsInventory';
import ExperienceHistory from './components/ExperienceHistory';
import SettingsPreferences from './components/SettingsPreferences';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { useGetProfileQuery } from '../../store/services/api';

const ProfileManagement = () => {
  const { data: profile, isLoading, error, refetch } = useGetProfileQuery();
  const [activeTab, setActiveTab] = useState('personal');
  const [userRole, setUserRole] = useState('student');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [profileData, setProfileData] = useState({
    personal: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: '',
      location: '',
      region: '',
      profilePicture: null,
      bio: '',
      linkedin: '',
      github: '',
      portfolio: ''
    },
    education: [],
    experience: [],
    skills: [],
    preferences: {
      language: 'english',
      theme: 'system',
      notifications: {
        email: true,
        push: true,
        sms: false
      }
    }
  });

  const profileTabs = [
    { id: 'personal', name: 'Personal Info', icon: 'User', description: 'Basic information and contact details' },
    { id: 'education', name: 'Education', icon: 'GraduationCap', description: 'Academic background' },
    { id: 'experience', name: 'Experience', icon: 'Briefcase', description: 'Work history' },
    { id: 'skills', name: 'Skills', icon: 'Brain', description: 'Your skills' },
    { id: 'settings', name: 'Settings', icon: 'Settings', description: 'Preferences' }
  ];

  // Populate profile data from API
  useEffect(() => {
    if (profile) {
      const nameParts = profile.name?.split(' ') || ['', ''];
      const avatarUrl = profile.profilePicture 
        ? (profile.profilePicture.startsWith('http') 
            ? profile.profilePicture 
            : `http://localhost:5000${profile.profilePicture}`)
        : null;
      
      setProfileData(prev => ({
        ...prev,
        personal: {
          firstName: nameParts[0] || '',
          lastName: nameParts.slice(1).join(' ') || '',
          email: profile.email || '',
          phone: profile.mobileNumber || '',
          dateOfBirth: profile.dateOfBirth || '',
          gender: profile.gender || '',
          location: profile.location?.city || '',
          region: profile.location?.region || '',
          profilePicture: avatarUrl,
          bio: profile.bio || '',
          linkedin: profile.socialLinks?.linkedin || '',
          github: profile.socialLinks?.github || '',
          portfolio: profile.socialLinks?.portfolio || ''
        },
        education: profile.education || [],
        experience: profile.experience || [],
        skills: profile.skills || [],
        preferences: profile.preferences || {
          language: 'english',
          theme: 'system',
          notifications: {
            email: true,
            push: true,
            sms: false
          }
        }
      }));
    }
  }, [profile]);

  const handleProfileUpdate = (section, data) => {
    setProfileData(prev => ({
      ...prev,
      [section]: { ...prev?.[section], ...data }
    }));
    setHasUnsavedChanges(true);
  };

  const handleSaveChanges = async () => {
    // This is handled by individual components now
    setHasUnsavedChanges(false);
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
      case 'experience':
        return (
          <ExperienceHistory 
            data={profileData?.experience}
            onUpdate={(data) => handleProfileUpdate('experience', data)}
          />
        );
      case 'skills':
        return (
          <SkillsInventory 
            data={profileData?.skills}
            onUpdate={(data) => handleProfileUpdate('skills', data)}
          />
        );
      case 'settings':
        return (
          <SettingsPreferences 
            data={profileData?.preferences}
            onUpdate={(data) => handleProfileUpdate('preferences', data)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userRole={userRole} isAuthenticated={true} />
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
  );
};

export default ProfileManagement;