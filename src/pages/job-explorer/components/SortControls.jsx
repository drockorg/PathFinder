import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const SortControls = ({ sortBy, sortOrder, onSortChange, viewMode, onViewModeChange, totalJobs }) => {
  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'date', label: 'Date Posted' },
    { value: 'salary', label: 'Salary' },
    { value: 'skillMatch', label: 'Skill Match' },
    { value: 'company', label: 'Company Name' },
    { value: 'location', label: 'Location' }
  ];

  const handleSortChange = (newSortBy) => {
    if (newSortBy === sortBy) {
      // Toggle sort order if same field
      onSortChange(sortBy, sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new sort field with default order
      const defaultOrder = newSortBy === 'date' || newSortBy === 'salary' || newSortBy === 'skillMatch' ? 'desc' : 'asc';
      onSortChange(newSortBy, defaultOrder);
    }
  };

  const getSortIcon = () => {
    return sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const getSortLabel = () => {
    const option = sortOptions?.find(opt => opt?.value === sortBy);
    return option ? option?.label : 'Relevance';
  };

  return (
    <div className="flex items-center justify-between bg-card border border-border rounded-lg p-4 mb-6">
      {/* Results Count */}
      <div className="flex items-center space-x-2">
        <Icon name="Search" size={16} className="text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          {totalJobs?.toLocaleString()} jobs found
        </span>
      </div>
      {/* Sort and View Controls */}
      <div className="flex items-center space-x-4">
        {/* Sort Controls */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground hidden sm:inline">Sort by:</span>
          
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={handleSortChange}
            className="min-w-32"
          />
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSortChange(sortBy, sortOrder === 'asc' ? 'desc' : 'asc')}
            iconName={getSortIcon()}
            iconSize={16}
            className="h-8 w-8 p-0"
            title={`Sort ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
          />
        </div>

        {/* View Mode Toggle */}
        <div className="hidden md:flex items-center space-x-1 border border-border rounded-md p-1">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('grid')}
            iconName="Grid3X3"
            iconSize={16}
            className="h-8 w-8 p-0"
            title="Grid view"
          />
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('list')}
            iconName="List"
            iconSize={16}
            className="h-8 w-8 p-0"
            title="List view"
          />
        </div>
      </div>
    </div>
  );
};

export default SortControls;