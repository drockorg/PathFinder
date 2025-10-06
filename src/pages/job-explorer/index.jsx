import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import JobCard from './components/JobCard';
import FilterPanel from './components/FilterPanel';
import SearchBar from './components/SearchBar';
import SortControls from './components/SortControls';
import JobStats from './components/JobStats';
import EmptyState from './components/EmptyState';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const JobExplorer = () => {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [sortOrder, setSortOrder] = useState('desc');
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    location: [],
    industry: [],
    experienceLevel: [],
    jobType: [],
    salary: { min: '', max: '' },
    skillMatch: 0,
    postedWithin: '',
    remoteWork: false,
    entryLevel: false,
    hasLearningPath: false
  });

  // Mock job data
  const mockJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechGhana Solutions",
      location: "Accra",
      salaryMin: 8000,
      salaryMax: 15000,
      experienceLevel: "Junior (2-4 years)",
      skillMatch: 85,
      skills: ["React", "JavaScript", "CSS", "HTML", "Git"],
      postedDate: "2025-09-28",
      applicationDeadline: "2025-10-15",
      industry: "technology",
      jobType: "full-time",
      isSaved: false,
      recommendedLearningPath: "Advanced React Development",
      potentialSkillMatch: 92,
      description: `We are looking for a passionate Frontend Developer to join our growing team.\n\nResponsibilities:\n• Develop user-facing features using React.js\n• Build reusable components and front-end libraries\n• Translate designs and wireframes into high-quality code\n• Optimize components for maximum performance`
    },
    {
      id: 2,
      title: "Digital Marketing Specialist",
      company: "Ghana Marketing Hub",
      location: "Kumasi",
      salaryMin: 5000,
      salaryMax: 9000,
      experienceLevel: "Entry Level (0-2 years)",
      skillMatch: 72,
      skills: ["Social Media", "Content Marketing", "SEO", "Analytics", "Copywriting"],
      postedDate: "2025-09-30",
      applicationDeadline: "2025-10-20",
      industry: "marketing",
      jobType: "full-time",
      isSaved: true,
      recommendedLearningPath: "Digital Marketing Mastery",
      potentialSkillMatch: 88,
      description: `Join our dynamic marketing team and help grow our digital presence.\n\nKey Requirements:\n• Bachelor's degree in Marketing or related field\n• Experience with social media platforms\n• Strong analytical and communication skills\n• Knowledge of SEO best practices`
    },
    {
      id: 3,
      title: "Data Analyst",
      company: "Ghana Data Insights",
      location: "Accra",
      salaryMin: 7000,
      salaryMax: 12000,
      experienceLevel: "Mid Level (4-7 years)",
      skillMatch: 68,
      skills: ["Python", "SQL", "Excel", "Tableau", "Statistics"],
      postedDate: "2025-10-01",
      applicationDeadline: "2025-10-25",
      industry: "technology",
      jobType: "full-time",
      isSaved: false,
      recommendedLearningPath: "Data Science Fundamentals",
      potentialSkillMatch: 85,
      description: `We're seeking a detail-oriented Data Analyst to help drive business decisions.\n\nWhat you'll do:\n• Analyze large datasets to identify trends and insights\n• Create visualizations and reports for stakeholders\n• Collaborate with cross-functional teams\n• Maintain data quality and integrity`
    },
    {
      id: 4,
      title: "Customer Service Representative",
      company: "Ghana Telecom Services",
      location: "Cape Coast",
      salaryMin: 3500,
      salaryMax: 5500,
      experienceLevel: "Entry Level (0-2 years)",
      skillMatch: 90,
      skills: ["Communication", "Problem Solving", "CRM Software", "English", "Patience"],
      postedDate: "2025-09-25",
      applicationDeadline: "2025-10-10",
      industry: "telecommunications",
      jobType: "full-time",
      isSaved: false,
      description: `Provide excellent customer service and support to our valued clients.\n\nResponsibilities:\n• Handle customer inquiries via phone, email, and chat\n• Resolve customer complaints and issues\n• Maintain accurate customer records\n• Meet performance targets and KPIs`
    },
    {
      id: 5,
      title: "Graphic Designer",
      company: "Creative Minds Ghana",
      location: "Tamale",
      salaryMin: 4500,
      salaryMax: 8000,
      experienceLevel: "Junior (2-4 years)",
      skillMatch: 78,
      skills: ["Adobe Creative Suite", "Branding", "Typography", "Layout Design", "Illustration"],
      postedDate: "2025-09-29",
      applicationDeadline: "2025-10-18",
      industry: "design",
      jobType: "full-time",
      isSaved: true,
      recommendedLearningPath: "Advanced Graphic Design",
      potentialSkillMatch: 89,
      description: `Create visually compelling designs that communicate our brand message effectively.\n\nRequirements:\n• Proficiency in Adobe Creative Suite\n• Strong portfolio demonstrating design skills\n• Understanding of design principles\n• Ability to work under tight deadlines`
    },
    {
      id: 6,
      title: "Software Engineer",
      company: "Ghana Tech Innovations",
      location: "Remote",
      salaryMin: 12000,
      salaryMax: 20000,
      experienceLevel: "Senior (7+ years)",
      skillMatch: 65,
      skills: ["Java", "Spring Boot", "Microservices", "AWS", "Docker"],
      postedDate: "2025-10-02",
      applicationDeadline: "2025-10-30",
      industry: "technology",
      jobType: "full-time",
      isSaved: false,
      recommendedLearningPath: "Cloud Architecture & Microservices",
      potentialSkillMatch: 82,
      description: `Lead the development of scalable software solutions for our enterprise clients.\n\nTechnical Requirements:\n• 7+ years of software development experience\n• Expertise in Java and Spring ecosystem\n• Experience with cloud platforms (AWS preferred)\n• Strong understanding of microservices architecture`
    }
  ];

  const [jobs, setJobs] = useState(mockJobs);
  const [filteredJobs, setFilteredJobs] = useState(mockJobs);

  // Job statistics
  const jobStats = {
    totalJobs: filteredJobs?.length,
    newThisWeek: filteredJobs?.filter(job => {
      const postedDate = new Date(job.postedDate);
      const weekAgo = new Date();
      weekAgo?.setDate(weekAgo?.getDate() - 7);
      return postedDate >= weekAgo;
    })?.length,
    highMatch: filteredJobs?.filter(job => job?.skillMatch >= 80)?.length,
    remoteJobs: filteredJobs?.filter(job => job?.location?.toLowerCase()?.includes('remote'))?.length
  };

  // Filter and search logic
  useEffect(() => {
    let filtered = [...jobs];

    // Apply search query
    if (searchQuery) {
      filtered = filtered?.filter(job =>
        job?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        job?.company?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        job?.skills?.some(skill => skill?.toLowerCase()?.includes(searchQuery?.toLowerCase()))
      );
    }

    // Apply filters
    if (filters?.location?.length > 0) {
      filtered = filtered?.filter(job =>
        filters?.location?.some(loc => job?.location?.toLowerCase()?.includes(loc?.toLowerCase()))
      );
    }

    if (filters?.industry?.length > 0) {
      filtered = filtered?.filter(job =>
        filters?.industry?.includes(job?.industry)
      );
    }

    if (filters?.experienceLevel?.length > 0) {
      filtered = filtered?.filter(job =>
        filters?.experienceLevel?.some(level => job?.experienceLevel?.toLowerCase()?.includes(level))
      );
    }

    if (filters?.jobType?.length > 0) {
      filtered = filtered?.filter(job =>
        filters?.jobType?.includes(job?.jobType)
      );
    }

    if (filters?.salary?.min) {
      filtered = filtered?.filter(job => job?.salaryMax >= filters?.salary?.min);
    }

    if (filters?.salary?.max) {
      filtered = filtered?.filter(job => job?.salaryMin <= filters?.salary?.max);
    }

    if (filters?.skillMatch > 0) {
      filtered = filtered?.filter(job => job?.skillMatch >= filters?.skillMatch);
    }

    if (filters?.postedWithin) {
      const daysAgo = parseInt(filters?.postedWithin);
      const cutoffDate = new Date();
      cutoffDate?.setDate(cutoffDate?.getDate() - daysAgo);
      
      filtered = filtered?.filter(job => {
        const postedDate = new Date(job.postedDate);
        return postedDate >= cutoffDate;
      });
    }

    if (filters?.remoteWork) {
      filtered = filtered?.filter(job => job?.location?.toLowerCase()?.includes('remote'));
    }

    if (filters?.entryLevel) {
      filtered = filtered?.filter(job => job?.experienceLevel?.toLowerCase()?.includes('entry'));
    }

    if (filters?.hasLearningPath) {
      filtered = filtered?.filter(job => job?.recommendedLearningPath);
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case 'date':
          aValue = new Date(a.postedDate);
          bValue = new Date(b.postedDate);
          break;
        case 'salary':
          aValue = a?.salaryMax;
          bValue = b?.salaryMax;
          break;
        case 'skillMatch':
          aValue = a?.skillMatch;
          bValue = b?.skillMatch;
          break;
        case 'company':
          aValue = a?.company?.toLowerCase();
          bValue = b?.company?.toLowerCase();
          break;
        case 'location':
          aValue = a?.location?.toLowerCase();
          bValue = b?.location?.toLowerCase();
          break;
        default: // relevance
          aValue = a?.skillMatch;
          bValue = b?.skillMatch;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredJobs(filtered);
  }, [jobs, searchQuery, filters, sortBy, sortOrder]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      location: [],
      industry: [],
      experienceLevel: [],
      jobType: [],
      salary: { min: '', max: '' },
      skillMatch: 0,
      postedWithin: '',
      remoteWork: false,
      entryLevel: false,
      hasLearningPath: false
    };
    setFilters(clearedFilters);
    setSearchQuery('');
  };

  const handleSortChange = (newSortBy, newSortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  const handleSaveJob = (jobId, isSaved) => {
    setJobs(prevJobs =>
      prevJobs?.map(job =>
        job?.id === jobId ? { ...job, isSaved } : job
      )
    );
  };

  const handleApplyJob = (jobId) => {
    // In a real app, this would navigate to application page
    console.log('Applying to job:', jobId);
    alert('Application functionality would be implemented here');
  };

  const handleViewJobDetails = (jobId) => {
    // In a real app, this would navigate to job details page
    console.log('Viewing job details:', jobId);
    alert('Job details page would be implemented here');
  };

  const handleExploreAll = () => {
    handleClearFilters();
  };

  const hasActiveFilters = () => {
    return (filters?.location?.length > 0 ||
    filters?.industry?.length > 0 ||
    filters?.experienceLevel?.length > 0 ||
    filters?.jobType?.length > 0 ||
    filters?.salary?.min ||
    filters?.salary?.max ||
    filters?.skillMatch > 0 ||
    filters?.postedWithin ||
    filters?.remoteWork ||
    filters?.entryLevel ||
    filters?.hasLearningPath || searchQuery);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="student" isAuthenticated={true} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumbs */}
          <NavigationBreadcrumbs userRole="student" />

          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon name="Search" size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Job Explorer</h1>
                <p className="text-muted-foreground">
                  Discover opportunities matched to your skills and learning progress
                </p>
              </div>
            </div>

            {/* Search Bar */}
            <SearchBar onSearch={handleSearch} initialQuery={searchQuery} />
          </div>

          {/* Job Statistics */}
          <JobStats stats={jobStats} />

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filter Sidebar */}
            <div className="lg:w-80 flex-shrink-0">
              <FilterPanel
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onClearFilters={handleClearFilters}
                isOpen={isFilterOpen}
                onToggle={() => setIsFilterOpen(!isFilterOpen)}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Sort Controls */}
              <SortControls
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSortChange={handleSortChange}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                totalJobs={filteredJobs?.length}
              />

              {/* Job Listings */}
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <span className="ml-3 text-muted-foreground">Loading jobs...</span>
                </div>
              ) : filteredJobs?.length > 0 ? (
                <div className={`grid gap-6 ${
                  viewMode === 'grid' ?'grid-cols-1 xl:grid-cols-2' :'grid-cols-1'
                }`}>
                  {filteredJobs?.map((job) => (
                    <JobCard
                      key={job?.id}
                      job={job}
                      onSave={handleSaveJob}
                      onApply={handleApplyJob}
                      onViewDetails={handleViewJobDetails}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  hasFilters={hasActiveFilters()}
                  onClearFilters={handleClearFilters}
                  onExploreAll={handleExploreAll}
                />
              )}

              {/* Load More Button */}
              {filteredJobs?.length > 0 && filteredJobs?.length >= 10 && (
                <div className="text-center mt-8">
                  <Button
                    variant="outline"
                    size="lg"
                    iconName="ChevronDown"
                    iconPosition="right"
                    iconSize={16}
                  >
                    Load More Jobs
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobExplorer;