import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ filters, onFiltersChange, onClearFilters, isOpen, onToggle }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const locationOptions = [
    { value: 'accra', label: 'Accra' },
    { value: 'kumasi', label: 'Kumasi' },
    { value: 'tamale', label: 'Tamale' },
    { value: 'cape-coast', label: 'Cape Coast' },
    { value: 'ho', label: 'Ho' },
    { value: 'koforidua', label: 'Koforidua' },
    { value: 'sunyani', label: 'Sunyani' },
    { value: 'wa', label: 'Wa' },
    { value: 'bolgatanga', label: 'Bolgatanga' },
    { value: 'remote', label: 'Remote' }
  ];

  const industryOptions = [
    { value: 'technology', label: 'Technology' },
    { value: 'finance', label: 'Finance & Banking' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'agriculture', label: 'Agriculture' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'retail', label: 'Retail & Commerce' },
    { value: 'telecommunications', label: 'Telecommunications' },
    { value: 'mining', label: 'Mining & Resources' },
    { value: 'hospitality', label: 'Hospitality & Tourism' }
  ];

  const experienceLevelOptions = [
    { value: 'entry', label: 'Entry Level (0-2 years)' },
    { value: 'junior', label: 'Junior (2-4 years)' },
    { value: 'mid', label: 'Mid Level (4-7 years)' },
    { value: 'senior', label: 'Senior (7+ years)' },
    { value: 'executive', label: 'Executive' }
  ];

  const jobTypeOptions = [
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'internship', label: 'Internship' },
    { value: 'freelance', label: 'Freelance' }
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleSalaryChange = (type, value) => {
    const numValue = value ? parseInt(value?.replace(/,/g, '')) : '';
    const updatedFilters = {
      ...localFilters,
      salary: {
        ...localFilters?.salary,
        [type]: numValue
      }
    };
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleClearAll = () => {
    const clearedFilters = {
      location: [],
      industry: [],
      experienceLevel: [],
      jobType: [],
      salary: { min: '', max: '' },
      skillMatch: 0,
      postedWithin: ''
    };
    setLocalFilters(clearedFilters);
    onClearFilters();
  };

  const formatNumber = (value) => {
    return value ? value?.toLocaleString() : '';
  };

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={onToggle}
          iconName={isOpen ? "X" : "Filter"}
          iconPosition="left"
          iconSize={18}
          fullWidth
        >
          {isOpen ? 'Close Filters' : 'Show Filters'}
        </Button>
      </div>
      {/* Filter Panel */}
      <div className={`bg-card border border-border rounded-lg p-6 space-y-6 ${isOpen ? 'block' : 'hidden lg:block'}`}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
            <Icon name="Filter" size={20} />
            <span>Filters</span>
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearAll}
            iconName="RotateCcw"
            iconSize={16}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear All
          </Button>
        </div>

        {/* Location Filter */}
        <div>
          <Select
            label="Location"
            placeholder="Select locations"
            multiple
            searchable
            clearable
            options={locationOptions}
            value={localFilters?.location}
            onChange={(value) => handleFilterChange('location', value)}
            className="mb-4"
          />
        </div>

        {/* Industry Filter */}
        <div>
          <Select
            label="Industry"
            placeholder="Select industries"
            multiple
            searchable
            clearable
            options={industryOptions}
            value={localFilters?.industry}
            onChange={(value) => handleFilterChange('industry', value)}
            className="mb-4"
          />
        </div>

        {/* Experience Level */}
        <div>
          <Select
            label="Experience Level"
            placeholder="Select experience level"
            multiple
            options={experienceLevelOptions}
            value={localFilters?.experienceLevel}
            onChange={(value) => handleFilterChange('experienceLevel', value)}
            className="mb-4"
          />
        </div>

        {/* Job Type */}
        <div>
          <Select
            label="Job Type"
            placeholder="Select job types"
            multiple
            options={jobTypeOptions}
            value={localFilters?.jobType}
            onChange={(value) => handleFilterChange('jobType', value)}
            className="mb-4"
          />
        </div>

        {/* Salary Range */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Salary Range (GHS)
          </label>
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="text"
              placeholder="Min salary"
              value={formatNumber(localFilters?.salary?.min)}
              onChange={(e) => handleSalaryChange('min', e?.target?.value)}
            />
            <Input
              type="text"
              placeholder="Max salary"
              value={formatNumber(localFilters?.salary?.max)}
              onChange={(e) => handleSalaryChange('max', e?.target?.value)}
            />
          </div>
        </div>

        {/* Skill Match Threshold */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Minimum Skill Match: {localFilters?.skillMatch}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            step="10"
            value={localFilters?.skillMatch}
            onChange={(e) => handleFilterChange('skillMatch', parseInt(e?.target?.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Posted Within */}
        <div>
          <Select
            label="Posted Within"
            placeholder="Any time"
            options={[
              { value: '1', label: 'Last 24 hours' },
              { value: '7', label: 'Last 7 days' },
              { value: '14', label: 'Last 2 weeks' },
              { value: '30', label: 'Last month' }
            ]}
            value={localFilters?.postedWithin}
            onChange={(value) => handleFilterChange('postedWithin', value)}
          />
        </div>

        {/* Quick Filters */}
        <div className="pt-4 border-t border-border">
          <label className="block text-sm font-medium text-foreground mb-3">
            Quick Filters
          </label>
          <div className="space-y-2">
            <Checkbox
              label="Remote work available"
              checked={localFilters?.remoteWork || false}
              onChange={(e) => handleFilterChange('remoteWork', e?.target?.checked)}
            />
            <Checkbox
              label="Entry level friendly"
              checked={localFilters?.entryLevel || false}
              onChange={(e) => handleFilterChange('entryLevel', e?.target?.checked)}
            />
            <Checkbox
              label="Has learning recommendations"
              checked={localFilters?.hasLearningPath || false}
              onChange={(e) => handleFilterChange('hasLearningPath', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;