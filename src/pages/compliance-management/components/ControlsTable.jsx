import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const ControlsTable = ({ controls, onControlUpdate, onViewEvidence }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [familyFilter, setFamilyFilter] = useState('all');

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'implemented', label: 'Implemented' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'not-started', label: 'Not Started' },
    { value: 'needs-review', label: 'Needs Review' }
  ];

  const familyOptions = [
    { value: 'all', label: 'All Families' },
    { value: 'access-control', label: 'Access Control' },
    { value: 'audit-accountability', label: 'Audit & Accountability' },
    { value: 'configuration-management', label: 'Configuration Management' },
    { value: 'identification-authentication', label: 'Identification & Authentication' },
    { value: 'incident-response', label: 'Incident Response' },
    { value: 'risk-assessment', label: 'Risk Assessment' },
    { value: 'system-communications', label: 'System & Communications' }
  ];

  const getStatusConfig = (status) => {
    switch (status) {
      case 'implemented':
        return { color: 'text-success', bg: 'bg-success/10', icon: 'CheckCircle', label: 'Implemented' };
      case 'in-progress':
        return { color: 'text-warning', bg: 'bg-warning/10', icon: 'Clock', label: 'In Progress' };
      case 'not-started':
        return { color: 'text-error', bg: 'bg-error/10', icon: 'XCircle', label: 'Not Started' };
      case 'needs-review':
        return { color: 'text-accent', bg: 'bg-accent/10', icon: 'AlertTriangle', label: 'Needs Review' };
      default:
        return { color: 'text-muted-foreground', bg: 'bg-muted/10', icon: 'Circle', label: 'Unknown' };
    }
  };

  const getPriorityConfig = (priority) => {
    switch (priority) {
      case 'high':
        return { color: 'text-error', bg: 'bg-error/10', label: 'High' };
      case 'medium':
        return { color: 'text-warning', bg: 'bg-warning/10', label: 'Medium' };
      case 'low':
        return { color: 'text-success', bg: 'bg-success/10', label: 'Low' };
      default:
        return { color: 'text-muted-foreground', bg: 'bg-muted/10', label: 'Normal' };
    }
  };

  const filteredControls = controls?.filter(control => {
    const matchesSearch = control?.id?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         control?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         control?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesStatus = statusFilter === 'all' || control?.status === statusFilter;
    const matchesFamily = familyFilter === 'all' || control?.family === familyFilter;
    
    return matchesSearch && matchesStatus && matchesFamily;
  });

  return (
    <div className="bg-card rounded-lg security-shadow-sm border border-border">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Control Implementation</h3>
            <p className="text-sm text-muted-foreground">Manage and track compliance controls</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" iconName="Download" iconPosition="left" size="sm">
              Export
            </Button>
            <Button variant="default" iconName="Plus" iconPosition="left" size="sm">
              Add Control
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            type="search"
            placeholder="Search controls..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="col-span-1 md:col-span-2"
          />
          <Select
            placeholder="Filter by status"
            options={statusOptions}
            value={statusFilter}
            onChange={setStatusFilter}
          />
          <Select
            placeholder="Filter by family"
            options={familyOptions}
            value={familyFilter}
            onChange={setFamilyFilter}
          />
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-card-foreground">Control ID</th>
              <th className="text-left p-4 text-sm font-medium text-card-foreground">Title & Description</th>
              <th className="text-left p-4 text-sm font-medium text-card-foreground">Status</th>
              <th className="text-left p-4 text-sm font-medium text-card-foreground">Priority</th>
              <th className="text-left p-4 text-sm font-medium text-card-foreground">Owner</th>
              <th className="text-left p-4 text-sm font-medium text-card-foreground">Due Date</th>
              <th className="text-left p-4 text-sm font-medium text-card-foreground">Evidence</th>
              <th className="text-left p-4 text-sm font-medium text-card-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredControls?.map((control) => {
              const statusConfig = getStatusConfig(control?.status);
              const priorityConfig = getPriorityConfig(control?.priority);
              
              return (
                <tr key={control?.id} className="border-b border-border hover:bg-muted/20 transition-security">
                  <td className="p-4">
                    <div className="font-mono text-sm font-medium text-card-foreground">{control?.id}</div>
                    <div className="text-xs text-muted-foreground">{control?.family}</div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-sm text-card-foreground mb-1">{control?.title}</div>
                    <div className="text-xs text-muted-foreground line-clamp-2">{control?.description}</div>
                  </td>
                  <td className="p-4">
                    <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${statusConfig?.bg} ${statusConfig?.color}`}>
                      <Icon name={statusConfig?.icon} size={12} />
                      <span>{statusConfig?.label}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${priorityConfig?.bg} ${priorityConfig?.color}`}>
                      {priorityConfig?.label}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <Icon name="User" size={12} color="white" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-card-foreground">{control?.owner}</div>
                        <div className="text-xs text-muted-foreground">{control?.ownerRole}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-card-foreground">{control?.dueDate}</div>
                    {control?.isOverdue && (
                      <div className="text-xs text-error font-medium">Overdue</div>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <div className="text-sm text-card-foreground">{control?.evidenceCount}</div>
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Eye"
                        onClick={() => onViewEvidence(control?.id)}
                      >
                        View
                      </Button>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        iconName="Edit"
                        onClick={() => onControlUpdate(control?.id)}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        iconName="MoreVertical"
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {filteredControls?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No controls found matching your criteria</p>
        </div>
      )}
      {/* Pagination */}
      {filteredControls?.length > 0 && (
        <div className="p-4 border-t border-border flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {filteredControls?.length} of {controls?.length} controls
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="ChevronLeft">
              Previous
            </Button>
            <Button variant="outline" size="sm" iconName="ChevronRight">
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ControlsTable;