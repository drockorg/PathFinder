import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ userRole = 'student', isAuthenticated = true }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState({
    name: 'John Doe',
    avatar: '/assets/images/avatar-placeholder.png',
    role: userRole
  });
  
  const location = useLocation();
  const navigate = useNavigate();

  const studentNavigation = [
    { label: 'Dashboard', path: '/student-dashboard', icon: 'Home', tooltip: 'Your learning hub' },
    { label: 'Learning Paths', path: '/learning-path-builder', icon: 'BookOpen', tooltip: 'Build your skills' },
    { label: 'Job Explorer', path: '/job-explorer', icon: 'Search', tooltip: 'Find opportunities' },
    { label: 'Profile', path: '/profile-management', icon: 'User', tooltip: 'Manage account' }
  ];

  const employerNavigation = [
    { label: 'Dashboard', path: '/employer-dashboard', icon: 'BarChart3', tooltip: 'Recruitment overview' },
    { label: 'Candidates', path: '/candidates', icon: 'Users', tooltip: 'Browse talent' },
    { label: 'Job Posts', path: '/job-posts', icon: 'Briefcase', tooltip: 'Manage positions' },
    { label: 'Analytics', path: '/analytics', icon: 'TrendingUp', tooltip: 'Track performance' }
  ];

  const currentNavigation = userRole === 'employer' ? employerNavigation : studentNavigation;

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    // Logout logic here
    navigate('/login');
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-navigation">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <Icon name="Compass" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-foreground">Pathfinders</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {currentNavigation?.map((item) => (
              <Button
                key={item?.path}
                variant={isActivePath(item?.path) ? "default" : "ghost"}
                size="sm"
                onClick={() => handleNavigation(item?.path)}
                iconName={item?.icon}
                iconPosition="left"
                iconSize={16}
                className="px-3 py-2"
                title={item?.tooltip}
              >
                {item?.label}
              </Button>
            ))}
          </nav>

          {/* User Menu & Mobile Toggle */}
          <div className="flex items-center space-x-2">
            {/* User Context Indicator */}
            <div className="hidden sm:flex items-center space-x-3">
              <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-muted">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-primary-foreground">
                    {user?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                  </span>
                </div>
                <div className="hidden lg:block">
                  <p className="text-sm font-medium text-foreground">{user?.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                iconName="LogOut"
                iconSize={16}
                className="text-muted-foreground hover:text-foreground"
                title="Sign out"
              >
                <span className="hidden lg:inline">Sign Out</span>
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              iconName={isMobileMenuOpen ? "X" : "Menu"}
              iconSize={20}
              className="md:hidden"
              aria-label="Toggle navigation menu"
            />
          </div>
        </div>
      </header>
      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-mobile-menu md:hidden">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          
          <div className="fixed top-16 left-0 right-0 bottom-0 bg-card border-t border-border animate-slide-in">
            <div className="flex flex-col h-full">
              {/* Navigation Items */}
              <nav className="flex-1 px-4 py-6 space-y-2">
                {currentNavigation?.map((item) => (
                  <Button
                    key={item?.path}
                    variant={isActivePath(item?.path) ? "default" : "ghost"}
                    size="lg"
                    onClick={() => handleNavigation(item?.path)}
                    iconName={item?.icon}
                    iconPosition="left"
                    iconSize={20}
                    fullWidth
                    className="justify-start px-4 py-3 text-left"
                  >
                    <span className="ml-3">{item?.label}</span>
                  </Button>
                ))}
              </nav>

              {/* Mobile User Section */}
              <div className="border-t border-border p-4 space-y-4 safe-area-bottom">
                <div className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-muted">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary-foreground">
                      {user?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{user?.name}</p>
                    <p className="text-sm text-muted-foreground capitalize">{user?.role}</p>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleLogout}
                  iconName="LogOut"
                  iconPosition="left"
                  iconSize={18}
                  fullWidth
                  className="justify-start"
                >
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;