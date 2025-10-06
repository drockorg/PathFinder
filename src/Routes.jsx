import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import LoginPage from './pages/login';
import JobExplorer from './pages/job-explorer';
import StudentDashboard from './pages/student-dashboard';
import EmployerDashboard from './pages/employer-dashboard';
import LearningPathBuilder from './pages/learning-path-builder';
import StudentRegistration from './pages/student-registration';
import SkillsAssessmentHub from './pages/skills-assessment-hub';
import ProfileManagement from './pages/profile-management';
import AnalyticsDashboard from './pages/analytics-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/job-explorer" element={<JobExplorer />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/employer-dashboard" element={<EmployerDashboard />} />
        <Route path="/learning-path-builder" element={<LearningPathBuilder />} />
        <Route path="/student-registration" element={<StudentRegistration />} />
        <Route path="/skills-assessment-hub" element={<SkillsAssessmentHub />} />
        <Route path="/profile-management" element={<ProfileManagement />} />
        <Route path="/analytics-dashboard" element={<AnalyticsDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
