import React from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const ComplianceFrameworkSelector = ({ selectedFramework, onFrameworkChange, frameworks }) => {
  const frameworkOptions = frameworks?.map(framework => ({
    value: framework?.id,
    label: framework?.name,
    description: `${framework?.controlsCount} controls • ${framework?.completionRate}% complete`
  }));

  return (
    <div className="bg-card rounded-lg p-6 security-shadow-sm border border-border">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Shield" size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-card-foreground">Compliance Framework</h2>
          <p className="text-sm text-muted-foreground">Select framework to view controls and status</p>
        </div>
      </div>

      <Select
        label="Active Framework"
        placeholder="Choose compliance framework"
        options={frameworkOptions}
        value={selectedFramework}
        onChange={onFrameworkChange}
        searchable
        className="mb-4"
      />

      {selectedFramework && (
        <div className="mt-4 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-sm font-medium text-card-foreground">Framework Active</span>
            </div>
            <span className="text-xs text-muted-foreground">Last updated: Today, 9:15 AM</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplianceFrameworkSelector;