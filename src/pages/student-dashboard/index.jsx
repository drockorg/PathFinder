import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import ProgressOverview from './components/ProgressOverview';
import ActiveLearningPaths from './components/ActiveLearningPaths';
import JobRecommendations from './components/JobRecommendations';
import SkillsProgress from './components/SkillsProgress';
import NotificationPanel from './components/NotificationPanel';
import QuickActions from './components/QuickActions';
import AchievementBadges from './components/AchievementBadges';

const StudentDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Mock user progress data
  const userProgress = {
    currentLevel: 5,
    totalXP: 7850,
    completedPaths: 12,
    activePaths: 3,
    achievements: 18
  };

  // Mock learning paths data
  const learningPaths = [
    {
      id: 'path-1',
      title: 'Full Stack Web Development',
      description: 'Master modern web development with React, Node.js, and databases',
      progress: 75,
      estimatedTime: '8 weeks',
      difficulty: 'Intermediate',
      priority: 'high',
      skills: ['React', 'Node.js', 'MongoDB', 'JavaScript', 'CSS']
    },
    {
      id: 'path-2',
      title: 'Data Science Fundamentals',
      description: 'Learn Python, statistics, and machine learning basics',
      progress: 45,
      estimatedTime: '12 weeks',
      difficulty: 'Beginner',
      priority: 'medium',
      skills: ['Python', 'Pandas', 'NumPy', 'Statistics', 'Machine Learning']
    },
    {
      id: 'path-3',
      title: 'Digital Marketing Mastery',
      description: 'Comprehensive digital marketing strategies and tools',
      progress: 20,
      estimatedTime: '6 weeks',
      difficulty: 'Beginner',
      priority: 'low',
      skills: ['SEO', 'Social Media', 'Google Ads', 'Analytics', 'Content Marketing']
    }
  ];

  // Mock job recommendations data
  const jobRecommendations = [
    {
      id: 'job-1',
      title: 'Frontend Developer',
      company: 'TechGhana Solutions',
      location: 'Accra, Ghana',
      salary: 8500,
      type: 'Full-time',
      matchScore: 0.92,
      requiredSkills: ['React', 'JavaScript', 'CSS', 'HTML', 'Git'],
      postedDate: '2 days ago'
    },
    {
      id: 'job-2',
      title: 'Junior Data Analyst',
      company: 'DataFlow Africa',
      location: 'Kumasi, Ghana',
      salary: 6200,
      type: 'Full-time',
      matchScore: 0.78,
      requiredSkills: ['Python', 'Excel', 'SQL', 'Statistics', 'Tableau'],
      postedDate: '1 week ago'
    },
    {
      id: 'job-3',
      title: 'Digital Marketing Specialist',
      company: 'Growth Marketing Hub',
      location: 'Remote',
      salary: 5800,
      type: 'Contract',
      matchScore: 0.65,
      requiredSkills: ['SEO', 'Google Ads', 'Social Media', 'Analytics', 'Content Creation'],
      postedDate: '3 days ago'
    }
  ];

  // Mock skills progress data
  const skillsData = [
    { name: 'React', progress: 85, category: 'Frontend' },
    { name: 'JavaScript', progress: 78, category: 'Programming' },
    { name: 'Python', progress: 65, category: 'Programming' },
    { name: 'Node.js', progress: 72, category: 'Backend' },
    { name: 'CSS', progress: 88, category: 'Frontend' },
    { name: 'MongoDB', progress: 58, category: 'Database' }
  ];

  // Mock notifications data
  const notifications = [
    {
      id: 'notif-1',
      type: 'job_match',
      title: 'New Job Match Found!',
      message: 'A Frontend Developer position at TechGhana Solutions matches your skills perfectly.',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      read: false,
      details: 'This position requires React and JavaScript skills which align with your current learning path. The salary range is GHS 8,000 - 9,000.',
      actionUrl: '/job-explorer?job=job-1'
    },
    {
      id: 'notif-2',
      type: 'learning_reminder',
      title: 'Continue Your Learning Path',
      message: 'You have 2 pending lessons in Full Stack Web Development.',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      read: false,
      details: 'Complete the React Hooks module to maintain your learning streak and unlock the next chapter.',
      actionUrl: '/learning-path-builder?path=path-1'
    },
    {
      id: 'notif-3',
      type: 'achievement',
      title: 'Achievement Unlocked!',
      message: 'You earned the "React Master" badge for completing advanced React concepts.',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      read: true,
      details: 'Congratulations! You have successfully mastered React fundamentals and advanced concepts. This achievement increases your profile visibility to employers.',
      actionUrl: '/profile?section=achievements'
    },
    {
      id: 'notif-4',
      type: 'system_update',
      title: 'Platform Update',
      message: 'New AI-powered job matching features are now available.',
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      read: true,
      details: 'Our enhanced AI algorithm now provides more accurate job matches based on your skills, location preferences, and career goals.',
      actionUrl: '/job-explorer'
    }
  ];

  // Mock achievements data
  const achievements = [
    {
      id: 'ach-1',
      title: 'React Master',
      description: 'Completed React fundamentals',
      category: 'skill',
      rarity: 'epic',
      earnedDate: '02/10/2025'
    },
    {
      id: 'ach-2',
      title: 'Learning Streak',
      description: '7 days consecutive learning',
      category: 'streak',
      rarity: 'rare',
      earnedDate: '01/10/2025'
    },
    {
      id: 'ach-3',
      title: 'First Path',
      description: 'Completed first learning path',
      category: 'completion',
      rarity: 'common',
      earnedDate: '28/09/2025'
    },
    {
      id: 'ach-4',
      title: 'Code Warrior',
      description: 'Solved 50 coding challenges',
      category: 'skill',
      rarity: 'rare',
      earnedDate: '25/09/2025'
    },
    {
      id: 'ach-5',
      title: 'Community Helper',
      description: 'Helped 10 fellow learners',
      category: 'social',
      rarity: 'epic',
      earnedDate: '20/09/2025'
    },
    {
      id: 'ach-6',
      title: 'Early Bird',
      description: 'Joined Pathfinders beta',
      category: 'special',
      rarity: 'legendary',
      earnedDate: '15/09/2025'
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header userRole="student" isAuthenticated={true} />
        <div className="pt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-muted rounded w-1/4"></div>
              <div className="h-48 bg-muted rounded-xl"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="h-96 bg-muted rounded-xl"></div>
                <div className="h-96 bg-muted rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="student" isAuthenticated={true} />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <NavigationBreadcrumbs userRole="student" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Progress Overview */}
            <ProgressOverview userProgress={userProgress} />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Learning & Jobs */}
              <div className="lg:col-span-2 space-y-8">
                <ActiveLearningPaths learningPaths={learningPaths} />
                <JobRecommendations jobRecommendations={jobRecommendations} />
              </div>

              {/* Right Column - Skills & Actions */}
              <div className="space-y-8">
                <QuickActions />
                <SkillsProgress skillsData={skillsData} />
              </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <AchievementBadges achievements={achievements} />
              <NotificationPanel notifications={notifications} />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;