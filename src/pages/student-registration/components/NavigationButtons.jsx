import React from 'react';
import Button from '../../../components/ui/Button';

const NavigationButtons = ({ 
  currentStep, 
  totalSteps, 
  onPrevious, 
  onNext, 
  onSubmit, 
  isSubmitting,
  isValid 
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-border">
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <span>Step {currentStep} of {totalSteps}</span>
      </div>

      <div className="flex items-center space-x-3 w-full sm:w-auto">
        {currentStep > 1 && (
          <Button
            variant="outline"
            onClick={onPrevious}
            iconName="ChevronLeft"
            iconPosition="left"
            iconSize={16}
            className="flex-1 sm:flex-none"
            disabled={isSubmitting}
          >
            Previous
          </Button>
        )}

        {currentStep < totalSteps ? (
          <Button
            variant="default"
            onClick={onNext}
            iconName="ChevronRight"
            iconPosition="right"
            iconSize={16}
            className="flex-1 sm:flex-none"
            disabled={!isValid}
          >
            Next Step
          </Button>
        ) : (
          <Button
            variant="default"
            onClick={onSubmit}
            iconName="UserPlus"
            iconPosition="left"
            iconSize={16}
            loading={isSubmitting}
            disabled={!isValid || isSubmitting}
            className="flex-1 sm:flex-none"
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default NavigationButtons;