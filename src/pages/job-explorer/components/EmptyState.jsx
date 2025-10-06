import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ hasFilters, onClearFilters, onExploreAll }) => {
  if (hasFilters) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
          <Icon name="Search" size={32} className="text-muted-foreground" />
        </div>
        
        <h3 className="text-xl font-semibold text-foreground mb-2">
          No jobs match your filters
        </h3>
        
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Try adjusting your search criteria or clearing some filters to see more opportunities.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <Button
            variant="default"
            onClick={onClearFilters}
            iconName="RotateCcw"
            iconPosition="left"
            iconSize={16}
          >
            Clear All Filters
          </Button>
          
          <Button
            variant="outline"
            onClick={onExploreAll}
            iconName="Compass"
            iconPosition="left"
            iconSize={16}
          >
            Explore All Jobs
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-12">
      <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
        <Icon name="Briefcase" size={32} className="text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        No jobs available
      </h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        We're constantly adding new opportunities. Check back soon or set up job alerts to be notified of new postings.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
        <Button
          variant="default"
          onClick={() => window.location?.reload()}
          iconName="RefreshCw"
          iconPosition="left"
          iconSize={16}
        >
          Refresh Page
        </Button>
        
        <Button
          variant="outline"
          iconName="Bell"
          iconPosition="left"
          iconSize={16}
        >
          Set Job Alerts
        </Button>
      </div>
    </div>
  );
};

export default EmptyState;