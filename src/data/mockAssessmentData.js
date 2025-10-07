// Mock assessment history data
export const assessmentHistory = [
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
export const skillRecommendations = [
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

export const categories = [
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

export const userStats = {
  totalAssessments: 8,
  averageScore: 85,
  strongestSkill: 'Communication',
  improvementArea: 'SEO',
  assessmentStreak: 5,
  lastAssessment: '4 days ago'
};