import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps }) => {
  const steps = [
    { number: 1, title: 'Personal Info', icon: 'User' },
    { number: 2, title: 'Education', icon: 'GraduationCap' },
    { number: 3, title: 'Career Goals', icon: 'Target' },
    { number: 4, title: 'Complete', icon: 'CheckCircle' }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-muted">
          <div 
            className="h-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          />
        </div>
        
        {steps?.map((step) => (
          <div key={step?.number} className="flex flex-col items-center relative z-10">
            <div className={`
              flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300
              ${currentStep >= step?.number 
                ? 'bg-primary border-primary text-primary-foreground' 
                : 'bg-card border-muted-foreground/30 text-muted-foreground'
              }
            `}>
              <Icon 
                name={step?.icon} 
                size={20} 
                color={currentStep >= step?.number ? 'white' : 'currentColor'}
              />
            </div>
            <span className={`
              mt-2 text-xs font-medium transition-colors duration-300
              ${currentStep >= step?.number ? 'text-primary' : 'text-muted-foreground'}
            `}>
              {step?.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;