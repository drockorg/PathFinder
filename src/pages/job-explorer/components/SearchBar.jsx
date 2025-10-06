import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchBar = ({ onSearch, initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const popularSearches = [
    'Software Developer',
    'Data Analyst',
    'Digital Marketing',
    'Customer Service',
    'Sales Representative',
    'Graphic Designer',
    'Project Manager',
    'Accountant',
    'Teacher',
    'Nurse'
  ];

  const recentSearches = [
    'React Developer',
    'Marketing Manager',
    'Data Scientist'
  ];

  useEffect(() => {
    if (query?.length > 2) {
      const filtered = popularSearches?.filter(search =>
        search?.toLowerCase()?.includes(query?.toLowerCase())
      );
      setSuggestions(filtered?.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  const handleSearch = (searchQuery = query) => {
    if (searchQuery?.trim()) {
      onSearch(searchQuery?.trim());
      setShowSuggestions(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    handleSearch(suggestion);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon name="Search" size={20} className="text-muted-foreground" />
        </div>
        
        <Input
          type="text"
          placeholder="Search jobs, companies, or skills..."
          value={query}
          onChange={(e) => setQuery(e?.target?.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => query?.length > 2 && setShowSuggestions(true)}
          className="pl-10 pr-20"
        />
        
        <div className="absolute inset-y-0 right-0 flex items-center space-x-1 pr-2">
          {query && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              iconName="X"
              iconSize={16}
              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
              title="Clear search"
            />
          )}
          
          <Button
            variant="default"
            size="sm"
            onClick={() => handleSearch()}
            iconName="Search"
            iconSize={16}
            className="h-8 px-3"
          >
            Search
          </Button>
        </div>
      </div>
      {/* Search Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          {/* Current Query */}
          {query && (
            <div className="p-3 border-b border-border">
              <button
                onClick={() => handleSearch()}
                className="flex items-center space-x-3 w-full text-left hover:bg-muted rounded-md p-2 transition-colors"
              >
                <Icon name="Search" size={16} className="text-muted-foreground" />
                <span className="text-foreground">Search for "{query}"</span>
              </button>
            </div>
          )}

          {/* Suggestions */}
          {suggestions?.length > 0 && (
            <div className="p-3">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Suggestions</h4>
              <div className="space-y-1">
                {suggestions?.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="flex items-center space-x-3 w-full text-left hover:bg-muted rounded-md p-2 transition-colors"
                  >
                    <Icon name="TrendingUp" size={16} className="text-muted-foreground" />
                    <span className="text-foreground">{suggestion}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Recent Searches */}
          {!query && recentSearches?.length > 0 && (
            <div className="p-3 border-b border-border">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Recent Searches</h4>
              <div className="space-y-1">
                {recentSearches?.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(search)}
                    className="flex items-center space-x-3 w-full text-left hover:bg-muted rounded-md p-2 transition-colors"
                  >
                    <Icon name="Clock" size={16} className="text-muted-foreground" />
                    <span className="text-foreground">{search}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Popular Searches */}
          {!query && (
            <div className="p-3">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Popular Searches</h4>
              <div className="space-y-1">
                {popularSearches?.slice(0, 5)?.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(search)}
                    className="flex items-center space-x-3 w-full text-left hover:bg-muted rounded-md p-2 transition-colors"
                  >
                    <Icon name="TrendingUp" size={16} className="text-muted-foreground" />
                    <span className="text-foreground">{search}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      {/* Backdrop to close suggestions */}
      {showSuggestions && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowSuggestions(false)}
        />
      )}
    </div>
  );
};

export default SearchBar;