import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import AnalyticsOverview from './components/AnalyticsOverview';
import LearningProgressChart from './components/LearningProgressChart';
import JobTrackingMetrics from './components/JobTrackingMetrics';
import SkillGapAnalysis from './components/SkillGapAnalysis';
import PredictiveAnalytics from './components/PredictiveAnalytics';
import MarketTrendAnalysis from './components/MarketTrendAnalysis';
import ExportReports from './components/ExportReports';
import DateRangeSelector from './components/DateRangeSelector';

const AnalyticsDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 90 days ago
    end: new Date()
  });
  const [selectedMetric, setSelectedMetric] = useState('learning');

  // Mock analytics overview data
  const analyticsOverview = {
    totalLearningHours: 1248,
    completionRate: 73.5,
    skillsImproved: 12,
    jobApplications: 28,
    interviewsScheduled: 7,
    interviewSuccessRate: 85.7,
    averageMatchScore: 78.2,
    trendsData: {
      learning: [65, 70, 68, 75, 73, 78, 82, 79, 85, 88, 91, 89],
      applications: [2, 3, 1, 4, 2, 3, 5, 4, 2, 1, 3, 2],
      interviews: [0, 1, 0, 1, 1, 2, 1, 2, 0, 1, 0, 2]
    }
  };

  // Mock learning progress data
  const learningProgressData = {
    courseCompletion: [
      { month: 'Jul', completed: 2, enrolled: 3, rate: 66.7 },
      { month: 'Aug', completed: 4, enrolled: 5, rate: 80.0 },
      { month: 'Sep', completed: 3, enrolled: 4, rate: 75.0 },
      { month: 'Oct', completed: 5, enrolled: 6, rate: 83.3 }
    ],
    skillDevelopment: [
      { skill: 'React', weeks: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], progress: [25, 50, 75, 85] },
      { skill: 'Python', weeks: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], progress: [20, 40, 65, 78] },
      { skill: 'JavaScript', weeks: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], progress: [45, 65, 80, 92] }
    ],
    achievements: [
      { date: '2025-07-15', milestone: 'First Course Complete', category: 'completion' },
      { date: '2025-08-22', milestone: 'React Mastery Badge', category: 'skill' },
      { date: '2025-09-10', milestone: '30-Day Learning Streak', category: 'streak' },
      { date: '2025-10-01', milestone: 'Coding Challenge Winner', category: 'competition' }
    ]
  };

  // Mock job tracking data
  const jobTrackingData = {
    applicationsByMonth: [
      { month: 'Jul', applications: 5, interviews: 1, offers: 0 },
      { month: 'Aug', applications: 8, interviews: 2, offers: 1 },
      { month: 'Sep', applications: 10, interviews: 3, offers: 1 },
      { month: 'Oct', applications: 5, interviews: 1, offers: 0 }
    ],
    applicationsByRegion: [
      { region: 'Greater Accra', count: 15, success: 4 },
      { region: 'Ashanti', count: 8, success: 2 },
      { region: 'Western', count: 3, success: 1 },
      { region: 'Eastern', count: 2, success: 0 }
    ],
    applicationsByJobType: [
      { type: 'Full-time', count: 20, avgSalary: 8200 },
      { type: 'Contract', count: 5, avgSalary: 6500 },
      { type: 'Part-time', count: 2, avgSalary: 4200 },
      { type: 'Remote', count: 1, avgSalary: 7800 }
    ]
  };

  // Mock skill gap analysis data
  const skillGapData = {
    currentSkills: [
      { name: 'React', level: 85, market_demand: 90, gap: -5 },
      { name: 'Python', level: 65, market_demand: 85, gap: -20 },
      { name: 'JavaScript', level: 88, market_demand: 95, gap: -7 },
      { name: 'Node.js', level: 72, market_demand: 80, gap: -8 },
      { name: 'Machine Learning', level: 25, market_demand: 75, gap: -50 },
      { name: 'Data Analysis', level: 45, market_demand: 70, gap: -25 }
    ],
    recommendations: [
      {
        skill: 'Machine Learning',
        priority: 'high',
        timeEstimate: '8-12 weeks',
        reason: 'High market demand in Ghana tech sector',
        courses: ['ML Fundamentals', 'Python for Data Science']
      },
      {
        skill: 'Data Analysis',
        priority: 'medium',
        timeEstimate: '4-6 weeks',
        reason: 'Growing demand in financial sector',
        courses: ['Excel Mastery', 'SQL for Beginners']
      }
    ]
  };

  // Mock predictive analytics data
  const predictiveData = {
    learningCompletion: {
      currentPath: 'Full Stack Development',
      estimatedCompletion: '2025-12-15',
      confidence: 87,
      milestones: [
        { date: '2025-11-01', milestone: 'Backend Development', probability: 95 },
        { date: '2025-11-15', milestone: 'Database Management', probability: 88 },
        { date: '2025-12-01', milestone: 'Deployment & DevOps', probability: 82 },
        { date: '2025-12-15', milestone: 'Full Stack Portfolio', probability: 87 }
      ]
    },
    jobMatchProbability: {
      currentScore: 78,
      projectedScore: 89,
      improvementFactors: [
        { factor: 'Complete React Advanced', impact: 5 },
        { factor: 'Add ML Skills', impact: 8 },
        { factor: 'Build Portfolio Project', impact: 6 }
      ]
    }
  };

  // Mock market trends data (Ghana-specific)
  const marketTrendsData = {
    demandBySkill: [
      { skill: 'JavaScript', demand: 95, growth: 12, salary: 8500 },
      { skill: 'Python', demand: 88, growth: 25, salary: 9200 },
      { skill: 'React', demand: 85, growth: 18, salary: 8800 },
      { skill: 'Data Analysis', demand: 75, growth: 35, salary: 7500 },
      { skill: 'Digital Marketing', demand: 70, growth: 15, salary: 6200 }
    ],
    regionalTrends: [
      { region: 'Greater Accra', jobPostings: 245, avgSalary: 8200, growth: 15 },
      { region: 'Ashanti', jobPostings: 87, avgSalary: 6800, growth: 22 },
      { region: 'Western', jobPostings: 34, avgSalary: 6200, growth: 18 },
      { region: 'Eastern', jobPostings: 28, avgSalary: 5800, growth: 12 }
    ],
    industryGrowth: [
      { industry: 'Fintech', growth: 45, opportunities: 128 },
      { industry: 'E-commerce', growth: 32, opportunities: 96 },
      { industry: 'Healthtech', growth: 28, opportunities: 65 },
      { industry: 'Edtech', growth: 25, opportunities: 54 }
    ]
  };

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const handleDateRangeChange = (newRange) => {
    setDateRange(newRange);
    // In a real app, this would trigger data refetch
  };

  const handleMetricChange = (metric) => {
    setSelectedMetric(metric);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header userRole="student" isAuthenticated={true} />
        <div className="pt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-muted rounded w-1/3"></div>
              <div className="h-24 bg-muted rounded-xl"></div>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="h-32 bg-muted rounded-xl"></div>
                <div className="h-32 bg-muted rounded-xl"></div>
                <div className="h-32 bg-muted rounded-xl"></div>
                <div className="h-32 bg-muted rounded-xl"></div>
              </div>
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
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
                <p className="text-muted-foreground mt-1">
                  Track your learning progress and career development insights
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <DateRangeSelector 
                  dateRange={dateRange} 
                  onChange={handleDateRangeChange} 
                />
                <ExportReports data={{
                  overview: analyticsOverview,
                  learning: learningProgressData,
                  jobs: jobTrackingData
                }} />
              </div>
            </div>

            {/* Analytics Overview */}
            <AnalyticsOverview 
              data={analyticsOverview} 
              selectedMetric={selectedMetric}
              onMetricChange={handleMetricChange}
            />

            {/* Main Analytics Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Learning Progress Charts */}
              <div className="space-y-6">
                <LearningProgressChart data={learningProgressData} />
                <SkillGapAnalysis data={skillGapData} />
              </div>

              {/* Job Tracking & Predictions */}
              <div className="space-y-6">
                <JobTrackingMetrics data={jobTrackingData} />
                <PredictiveAnalytics data={predictiveData} />
              </div>
            </div>

            {/* Market Trends Section */}
            <MarketTrendAnalysis data={marketTrendsData} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;