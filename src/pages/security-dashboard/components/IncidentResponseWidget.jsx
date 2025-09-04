import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const IncidentResponseWidget = () => {
  const incidentData = {
    total: 34,
    open: 12,
    inProgress: 15,
    resolved: 7,
    critical: 3,
    high: 8,
    medium: 14,
    low: 9
  };

  const activeIncidents = [
    {
      id: "INC-2024-001",
      title: "Data Breach Attempt - Customer Database",
      severity: "critical",
      status: "in-progress",
      assignee: "Sarah Johnson",
      created: "2025-09-01T04:45:44.633Z",
      sla: "2h remaining",
      category: "data-breach"
    },
    {
      id: "INC-2024-002",
      title: "Ransomware Detection - File Server",
      severity: "critical",
      status: "open",
      assignee: "Mike Chen",
      created: "2025-09-01T04:30:44.633Z",
      sla: "1h 30m remaining",
      category: "malware"
    },
    {
      id: "INC-2024-003",
      title: "Unauthorized Access - Admin Panel",
      severity: "high",
      status: "in-progress",
      assignee: "Alex Rodriguez",
      created: "2025-09-01T03:15:44.633Z",
      sla: "4h remaining",
      category: "unauthorized-access"
    },
    {
      id: "INC-2024-004",
      title: "Phishing Campaign - Email Security",
      severity: "medium",
      status: "open",
      assignee: "Lisa Wang",
      created: "2025-09-01T02:45:44.633Z",
      sla: "8h remaining",
      category: "phishing"
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-error bg-error/10 border-error/20';
      case 'high': return 'text-warning bg-warning/10 border-warning/20';
      case 'medium': return 'text-accent bg-accent/10 border-accent/20';
      case 'low': return 'text-success bg-success/10 border-success/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'text-error bg-error/10';
      case 'in-progress': return 'text-warning bg-warning/10';
      case 'resolved': return 'text-success bg-success/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'data-breach': return 'Database';
      case 'malware': return 'Bug';
      case 'unauthorized-access': return 'Lock';
      case 'phishing': return 'Mail';
      default: return 'AlertTriangle';
    }
  };

  const getSLAColor = (sla) => {
    if (sla?.includes('1h') || sla?.includes('30m')) return 'text-error';
    if (sla?.includes('2h') || sla?.includes('3h')) return 'text-warning';
    return 'text-success';
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) return `${diffMins}m ago`;
    return `${Math.floor(diffMins / 60)}h ago`;
  };

  return (
    <div className="bg-card rounded-lg border border-border security-shadow-md">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="Siren" size={20} className="text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-card-foreground">Incident Response</h3>
              <p className="text-sm text-muted-foreground">Active security incidents</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" iconName="ExternalLink" iconPosition="right">
            View Queue
          </Button>
        </div>
      </div>
      <div className="p-6">
        {/* Incident Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-error/5 rounded-lg p-4 border border-error/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-error">{incidentData?.critical}</p>
                <p className="text-sm text-error/80">Critical</p>
              </div>
              <Icon name="AlertCircle" size={20} className="text-error" />
            </div>
          </div>
          
          <div className="bg-warning/5 rounded-lg p-4 border border-warning/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-warning">{incidentData?.high}</p>
                <p className="text-sm text-warning/80">High</p>
              </div>
              <Icon name="AlertTriangle" size={20} className="text-warning" />
            </div>
          </div>
          
          <div className="bg-accent/5 rounded-lg p-4 border border-accent/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-accent">{incidentData?.medium}</p>
                <p className="text-sm text-accent/80">Medium</p>
              </div>
              <Icon name="Info" size={20} className="text-accent" />
            </div>
          </div>
          
          <div className="bg-success/5 rounded-lg p-4 border border-success/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-success">{incidentData?.low}</p>
                <p className="text-sm text-success/80">Low</p>
              </div>
              <Icon name="CheckCircle" size={20} className="text-success" />
            </div>
          </div>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-error/5 rounded-lg border border-error/20">
            <p className="text-2xl font-bold text-error">{incidentData?.open}</p>
            <p className="text-sm text-muted-foreground">Open</p>
          </div>
          <div className="text-center p-4 bg-warning/5 rounded-lg border border-warning/20">
            <p className="text-2xl font-bold text-warning">{incidentData?.inProgress}</p>
            <p className="text-sm text-muted-foreground">In Progress</p>
          </div>
          <div className="text-center p-4 bg-success/5 rounded-lg border border-success/20">
            <p className="text-2xl font-bold text-success">{incidentData?.resolved}</p>
            <p className="text-sm text-muted-foreground">Resolved</p>
          </div>
        </div>

        {/* Active Incidents */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-card-foreground">Active Incidents</h4>
            <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
              Create Incident
            </Button>
          </div>
          <div className="space-y-3">
            {activeIncidents?.map((incident) => (
              <div key={incident?.id} className="p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-security border border-border/50">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                      <Icon name={getCategoryIcon(incident?.category)} size={14} className="text-accent" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="font-medium text-sm text-card-foreground">{incident?.id}</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(incident?.severity)}`}>
                          {incident?.severity}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(incident?.status)}`}>
                          {incident?.status?.replace('-', ' ')}
                        </span>
                      </div>
                      <p className="text-sm text-card-foreground mb-2">{incident?.title}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>Assignee: {incident?.assignee}</span>
                        <span>Created: {formatTimestamp(incident?.created)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs font-medium ${getSLAColor(incident?.sla)}`}>
                      SLA: {incident?.sla}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-end space-x-2 ml-11">
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    Update Status
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentResponseWidget;