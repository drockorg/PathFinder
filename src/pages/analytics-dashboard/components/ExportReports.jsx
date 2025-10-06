import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, FileText, BarChart3, Loader2, Check } from 'lucide-react';

const ExportReports = ({ data }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const exportOptions = [
    {
      id: 'progress',
      label: 'Learning Progress Report',
      description: 'Course completions, skill development, and achievements',
      icon: FileText,
      format: 'PDF'
    },
    {
      id: 'analytics',
      label: 'Analytics Dashboard',
      description: 'Complete analytics overview with charts and insights',
      icon: BarChart3,
      format: 'PDF'
    },
    {
      id: 'portfolio',
      label: 'Portfolio Summary',
      description: 'Skills, projects, and career highlights for employers',
      icon: FileText,
      format: 'PDF'
    }
  ];

  const handleExport = async (exportType) => {
    setIsExporting(true);
    setIsDropdownOpen(false);

    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock export data based on type
      const exportData = generateExportData(exportType, data);
      
      // In a real application, this would generate and download the actual file
      console.log('Export data:', exportData);
      
      setExportSuccess(true);
      setTimeout(() => {
        setExportSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const generateExportData = (type, analyticsData) => {
    const baseInfo = {
      exportDate: new Date()?.toISOString(),
      userName: 'Student User',
      platform: 'Pathfinders Ghana'
    };

    switch (type) {
      case 'progress':
        return {
          ...baseInfo,
          type: 'Learning Progress Report',
          data: {
            totalHours: analyticsData?.overview?.totalLearningHours || 0,
            completionRate: analyticsData?.overview?.completionRate || 0,
            skillsImproved: analyticsData?.overview?.skillsImproved || 0,
            coursesCompleted: analyticsData?.learning?.courseCompletion?.reduce(
              (sum, month) => sum + month?.completed, 0
            ) || 0,
            achievements: analyticsData?.learning?.achievements?.length || 0,
            activePaths: analyticsData?.learning?.skillDevelopment?.length || 0
          }
        };
      
      case 'analytics':
        return {
          ...baseInfo,
          type: 'Complete Analytics Dashboard',
          data: analyticsData
        };
      
      case 'portfolio':
        return {
          ...baseInfo,
          type: 'Portfolio Summary',
          data: {
            skills: analyticsData?.learning?.skillDevelopment || [],
            achievements: analyticsData?.learning?.achievements || [],
            jobApplications: analyticsData?.jobs?.applicationsByMonth?.reduce(
              (sum, month) => sum + month?.applications, 0
            ) || 0,
            interviewsAttended: analyticsData?.jobs?.applicationsByMonth?.reduce(
              (sum, month) => sum + month?.interviews, 0
            ) || 0,
            completionRate: analyticsData?.overview?.completionRate || 0
          }
        };
      
      default:
        return { ...baseInfo, data: analyticsData };
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        disabled={isExporting}
        className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isExporting ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : exportSuccess ? (
          <Check className="w-4 h-4" />
        ) : (
          <Download className="w-4 h-4" />
        )}
        <span>
          {isExporting ? 'Exporting...' : exportSuccess ? 'Exported!' : 'Export'}
        </span>
      </button>
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-lg shadow-lg z-50"
          >
            <div className="p-3">
              <div className="text-sm font-semibold text-foreground mb-3">
                Export Reports
              </div>
              
              <div className="space-y-2">
                {exportOptions?.map((option) => {
                  const IconComponent = option?.icon;
                  
                  return (
                    <button
                      key={option?.id}
                      onClick={() => handleExport(option?.id)}
                      className="w-full p-3 text-left hover:bg-muted rounded-lg transition-colors duration-200 group"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-200">
                          <IconComponent className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div className="text-sm font-medium text-foreground">
                              {option?.label}
                            </div>
                            <div className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                              {option?.format}
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {option?.description}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              
              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  Reports will be downloaded as PDF files with your latest data and insights.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
};

export default ExportReports;