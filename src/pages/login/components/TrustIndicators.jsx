import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustIndicators = () => {
  const trustMetrics = [
    {
      icon: 'Users',
      value: '25,000+',
      label: 'Active Learners',
      color: 'text-primary'
    },
    {
      icon: 'Briefcase',
      value: '1,200+',
      label: 'Job Opportunities',
      color: 'text-secondary'
    },
    {
      icon: 'Award',
      value: '95%',
      label: 'Success Rate',
      color: 'text-success'
    }
  ];

  const certifications = [
    {
      name: 'Ghana Education Service',
      badge: 'GES Certified',
      color: 'bg-red-600'
    },
    {
      name: 'Ministry of Employment',
      badge: 'MOE Approved',
      color: 'bg-yellow-600'
    },
    {
      name: 'Ghana Tech Hub',
      badge: 'GTH Partner',
      color: 'bg-green-600'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Trust Metrics */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
          Trusted by Ghana's Youth
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {trustMetrics?.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-muted rounded-full mx-auto mb-2">
                <Icon name={metric?.icon} size={20} className={metric?.color} />
              </div>
              <div className="text-2xl font-bold text-foreground">{metric?.value}</div>
              <div className="text-sm text-muted-foreground">{metric?.label}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Certifications */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
          Official Certifications
        </h3>
        
        <div className="space-y-3">
          {certifications?.map((cert, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <div className={`w-3 h-3 rounded-full ${cert?.color}`}></div>
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground">{cert?.badge}</div>
                <div className="text-xs text-muted-foreground">{cert?.name}</div>
              </div>
              <Icon name="CheckCircle" size={16} className="text-success" />
            </div>
          ))}
        </div>
      </div>
      {/* Success Stories */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
          Success Stories
        </h3>
        
        <div className="space-y-4">
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-medium text-primary-foreground">KA</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-foreground mb-1">
                  "Pathfinders helped me land my dream job at MTN Ghana!"
                </p>
                <p className="text-xs text-muted-foreground">
                  - Kwame Asante, Software Developer
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-medium text-secondary-foreground">AM</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-foreground mb-1">
                  "The AI learning paths matched perfectly with industry needs."
                </p>
                <p className="text-xs text-muted-foreground">
                  - Ama Mensah, Data Analyst
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustIndicators;