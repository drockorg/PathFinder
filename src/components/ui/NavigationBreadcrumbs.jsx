import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const NavigationBreadcrumbs = ({ userRole = 'student' }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const routeLabels = {
    '/student-dashboard': 'Dashboard',
    '/learning-path-builder': 'Learning Path Builder',
    '/job-explorer': 'Job Explorer',
    '/employer-dashboard': 'Dashboard',
    '/candidates': 'Candidates',
    '/job-posts': 'Job Posts',
    '/analytics': 'Analytics',
    '/profile': 'Profile',
    '/login': 'Login',
    '/student-registration': 'Registration'
  };

  const routeIcons = {
    '/student-dashboard': 'Home',
    '/learning-path-builder': 'BookOpen',
    '/job-explorer': 'Search',
    '/employer-dashboard': 'BarChart3',
    '/candidates': 'Users',
    '/job-posts': 'Briefcase',
    '/analytics': 'TrendingUp',
    '/profile': 'User',
    '/login': 'LogIn',
    '/student-registration': 'UserPlus'
  };

  const generateBreadcrumbs = () => {
    const pathSegments = location?.pathname?.split('/')?.filter(Boolean);
    const breadcrumbs = [];

    // Add home/dashboard as first breadcrumb
    const homePath = userRole === 'employer' ? '/employer-dashboard' : '/student-dashboard';
    const homeLabel = userRole === 'employer' ? 'Employer Dashboard' : 'Student Dashboard';
    
    if (location?.pathname !== homePath) {
      breadcrumbs?.push({
        label: homeLabel,
        path: homePath,
        icon: userRole === 'employer' ? 'BarChart3' : 'Home',
        isActive: false
      });
    }

    // Add current page
    const currentLabel = routeLabels?.[location?.pathname] || 'Page';
    const currentIcon = routeIcons?.[location?.pathname] || 'FileText';
    
    breadcrumbs?.push({
      label: currentLabel,
      path: location?.pathname,
      icon: currentIcon,
      isActive: true
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs on login or registration pages
  if (['/login', '/student-registration']?.includes(location?.pathname)) {
    return null;
  }

  // Don't show breadcrumbs if only one item (current page)
  if (breadcrumbs?.length <= 1) {
    return null;
  }

  const handleBreadcrumbClick = (path) => {
    if (path !== location?.pathname) {
      navigate(path);
    }
  };

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {breadcrumbs?.map((breadcrumb, index) => (
          <li key={breadcrumb?.path} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={16} 
                className="mx-2 text-muted-foreground/60" 
              />
            )}
            
            {breadcrumb?.isActive ? (
              <div className="flex items-center space-x-2 px-2 py-1 rounded-md bg-muted/50">
                <Icon 
                  name={breadcrumb?.icon} 
                  size={16} 
                  className="text-primary" 
                />
                <span className="font-medium text-foreground">
                  {breadcrumb?.label}
                </span>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleBreadcrumbClick(breadcrumb?.path)}
                iconName={breadcrumb?.icon}
                iconPosition="left"
                iconSize={16}
                className="px-2 py-1 h-auto text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors duration-150"
              >
                {breadcrumb?.label}
              </Button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default NavigationBreadcrumbs;