import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsPanel = () => {
  const quickActions = [
    {
      id: 1,
      title: "Create Security Incident",
      description: "Report and track new security incidents",
      icon: "Plus",
      color: "error",
      path: "/incident-response",
      urgent: true
    },
    {
      id: 2,
      title: "Block IP Address",
      description: "Immediately block suspicious IP addresses",
      icon: "Shield",
      color: "warning",
      action: "block-ip",
      urgent: true
    },
    {
      id: 3,
      title: "Generate Security Report",
      description: "Create comprehensive security reports",
      icon: "FileText",
      color: "primary",
      action: "generate-report",
      urgent: false
    },
    {
      id: 4,
      title: "Run Vulnerability Scan",
      description: "Execute immediate vulnerability assessment",
      icon: "Search",
      color: "accent",
      path: "/vulnerability-management",
      urgent: false
    },
    {
      id: 5,
      title: "Update Security Policies",
      description: "Modify and deploy security policies",
      icon: "Settings",
      color: "secondary",
      action: "update-policies",
      urgent: false
    },
    {
      id: 6,
      title: "Emergency Lockdown",
      description: "Initiate emergency security lockdown",
      icon: "Lock",
      color: "error",
      action: "emergency-lockdown",
      urgent: true
    }
  ];

  const recentActions = [
    {
      id: 1,
      action: "Blocked IP 192.168.1.100",
      user: "John Smith",
      timestamp: "2025-09-01T05:05:44.633Z",
      status: "completed"
    },
    {
      id: 2,
      action: "Generated Monthly Security Report",
      user: "Sarah Johnson",
      timestamp: "2025-09-01T04:30:44.633Z",
      status: "completed"
    },
    {
      id: 3,
      action: "Updated Firewall Rules",
      user: "Mike Chen",
      timestamp: "2025-09-01T04:15:44.633Z",
      status: "completed"
    },
    {
      id: 4,
      action: "Initiated Vulnerability Scan",
      user: "Alex Rodriguez",
      timestamp: "2025-09-01T03:45:44.633Z",
      status: "in-progress"
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'error':
        return {
          bg: 'bg-error/10 hover:bg-error/20',
          border: 'border-error/20',
          icon: 'text-error',
          text: 'text-error'
        };
      case 'warning':
        return {
          bg: 'bg-warning/10 hover:bg-warning/20',
          border: 'border-warning/20',
          icon: 'text-warning',
          text: 'text-warning'
        };
      case 'primary':
        return {
          bg: 'bg-primary/10 hover:bg-primary/20',
          border: 'border-primary/20',
          icon: 'text-primary',
          text: 'text-primary'
        };
      case 'accent':
        return {
          bg: 'bg-accent/10 hover:bg-accent/20',
          border: 'border-accent/20',
          icon: 'text-accent',
          text: 'text-accent'
        };
      case 'secondary':
        return {
          bg: 'bg-secondary/10 hover:bg-secondary/20',
          border: 'border-secondary/20',
          icon: 'text-secondary',
          text: 'text-secondary'
        };
      default:
        return {
          bg: 'bg-muted/10 hover:bg-muted/20',
          border: 'border-border',
          icon: 'text-muted-foreground',
          text: 'text-muted-foreground'
        };
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success bg-success/10';
      case 'in-progress': return 'text-warning bg-warning/10';
      case 'failed': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const handleAction = (action) => {
    if (action?.path) {
      window.location.href = action?.path;
    } else if (action?.action) {
      console.log(`Executing action: ${action?.action}`);
      // Handle specific actions
      switch (action?.action) {
        case 'block-ip':
          // Open IP blocking modal/form
          break;
        case 'generate-report':
          // Open report generation modal
          break;
        case 'update-policies':
          // Navigate to policy management
          break;
        case 'emergency-lockdown':
          // Confirm and execute emergency lockdown
          break;
        default:
          break;
      }
    }
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
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-card-foreground">Quick Actions</h3>
              <p className="text-sm text-muted-foreground">Emergency and routine security actions</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6">
        {/* Quick Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {quickActions?.map((action) => {
            const colorClasses = getColorClasses(action?.color);
            return (
              <button
                key={action?.id}
                onClick={() => handleAction(action)}
                className={`p-4 rounded-lg border transition-security text-left ${colorClasses?.bg} ${colorClasses?.border} hover:scale-105`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses?.bg}`}>
                    <Icon name={action?.icon} size={20} className={colorClasses?.icon} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-card-foreground">{action?.title}</h4>
                      {action?.urgent && (
                        <span className="px-2 py-1 bg-error/20 text-error text-xs rounded-full font-medium">
                          Urgent
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{action?.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Emergency Actions */}
        <div className="mb-6 p-4 bg-error/5 rounded-lg border border-error/20">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="AlertTriangle" size={16} className="text-error" />
            <h4 className="font-semibold text-error">Emergency Actions</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button 
              variant="destructive" 
              size="sm" 
              iconName="Lock" 
              iconPosition="left"
              onClick={() => handleAction({ action: 'emergency-lockdown' })}
            >
              Emergency Lockdown
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              iconName="Shield" 
              iconPosition="left"
              onClick={() => handleAction({ action: 'block-ip' })}
              className="border-error text-error hover:bg-error/10"
            >
              Block Threat Source
            </Button>
          </div>
        </div>

        {/* Recent Actions */}
        <div>
          <h4 className="font-semibold text-card-foreground mb-4">Recent Actions</h4>
          <div className="space-y-3">
            {recentActions?.map((action) => (
              <div key={action?.id} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="Activity" size={14} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-card-foreground">{action?.action}</p>
                    <p className="text-xs text-muted-foreground">
                      by {action?.user} • {formatTimestamp(action?.timestamp)}
                    </p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(action?.status)}`}>
                  {action?.status?.replace('-', ' ')}
                </span>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <Button variant="ghost" size="sm">
              View All Actions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsPanel;