import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import DashboardStats from './components/DashboardStats';
import QuickActions from './components/QuickActions';
import JobPostingCard from './components/JobPostingCard';
import CandidateRecommendationCard from './components/CandidateRecommendationCard';
import RecruitmentAnalytics from './components/RecruitmentAnalytics';
import RecentActivity from './components/RecentActivity';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Icon from '../../components/AppIcon';

const EmployerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Mock dashboard statistics
  const dashboardStats = {
    activeJobs: 12,
    totalApplications: 347,
    qualifiedCandidates: 89,
    interviewsScheduled: 23,
    successfulHires: 8,
    avgTimeToHire: 18,
    jobsChange: 15,
    applicationsChange: 28,
    qualifiedChange: 12,
    interviewsChange: 35,
    hiresChange: 60,
    timeToHireChange: -8
  };

  // Mock job postings data
  const jobPostings = [
    {
      id: 1,
      title: "Frontend Developer",
      location: "Accra, Ghana",
      type: "Full-time",
      salary: 8500,
      status: "active",
      urgency: "high",
      description: "We are looking for a skilled Frontend Developer to join our team and help build amazing user experiences for our growing platform.",
      applications: 45,
      qualifiedCandidates: 12,
      interviews: 5,
      views: 234,
      postedDate: "5 days ago",
      expiryDate: "25 days"
    },
    {
      id: 2,
      title: "Data Analyst",
      location: "Kumasi, Ghana",
      type: "Full-time",
      salary: 6500,
      status: "active",
      urgency: "medium",
      description: "Join our analytics team to help drive data-driven decisions and insights for our business operations across Ghana.",
      applications: 32,
      qualifiedCandidates: 8,
      interviews: 3,
      views: 187,
      postedDate: "3 days ago",
      expiryDate: "27 days"
    },
    {
      id: 3,
      title: "Digital Marketing Specialist",
      location: "Tamale, Ghana",
      type: "Contract",
      salary: 4200,
      status: "paused",
      urgency: "low",
      description: "We need a creative Digital Marketing Specialist to help expand our reach and engagement across social media platforms.",
      applications: 28,
      qualifiedCandidates: 6,
      interviews: 2,
      views: 156,
      postedDate: "1 week ago",
      expiryDate: "23 days"
    }
  ];

  // Mock candidate recommendations
  const candidateRecommendations = [
    {
      id: 1,
      name: "Kwame Asante",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      location: "Accra, Ghana",
      education: "BSc Computer Science",
      experience: 3,
      bio: "Passionate frontend developer with expertise in React and modern web technologies. Completed advanced JavaScript learning path.",
      matchScore: 92,
      learningProgress: 85,
      currentLearningPath: "Advanced React Development",
      topSkills: ["React", "JavaScript", "CSS", "Node.js"],
      completedCourses: 12,
      certifications: 4,
      projectsCompleted: 8,
      isOnline: true,
      lastActive: "2 hours ago"
    },
    {
      id: 2,
      name: "Ama Osei",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      location: "Kumasi, Ghana",
      education: "BSc Statistics",
      experience: 2,
      bio: "Data enthusiast with strong analytical skills and experience in Python, SQL, and data visualization tools.",
      matchScore: 88,
      learningProgress: 78,
      currentLearningPath: "Data Science Fundamentals",
      topSkills: ["Python", "SQL", "Excel", "Tableau"],
      completedCourses: 9,
      certifications: 3,
      projectsCompleted: 6,
      isOnline: false,
      lastActive: "1 day ago"
    },
    {
      id: 3,
      name: "Kofi Mensah",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      location: "Cape Coast, Ghana",
      education: "Diploma Marketing",
      experience: 4,
      bio: "Creative marketing professional with proven track record in social media campaigns and brand development.",
      matchScore: 76,
      learningProgress: 92,
      currentLearningPath: "Digital Marketing Mastery",
      topSkills: ["Social Media", "Content Creation", "SEO", "Analytics"],
      completedCourses: 15,
      certifications: 5,
      projectsCompleted: 11,
      isOnline: true,
      lastActive: "30 minutes ago"
    }
  ];

  // Mock recent activities
  const recentActivities = [
    {
      type: 'application',
      title: 'New Application Received',
      description: 'Kwame Asante applied for Frontend Developer position',
      candidateName: 'Kwame Asante',
      candidateAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      jobTitle: 'Frontend Developer',
      timestamp: new Date(Date.now() - 1800000) // 30 minutes ago
    },
    {
      type: 'interview',
      title: 'Interview Scheduled',
      description: 'Interview scheduled with Ama Osei for Data Analyst position',
      candidateName: 'Ama Osei',
      candidateAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      jobTitle: 'Data Analyst',
      timestamp: new Date(Date.now() - 3600000) // 1 hour ago
    },
    {
      type: 'hire',
      title: 'Successful Hire',
      description: 'Joseph Addo has been successfully hired for Backend Developer role',
      candidateName: 'Joseph Addo',
      candidateAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      jobTitle: 'Backend Developer',
      timestamp: new Date(Date.now() - 7200000) // 2 hours ago
    },
    {
      type: 'message',
      title: 'New Message',
      description: 'Akosua Frimpong sent a message regarding the UI/UX Designer position',
      candidateName: 'Akosua Frimpong',
      candidateAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      jobTitle: 'UI/UX Designer',
      timestamp: new Date(Date.now() - 10800000) // 3 hours ago
    },
    {
      type: 'job_posted',
      title: 'Job Posted Successfully',
      description: 'Mobile App Developer position has been published and is now live',
      jobTitle: 'Mobile App Developer',
      timestamp: new Date(Date.now() - 14400000) // 4 hours ago
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'active', label: 'Active' },
    { value: 'paused', label: 'Paused' },
    { value: 'closed', label: 'Closed' }
  ];

  const tabItems = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'jobs', label: 'Job Postings', icon: 'Briefcase' },
    { id: 'candidates', label: 'Candidates', icon: 'Users' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handlePostJob = () => {
    console.log('Posting new job...');
    // Navigate to job posting form
  };

  const handleViewCandidates = () => {
    setActiveTab('candidates');
  };

  const handleScheduleInterview = () => {
    console.log('Scheduling interview...');
    // Navigate to interview scheduling
  };

  const handleViewAnalytics = () => {
    setActiveTab('analytics');
  };

  const handleViewApplications = (jobId) => {
    console.log('Viewing applications for job:', jobId);
    // Navigate to applications view
  };

  const handleEditJob = (jobId) => {
    console.log('Editing job:', jobId);
    // Navigate to job edit form
  };

  const handleToggleJobStatus = (jobId) => {
    console.log('Toggling job status:', jobId);
    // Update job status
  };

  const handleViewProfile = (candidateId) => {
    console.log('Viewing candidate profile:', candidateId);
    // Navigate to candidate profile
  };

  const handleSendMessage = (candidateId) => {
    console.log('Sending message to candidate:', candidateId);
    // Open messaging interface
  };

  const handleShortlist = (candidateId) => {
    console.log('Shortlisting candidate:', candidateId);
    // Add to shortlist
  };

  const filteredJobs = jobPostings?.filter(job => {
    const matchesSearch = job?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         job?.location?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesStatus = filterStatus === 'all' || job?.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header userRole="employer" />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-muted rounded w-1/3" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                {[...Array(6)]?.map((_, i) => (
                  <div key={i} className="h-32 bg-muted rounded-lg" />
                ))}
              </div>
              <div className="h-64 bg-muted rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="employer" />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <NavigationBreadcrumbs userRole="employer" />
          
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Employer Dashboard</h1>
              <p className="text-muted-foreground mt-2">
                Manage your recruitment pipeline and find the best talent in Ghana
              </p>
            </div>
            <Button
              variant="default"
              onClick={handlePostJob}
              iconName="Plus"
              iconPosition="left"
              iconSize={20}
            >
              Post New Job
            </Button>
          </div>

          {/* Dashboard Stats */}
          <DashboardStats stats={dashboardStats} />

          {/* Quick Actions */}
          <QuickActions
            onPostJob={handlePostJob}
            onViewCandidates={handleViewCandidates}
            onScheduleInterview={handleScheduleInterview}
            onViewAnalytics={handleViewAnalytics}
          />

          {/* Tab Navigation */}
          <div className="border-b border-border mb-8">
            <nav className="flex space-x-8">
              {tabItems?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* Recent Job Postings */}
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-6">Recent Job Postings</h2>
                  <div className="space-y-6">
                    {jobPostings?.slice(0, 2)?.map((job) => (
                      <JobPostingCard
                        key={job?.id}
                        job={job}
                        onViewApplications={handleViewApplications}
                        onEditJob={handleEditJob}
                        onToggleStatus={handleToggleJobStatus}
                      />
                    ))}
                  </div>
                </div>

                {/* Top Candidate Recommendations */}
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-6">Top Candidate Matches</h2>
                  <div className="space-y-6">
                    {candidateRecommendations?.slice(0, 2)?.map((candidate) => (
                      <CandidateRecommendationCard
                        key={candidate?.id}
                        candidate={candidate}
                        onViewProfile={handleViewProfile}
                        onSendMessage={handleSendMessage}
                        onShortlist={handleShortlist}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                {/* Recent Activity */}
                <RecentActivity activities={recentActivities} />
              </div>
            </div>
          )}

          {activeTab === 'jobs' && (
            <div>
              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex-1">
                  <Input
                    type="search"
                    placeholder="Search job postings..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e?.target?.value)}
                    className="w-full"
                  />
                </div>
                <div className="w-full sm:w-48">
                  <Select
                    options={statusOptions}
                    value={filterStatus}
                    onChange={setFilterStatus}
                    placeholder="Filter by status"
                  />
                </div>
              </div>

              {/* Job Postings Grid */}
              <div className="space-y-6">
                {filteredJobs?.map((job) => (
                  <JobPostingCard
                    key={job?.id}
                    job={job}
                    onViewApplications={handleViewApplications}
                    onEditJob={handleEditJob}
                    onToggleStatus={handleToggleJobStatus}
                  />
                ))}
              </div>

              {filteredJobs?.length === 0 && (
                <div className="text-center py-12">
                  <Icon name="Briefcase" size={48} className="text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No job postings found</h3>
                  <p className="text-muted-foreground mb-6">
                    {searchQuery || filterStatus !== 'all' ?'Try adjusting your search or filter criteria' :'Get started by posting your first job'
                    }
                  </p>
                  <Button variant="default" onClick={handlePostJob}>
                    Post Your First Job
                  </Button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'candidates' && (
            <div>
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-2">Recommended Candidates</h2>
                <p className="text-muted-foreground">
                  AI-powered candidate recommendations based on your job requirements
                </p>
              </div>

              <div className="space-y-6">
                {candidateRecommendations?.map((candidate) => (
                  <CandidateRecommendationCard
                    key={candidate?.id}
                    candidate={candidate}
                    onViewProfile={handleViewProfile}
                    onSendMessage={handleSendMessage}
                    onShortlist={handleShortlist}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div>
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-2">Recruitment Analytics</h2>
                <p className="text-muted-foreground">
                  Insights and metrics to optimize your hiring process
                </p>
              </div>

              <RecruitmentAnalytics analyticsData={{}} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;