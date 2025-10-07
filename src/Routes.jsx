import React from "react";
import { Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import LoginPage from './pages/login';
import ForgotPassword from './pages/forgot-password';
import ResetPassword from './pages/reset-password';
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
    <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
          {/* Public Routes */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/student-registration" element={<StudentRegistration />} />

          {/* Protected Student Routes */}
          <Route
            path="/student-dashboard"
            element={
              <ProtectedRoute roles={['user', 'student']}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/job-explorer"
            element={
              <ProtectedRoute roles={['user', 'student']}>
                <JobExplorer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/learning-path-builder"
            element={
              <ProtectedRoute roles={['user', 'student']}>
                <LearningPathBuilder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/skills-assessment-hub"
            element={
              <ProtectedRoute roles={['user', 'student']}>
                <SkillsAssessmentHub />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile-management"
            element={
              <ProtectedRoute roles={['user', 'student', 'employer']}>
                <ProfileManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics-dashboard"
            element={
              <ProtectedRoute roles={['user', 'student', 'employer']}>
                <AnalyticsDashboard />
              </ProtectedRoute>
            }
          />

          {/* Protected Employer Routes */}
          <Route
            path="/employer-dashboard"
            element={
              <ProtectedRoute roles={['employer']}>
                <EmployerDashboard />
              </ProtectedRoute>
            }
          />

          {/* Catch-all Route */}
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
  );
};

export default Routes;
