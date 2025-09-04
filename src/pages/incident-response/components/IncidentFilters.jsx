import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const IncidentFilters = ({ filters, onFiltersChange, onClearFilters }) => {
  const severityOptions = [
    { value: '', label: 'All Severities' },
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'new', label: 'New' },
    { value: 'investigating', label: 'Investigating' },
    { value: 'containment', label: 'Containment' },
    { value: 'eradication', label: 'Eradication' },
    { value: 'recovery', label: 'Recovery' },
    { value: 'closed', label: 'Closed' }
  ];

  const typeOptions = [
    { value: '', label: 'All Types' },
    { value: 'malware', label: 'Malware Detection' },
    { value: 'phishing', label: 'Phishing Attack' },
    { value: 'data-breach', label: 'Data Breach' },
    { value: 'ddos', label: 'DDoS Attack' },
    { value: 'insider-threat', label: 'Insider Threat' },
    { value: 'unauthorized-access', label: 'Unauthorized Access' },
    { value: 'system-compromise', label: 'System Compromise' }
  ];

  const assigneeOptions = [
    { value: '', label: 'All Assignees' },
    { value: 'john-smith', label: 'John Smith' },
    { value: 'sarah-johnson', label: 'Sarah Johnson' },
    { value: 'mike-chen', label: 'Mike Chen' },
    { value: 'lisa-davis', label: 'Lisa Davis' },
    { value: 'unassigned', label: 'Unassigned' }
  ];

  const timeRangeOptions = [
    { value: '', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const hasActiveFilters = Object.values(filters)?.some(value => value !== '');

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-muted-foreground" />
          <h3 className="font-semibold text-card-foreground">Filters</h3>
          {hasActiveFilters && (
            <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full font-medium">
              Active
            </span>
          )}
        </div>
        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
            className="text-muted-foreground hover:text-card-foreground"
          >
            Clear All
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <div>
          <Input
            label="Search"
            type="search"
            placeholder="Search incidents..."
            value={filters?.search || ''}
            onChange={(e) => handleFilterChange('search', e?.target?.value)}
            className="w-full"
          />
        </div>

        <div>
          <Select
            label="Severity"
            options={severityOptions}
            value={filters?.severity || ''}
            onChange={(value) => handleFilterChange('severity', value)}
            placeholder="Select severity"
          />
        </div>

        <div>
          <Select
            label="Status"
            options={statusOptions}
            value={filters?.status || ''}
            onChange={(value) => handleFilterChange('status', value)}
            placeholder="Select status"
          />
        </div>

        <div>
          <Select
            label="Type"
            options={typeOptions}
            value={filters?.type || ''}
            onChange={(value) => handleFilterChange('type', value)}
            placeholder="Select type"
          />
        </div>

        <div>
          <Select
            label="Assignee"
            options={assigneeOptions}
            value={filters?.assignee || ''}
            onChange={(value) => handleFilterChange('assignee', value)}
            placeholder="Select assignee"
          />
        </div>

        <div>
          <Select
            label="Time Range"
            options={timeRangeOptions}
            value={filters?.timeRange || ''}
            onChange={(value) => handleFilterChange('timeRange', value)}
            placeholder="Select time range"
          />
        </div>
      </div>
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Info" size={16} />
            <span>
              Showing filtered results
              {filters?.search && ` for "${filters?.search}"`}
              {filters?.severity && ` • Severity: ${filters?.severity}`}
              {filters?.status && ` • Status: ${filters?.status}`}
              {filters?.type && ` • Type: ${filters?.type}`}
              {filters?.assignee && ` • Assignee: ${filters?.assignee}`}
              {filters?.timeRange && ` • Time: ${filters?.timeRange}`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncidentFilters;