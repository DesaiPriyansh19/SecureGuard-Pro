import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ThreatDetectionWidget = () => {
  const threatData = {
    total: 247,
    critical: 12,
    high: 35,
    medium: 89,
    low: 111,
    blocked: 198,
    investigating: 32,
    resolved: 17
  };

  const recentThreats = [
    {
      id: 1,
      type: "Malware",
      severity: "critical",
      source: "192.168.1.100",
      target: "Web Server 01",
      timestamp: "2025-09-01T05:05:44.633Z",
      status: "blocked"
    },
    {
      id: 2,
      type: "Phishing",
      severity: "high",
      source: "External Email",
      target: "Finance Dept",
      timestamp: "2025-09-01T05:03:44.633Z",
      status: "investigating"
    },
    {
      id: 3,
      type: "DDoS",
      severity: "medium",
      source: "Multiple IPs",
      target: "Load Balancer",
      timestamp: "2025-09-01T05:01:44.633Z",
      status: "mitigated"
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-error bg-error/10';
      case 'high': return 'text-warning bg-warning/10';
      case 'medium': return 'text-accent bg-accent/10';
      case 'low': return 'text-success bg-success/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'blocked': return 'text-error bg-error/10';
      case 'investigating': return 'text-warning bg-warning/10';
      case 'mitigated': return 'text-success bg-success/10';
      case 'resolved': return 'text-success bg-success/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    return `${Math.floor(diffMins / 60)}h ago`;
  };

  return (
    <div className="bg-card rounded-lg border border-border security-shadow-md">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
              <Icon name="Shield" size={20} className="text-error" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-card-foreground">Threat Detection</h3>
              <p className="text-sm text-muted-foreground">Real-time threat monitoring</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" iconName="ExternalLink" iconPosition="right">
            View All
          </Button>
        </div>
      </div>
      <div className="p-6">
        {/* Threat Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-error/5 rounded-lg p-4 border border-error/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-error">{threatData?.critical}</p>
                <p className="text-sm text-error/80">Critical</p>
              </div>
              <Icon name="AlertCircle" size={20} className="text-error" />
            </div>
          </div>
          
          <div className="bg-warning/5 rounded-lg p-4 border border-warning/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-warning">{threatData?.high}</p>
                <p className="text-sm text-warning/80">High</p>
              </div>
              <Icon name="AlertTriangle" size={20} className="text-warning" />
            </div>
          </div>
          
          <div className="bg-accent/5 rounded-lg p-4 border border-accent/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-accent">{threatData?.medium}</p>
                <p className="text-sm text-accent/80">Medium</p>
              </div>
              <Icon name="Info" size={20} className="text-accent" />
            </div>
          </div>
          
          <div className="bg-success/5 rounded-lg p-4 border border-success/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-success">{threatData?.low}</p>
                <p className="text-sm text-success/80">Low</p>
              </div>
              <Icon name="CheckCircle" size={20} className="text-success" />
            </div>
          </div>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <p className="text-2xl font-bold text-success">{threatData?.blocked}</p>
            <p className="text-sm text-muted-foreground">Blocked</p>
          </div>
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <p className="text-2xl font-bold text-warning">{threatData?.investigating}</p>
            <p className="text-sm text-muted-foreground">Investigating</p>
          </div>
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <p className="text-2xl font-bold text-success">{threatData?.resolved}</p>
            <p className="text-sm text-muted-foreground">Resolved</p>
          </div>
        </div>

        {/* Recent Threats */}
        <div>
          <h4 className="font-semibold text-card-foreground mb-4">Recent Threats</h4>
          <div className="space-y-3">
            {recentThreats?.map((threat) => (
              <div key={threat?.id} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg hover:bg-muted/30 transition-security">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-error/10 rounded-full flex items-center justify-center">
                    <Icon name="Shield" size={14} className="text-error" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-sm text-card-foreground">{threat?.type}</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(threat?.severity)}`}>
                        {threat?.severity}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {threat?.source} → {threat?.target}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(threat?.status)}`}>
                    {threat?.status}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatTimestamp(threat?.timestamp)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreatDetectionWidget;