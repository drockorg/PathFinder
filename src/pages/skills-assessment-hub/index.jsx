import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import AssessmentOverview from './components/AssessmentOverview';
import AssessmentCategories from './components/AssessmentCategories';
import ActiveAssessment from './components/ActiveAssessment';
import AssessmentHistory from './components/AssessmentHistory';
import SkillRecommendations from './components/SkillRecommendations';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';



const SkillsAssessmentHub = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeView, setActiveView] = useState('overview'); // overview, assessment, results
  const [currentAssessment, setCurrentAssessment] = useState(null);
  const [assessmentData, setAssessmentData] = useState(null);

  // Mock assessment categories data
  const assessmentCategories = [
    {
      id: 'technical-skills',
      title: 'Technical Skills',
      description: 'Evaluate programming, web development, and digital literacy skills',
      icon: 'Code',
      color: 'bg-blue-500',
      estimatedTime: '15-20 mins',
      difficulty: 'Intermediate',
      totalQuestions: 25,
      skillAreas: ['Programming', 'Web Development', 'Database', 'Tools & Frameworks'],
      assessments: [
        {
          id: 'frontend-dev',
          title: 'Frontend Development',
          questions: 20,
          duration: '15 mins',
          skills: ['HTML', 'CSS', 'JavaScript', 'React']
        },
        {
          id: 'backend-dev',
          title: 'Backend Development',
          questions: 18,
          duration: '12 mins',
          skills: ['Node.js', 'Python', 'Database', 'API']
        },
        {
          id: 'data-analysis',
          title: 'Data Analysis',
          questions: 22,
          duration: '18 mins',
          skills: ['Python', 'Excel', 'Statistics', 'Visualization']
        }
      ]
    },
    {
      id: 'soft-skills',
      title: 'Soft Skills',
      description: 'Assess communication, teamwork, and leadership capabilities',
      icon: 'Users',
      color: 'bg-green-500',
      estimatedTime: '10-15 mins',
      difficulty: 'Beginner',
      totalQuestions: 20,
      skillAreas: ['Communication', 'Leadership', 'Problem Solving', 'Time Management'],
      assessments: [
        {
          id: 'communication',
          title: 'Communication Skills',
          questions: 15,
          duration: '10 mins',
          skills: ['Written Communication', 'Verbal Skills', 'Presentation', 'Active Listening']
        },
        {
          id: 'leadership',
          title: 'Leadership & Management',
          questions: 18,
          duration: '12 mins',
          skills: ['Team Leadership', 'Decision Making', 'Conflict Resolution', 'Motivation']
        }
      ]
    },
    {
      id: 'industry-specific',
      title: 'Industry-Specific',
      description: 'Specialized skills relevant to Ghana\'s key industries',
      icon: 'Building2',
      color: 'bg-purple-500',
      estimatedTime: '12-18 mins',
      difficulty: 'Advanced',
      totalQuestions: 23,
      skillAreas: ['Agriculture', 'Mining', 'Banking', 'Healthcare', 'Education'],
      assessments: [
        {
          id: 'fintech',
          title: 'Financial Technology',
          questions: 16,
          duration: '14 mins',
          skills: ['Mobile Money', 'Digital Banking', 'Risk Management', 'Compliance']
        },
        {
          id: 'agritech',
          title: 'Agricultural Technology',
          questions: 14,
          duration: '12 mins',
          skills: ['Smart Farming', 'Supply Chain', 'Market Analysis', 'Sustainability']
        },
        {
          id: 'digital-marketing',
          title: 'Digital Marketing',
          questions: 20,
          duration: '16 mins',
          skills: ['Social Media', 'SEO', 'Content Marketing', 'Analytics']
        }
      ]
    }
  ];

  // Mock assessment history data
  const assessmentHistory = [
    {
      id: 'hist-1',
      assessmentId: 'frontend-dev',
      title: 'Frontend Development',
      category: 'Technical Skills',
      completedDate: '2025-10-04',
      score: 85,
      totalQuestions: 20,
      correctAnswers: 17,
      timeSpent: '14 mins',
      skillBreakdown: {
        'HTML': 90,
        'CSS': 88,
        'JavaScript': 80,
        'React': 82
      },
      recommendedPaths: ['Advanced React Development', 'Full Stack Web Development']
    },
    {
      id: 'hist-2',
      assessmentId: 'communication',
      title: 'Communication Skills',
      category: 'Soft Skills',
      completedDate: '2025-10-02',
      score: 92,
      totalQuestions: 15,
      correctAnswers: 14,
      timeSpent: '9 mins',
      skillBreakdown: {
        'Written Communication': 95,
        'Verbal Skills': 88,
        'Presentation': 90,
        'Active Listening': 96
      },
      recommendedPaths: ['Leadership Development', 'Public Speaking Mastery']
    },
    {
      id: 'hist-3',
      assessmentId: 'digital-marketing',
      title: 'Digital Marketing',
      category: 'Industry-Specific',
      completedDate: '2025-09-28',
      score: 78,
      totalQuestions: 20,
      correctAnswers: 16,
      timeSpent: '15 mins',
      skillBreakdown: {
        'Social Media': 85,
        'SEO': 70,
        'Content Marketing': 80,
        'Analytics': 75
      },
      recommendedPaths: ['Advanced SEO Strategies', 'Social Media Marketing']
    }
  ];

  // Mock skill recommendations based on assessments
  const skillRecommendations = [
    {
      id: 'rec-1',
      type: 'improvement',
      title: 'Strengthen Your SEO Skills',
      description: 'Based on your digital marketing assessment, improving SEO could boost your score by 15%',
      currentLevel: 70,
      targetLevel: 85,
      learningPaths: ['SEO Fundamentals', 'Advanced SEO Techniques'],
      estimatedTime: '3 weeks',
      priority: 'high'
    },
    {
      id: 'rec-2',
      type: 'new_skill',
      title: 'Explore Backend Development',
      description: 'Your frontend skills are strong. Adding backend knowledge could open full-stack opportunities',
      currentLevel: 0,
      targetLevel: 75,
      learningPaths: ['Node.js Basics', 'Database Fundamentals'],
      estimatedTime: '6 weeks',
      priority: 'medium'
    },
    {
      id: 'rec-3',
      type: 'certification',
      title: 'Get Certified in React',
      description: 'Your React skills are excellent. A certification would validate your expertise to employers',
      currentLevel: 82,
      targetLevel: 90,
      learningPaths: ['React Certification Prep'],
      estimatedTime: '2 weeks',
      priority: 'low'
    }
  ];

  const userStats = {
    totalAssessments: 8,
    averageScore: 85,
    strongestSkill: 'Communication',
    improvementArea: 'SEO',
    assessmentStreak: 5,
    lastAssessment: '4 days ago'
  };

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleStartAssessment = (assessment) => {
    setCurrentAssessment(assessment);
    setActiveView('assessment');
  };

  const handleAssessmentComplete = (results) => {
    setAssessmentData(results);
    setActiveView('results');
    // Add to history
    const newHistoryItem = {
      id: `hist-${Date.now()}`,
      ...results,
      completedDate: new Date()?.toISOString()?.split('T')?.[0]
    };
    // In a real app, this would be saved to a database
  };

  const handleBackToOverview = () => {
    setActiveView('overview');
    setCurrentAssessment(null);
    setAssessmentData(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header userRole="student" isAuthenticated={true} />
        <div className="pt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-muted rounded w-1/3"></div>
              <div className="h-48 bg-muted rounded-xl"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)]?.map((_, i) => (
                  <div key={i} className="h-64 bg-muted rounded-xl"></div>
                ))}
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
          <NavigationBreadcrumbs 
            userRole="student" 
            customPath={[
              { name: 'Dashboard', href: '/student-dashboard' },
              { name: 'Skills Assessment Hub', href: '/skills-assessment-hub' }
            ]}
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {activeView === 'overview' && (
              <>
                {/* Assessment Overview */}
                <AssessmentOverview userStats={userStats} />

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column - Assessment Categories */}
                  <div className="lg:col-span-2 space-y-8">
                    <AssessmentCategories 
                      categories={assessmentCategories}
                      onStartAssessment={handleStartAssessment}
                    />
                  </div>

                  {/* Right Column - Recommendations */}
                  <div className="space-y-8">
                    <SkillRecommendations recommendations={skillRecommendations} />
                  </div>
                </div>

                {/* Assessment History */}
                <AssessmentHistory history={assessmentHistory} />
              </>
            )}

            {activeView === 'assessment' && (
              <ActiveAssessment 
                assessment={currentAssessment}
                onComplete={handleAssessmentComplete}
                onBack={handleBackToOverview}
              />
            )}

            {activeView === 'results' && assessmentData && (
              <div className="space-y-8">
                {/* Results would be displayed here */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-card rounded-xl border border-border p-8 text-center"
                >
                  <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon name="CheckCircle" size={40} className="text-success" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Assessment Complete!</h2>
                  <p className="text-muted-foreground mb-6">Your results have been saved and recommendations updated.</p>
                  <Button onClick={handleBackToOverview}>
                    Return to Assessment Hub
                  </Button>
                </motion.div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SkillsAssessmentHub;