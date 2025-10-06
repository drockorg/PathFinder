import React from 'react';
import Icon from '../../../components/AppIcon';
import GhanaFlagAccent from './GhanaFlagAccent';

const WelcomeMessage = () => {
  const features = [
    {
      icon: 'Brain',
      title: 'AI-Powered Learning',
      description: 'Personalized learning paths designed by artificial intelligence'
    },
    {
      icon: 'Target',
      title: 'Job Matching',
      description: 'Connect directly with employers looking for your skills'
    },
    {
      icon: 'TrendingUp',
      title: 'Career Growth',
      description: 'Track your progress and advance your professional journey'
    },
    {
      icon: 'Users',
      title: 'Community',
      description: 'Join thousands of Ghanaian youth building their future'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center justify-center w-20 h-20 bg-primary rounded-full mr-4">
            <Icon name="Compass" size={40} color="white" />
          </div>
          <GhanaFlagAccent />
        </div>
        
        <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
          Welcome to <span className="text-primary">Pathfinders</span>
        </h1>
        
        <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
          Bridging Ghana's skills gap through AI-powered learning paths and direct job connections
        </p>
        
        <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Icon name="MapPin" size={16} className="text-primary" />
            <span>Made for Ghana</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={16} className="text-success" />
            <span>Secure & Trusted</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Smartphone" size={16} className="text-secondary" />
            <span>Mobile First</span>
          </div>
        </div>
      </div>
      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features?.map((feature, index) => (
          <div key={index} className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg flex-shrink-0">
                <Icon name={feature?.icon} size={24} className="text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature?.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature?.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Call to Action */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Ready to Transform Your Future?
        </h2>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Join the movement of Ghanaian youth who are building successful careers through technology and education.
        </p>
        
        <div className="flex items-center justify-center space-x-4 text-sm">
          <div className="flex items-center space-x-2 bg-card px-4 py-2 rounded-lg border border-border">
            <Icon name="Clock" size={16} className="text-primary" />
            <span className="text-foreground">Quick Setup</span>
          </div>
          <div className="flex items-center space-x-2 bg-card px-4 py-2 rounded-lg border border-border">
            <Icon name="Zap" size={16} className="text-secondary" />
            <span className="text-foreground">Instant Access</span>
          </div>
          <div className="flex items-center space-x-2 bg-card px-4 py-2 rounded-lg border border-border">
            <Icon name="Heart" size={16} className="text-success" />
            <span className="text-foreground">Free to Start</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;