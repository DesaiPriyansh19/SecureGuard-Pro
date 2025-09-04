import React from 'react';
import Icon from '../../../components/AppIcon';

const ComplianceStatusDashboard = ({ framework, statusData }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'compliant': return 'text-success';
      case 'partial': return 'text-warning';
      case 'non-compliant': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'compliant': return 'bg-success/10';
      case 'partial': return 'bg-warning/10';
      case 'non-compliant': return 'bg-error/10';
      default: return 'bg-muted/10';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'compliant': return 'CheckCircle';
      case 'partial': return 'AlertTriangle';
      case 'non-compliant': return 'XCircle';
      default: return 'Clock';
    }
  };

  if (!framework || !statusData) {
    return (
      <div className="bg-card rounded-lg p-6 security-shadow-sm border border-border">
        <div className="text-center py-8">
          <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Select a framework to view compliance status</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg p-6 security-shadow-sm border border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">{framework?.name} Status</h3>
          <p className="text-sm text-muted-foreground">Overall compliance overview</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">{statusData?.overallCompliance}%</div>
          <div className="text-xs text-muted-foreground">Overall Compliance</div>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-card-foreground">Compliance Progress</span>
          <span className="text-muted-foreground">{statusData?.implementedControls} of {statusData?.totalControls} controls</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${statusData?.overallCompliance}%` }}
          />
        </div>
      </div>
      {/* Status Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statusData?.statusBreakdown?.map((status, index) => (
          <div key={index} className={`p-4 rounded-lg ${getStatusBg(status?.type)}`}>
            <div className="flex items-center space-x-2 mb-2">
              <Icon name={getStatusIcon(status?.type)} size={16} className={getStatusColor(status?.type)} />
              <span className="text-sm font-medium text-card-foreground capitalize">{status?.type?.replace('-', ' ')}</span>
            </div>
            <div className="text-2xl font-bold text-card-foreground">{status?.count}</div>
            <div className="text-xs text-muted-foreground">{status?.percentage}% of total</div>
          </div>
        ))}
      </div>
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Calendar" size={16} className="text-accent" />
            <span className="text-sm font-medium text-card-foreground">Next Audit</span>
          </div>
          <div className="text-lg font-semibold text-card-foreground">{statusData?.nextAudit}</div>
        </div>

        <div className="p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="AlertCircle" size={16} className="text-warning" />
            <span className="text-sm font-medium text-card-foreground">Open Findings</span>
          </div>
          <div className="text-lg font-semibold text-card-foreground">{statusData?.openFindings}</div>
        </div>

        <div className="p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Clock" size={16} className="text-error" />
            <span className="text-sm font-medium text-card-foreground">Overdue Items</span>
          </div>
          <div className="text-lg font-semibold text-card-foreground">{statusData?.overdueItems}</div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceStatusDashboard;