import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ThreatSidebar = ({ onFilterChange, activeFilters }) => {
  const [expandedSections, setExpandedSections] = useState({
    severity: true,
    category: true,
    timeRange: true,
    status: true
  });

  const severityFilters = [
    { id: 'critical', label: 'Critical', count: 12, color: 'text-error' },
    { id: 'high', label: 'High', count: 28, color: 'text-warning' },
    { id: 'medium', label: 'Medium', count: 45, color: 'text-accent' },
    { id: 'low', label: 'Low', count: 23, color: 'text-success' }
  ];

  const categoryFilters = [
    { id: 'malware', label: 'Malware', count: 34, icon: 'Bug' },
    { id: 'phishing', label: 'Phishing', count: 18, icon: 'Mail' },
    { id: 'ddos', label: 'DDoS Attack', count: 15, icon: 'Zap' },
    { id: 'intrusion', label: 'Intrusion Attempt', count: 22, icon: 'Shield' },
    { id: 'data_exfil', label: 'Data Exfiltration', count: 8, icon: 'Download' },
    { id: 'suspicious', label: 'Suspicious Activity', count: 31, icon: 'Eye' }
  ];

  const timeRangeFilters = [
    { id: 'last_hour', label: 'Last Hour' },
    { id: 'last_24h', label: 'Last 24 Hours' },
    { id: 'last_week', label: 'Last Week' },
    { id: 'last_month', label: 'Last Month' },
    { id: 'custom', label: 'Custom Range' }
  ];

  const statusFilters = [
    { id: 'active', label: 'Active', count: 67, color: 'text-error' },
    { id: 'investigating', label: 'Investigating', count: 23, color: 'text-warning' },
    { id: 'resolved', label: 'Resolved', count: 156, color: 'text-success' },
    { id: 'false_positive', label: 'False Positive', count: 12, color: 'text-muted-foreground' }
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const handleFilterToggle = (filterType, filterId) => {
    onFilterChange(filterType, filterId);
  };

  const clearAllFilters = () => {
    onFilterChange('clear_all');
  };

  const isFilterActive = (filterType, filterId) => {
    return activeFilters?.[filterType]?.includes(filterId) || false;
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters)?.reduce((total, filters) => total + (filters?.length || 0), 0);
  };

  const FilterSection = ({ title, sectionKey, children }) => (
    <div className="mb-6">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="flex items-center justify-between w-full p-2 text-left hover:bg-muted rounded-md transition-security"
      >
        <h3 className="font-semibold text-sm text-text-primary">{title}</h3>
        <Icon 
          name={expandedSections?.[sectionKey] ? "ChevronDown" : "ChevronRight"} 
          size={16} 
          className="text-muted-foreground"
        />
      </button>
      {expandedSections?.[sectionKey] && (
        <div className="mt-3 space-y-2">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full h-full bg-surface border-r border-border overflow-y-auto">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={20} className="text-primary" />
            <h2 className="font-semibold text-lg text-text-primary">Filters</h2>
          </div>
          {getActiveFilterCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-xs"
            >
              Clear All
            </Button>
          )}
        </div>

        {/* Active Filters Summary */}
        {getActiveFilterCount() > 0 && (
          <div className="mb-6 p-3 bg-muted rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-sm font-medium text-text-primary">
                {getActiveFilterCount()} Active Filter{getActiveFilterCount() > 1 ? 's' : ''}
              </span>
            </div>
          </div>
        )}

        {/* Severity Filters */}
        <FilterSection title="Threat Severity" sectionKey="severity">
          {severityFilters?.map((filter) => (
            <label
              key={filter?.id}
              className="flex items-center justify-between p-2 hover:bg-muted rounded-md cursor-pointer transition-security"
            >
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={isFilterActive('severity', filter?.id)}
                  onChange={() => handleFilterToggle('severity', filter?.id)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                />
                <span className={`text-sm font-medium ${filter?.color}`}>
                  {filter?.label}
                </span>
              </div>
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                {filter?.count}
              </span>
            </label>
          ))}
        </FilterSection>

        {/* Category Filters */}
        <FilterSection title="Threat Category" sectionKey="category">
          {categoryFilters?.map((filter) => (
            <label
              key={filter?.id}
              className="flex items-center justify-between p-2 hover:bg-muted rounded-md cursor-pointer transition-security"
            >
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={isFilterActive('category', filter?.id)}
                  onChange={() => handleFilterToggle('category', filter?.id)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                />
                <Icon name={filter?.icon} size={16} className="text-muted-foreground" />
                <span className="text-sm text-text-primary">{filter?.label}</span>
              </div>
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                {filter?.count}
              </span>
            </label>
          ))}
        </FilterSection>

        {/* Time Range Filters */}
        <FilterSection title="Time Range" sectionKey="timeRange">
          {timeRangeFilters?.map((filter) => (
            <label
              key={filter?.id}
              className="flex items-center space-x-3 p-2 hover:bg-muted rounded-md cursor-pointer transition-security"
            >
              <input
                type="radio"
                name="timeRange"
                checked={isFilterActive('timeRange', filter?.id)}
                onChange={() => handleFilterToggle('timeRange', filter?.id)}
                className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
              />
              <span className="text-sm text-text-primary">{filter?.label}</span>
            </label>
          ))}
        </FilterSection>

        {/* Status Filters */}
        <FilterSection title="Investigation Status" sectionKey="status">
          {statusFilters?.map((filter) => (
            <label
              key={filter?.id}
              className="flex items-center justify-between p-2 hover:bg-muted rounded-md cursor-pointer transition-security"
            >
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={isFilterActive('status', filter?.id)}
                  onChange={() => handleFilterToggle('status', filter?.id)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                />
                <span className={`text-sm ${filter?.color}`}>{filter?.label}</span>
              </div>
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                {filter?.count}
              </span>
            </label>
          ))}
        </FilterSection>

        {/* Quick Actions */}
        <div className="mt-8 pt-6 border-t border-border">
          <h3 className="font-semibold text-sm text-text-primary mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              iconName="RefreshCw"
              iconPosition="left"
              className="w-full justify-start"
            >
              Refresh Threats
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
              className="w-full justify-start"
            >
              Export Report
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Settings"
              iconPosition="left"
              className="w-full justify-start"
            >
              Configure Alerts
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreatSidebar;