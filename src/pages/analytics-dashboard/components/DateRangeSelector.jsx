import React, { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';

const DateRangeSelector = ({ dateRange, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const presetRanges = [
    {
      label: 'Last 30 Days',
      value: {
        start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        end: new Date()
      }
    },
    {
      label: 'Last 3 Months',
      value: {
        start: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
        end: new Date()
      }
    },
    {
      label: 'Last 6 Months',
      value: {
        start: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000),
        end: new Date()
      }
    },
    {
      label: 'Last Year',
      value: {
        start: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
        end: new Date()
      }
    }
  ];

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCurrentRangeLabel = () => {
    const preset = presetRanges?.find(range => 
      Math.abs(range?.value?.start?.getTime() - dateRange?.start?.getTime()) < 24 * 60 * 60 * 1000
    );
    
    if (preset) {
      return preset?.label;
    }
    
    return `${formatDate(dateRange?.start)} - ${formatDate(dateRange?.end)}`;
  };

  const handleRangeSelect = (range) => {
    onChange?.(range?.value);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors duration-200"
      >
        <Calendar className="w-4 h-4" />
        <span>{getCurrentRangeLabel()}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50">
          <div className="p-2">
            {presetRanges?.map((range, index) => (
              <button
                key={index}
                onClick={() => handleRangeSelect(range)}
                className="w-full text-left px-3 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-md transition-colors duration-200"
              >
                {range?.label}
              </button>
            ))}
          </div>
        </div>
      )}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default DateRangeSelector;