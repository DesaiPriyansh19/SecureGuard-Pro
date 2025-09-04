import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const SecurityAlertBanner = ({ alerts = [] }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [dismissedAlerts, setDismissedAlerts] = useState(new Set());

  // Default critical alerts for demonstration
  const defaultAlerts = [
    {
      id: 1,
      severity: 'critical',
      title: 'Active Threat Detected',
      message: 'Suspicious network activity detected on server cluster 3. Immediate attention required.',
      timestamp: '2025-09-01T05:05:44.633Z',
      source: 'Network Monitor',
      actionRequired: true,
      actions: [
        { label: 'View Details', path: '/threat-monitoring', primary: true },
        { label: 'Block Source', action: 'block' }
      ]
    },
    {
      id: 2,
      severity: 'high',
      title: 'Multiple Failed Login Attempts',
      message: 'Brute force attack detected from IP 192.168.1.100. Account lockout initiated.',
      timestamp: '2025-09-01T05:03:44.633Z',
      source: 'Authentication System',
      actionRequired: false,
      actions: [
        { label: 'View Incident', path: '/incident-response' }
      ]
    }
  ];

  const activeAlerts = (alerts?.length > 0 ? alerts : defaultAlerts)?.filter(
    alert => !dismissedAlerts?.has(alert?.id)
  );

  const criticalAlerts = activeAlerts?.filter(alert => alert?.severity === 'critical');
  const highAlerts = activeAlerts?.filter(alert => alert?.severity === 'high');

  const dismissAlert = (alertId) => {
    setDismissedAlerts(prev => new Set([...prev, alertId]));
  };

  const getSeverityConfig = (severity) => {
    switch (severity) {
      case 'critical':
        return {
          bgColor: 'bg-error',
          textColor: 'text-error-foreground',
          icon: 'AlertCircle',
          borderColor: 'border-error'
        };
      case 'high':
        return {
          bgColor: 'bg-warning',
          textColor: 'text-warning-foreground',
          icon: 'AlertTriangle',
          borderColor: 'border-warning'
        };
      case 'medium':
        return {
          bgColor: 'bg-accent',
          textColor: 'text-accent-foreground',
          icon: 'Info',
          borderColor: 'border-accent'
        };
      default:
        return {
          bgColor: 'bg-muted',
          textColor: 'text-muted-foreground',
          icon: 'Bell',
          borderColor: 'border-muted'
        };
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)} hours ago`;
    return date?.toLocaleDateString();
  };

  const handleAction = (action, alert) => {
    if (action?.path) {
      window.location.href = action?.path;
    } else if (action?.action) {
      console.log(`Executing action: ${action?.action} for alert ${alert?.id}`);
    }
  };

  if (activeAlerts?.length === 0) return null;

  const primaryAlert = criticalAlerts?.[0] || highAlerts?.[0] || activeAlerts?.[0];
  const config = getSeverityConfig(primaryAlert?.severity);

  return (
    <div className={`fixed top-16 left-0 right-0 ${config?.bgColor} ${config?.textColor} z-alert transition-all duration-300 ${isExpanded ? 'pb-4' : ''}`}>
      {/* Main Alert Bar */}
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <Icon name={config?.icon} size={20} className="flex-shrink-0" />
            <span className="font-semibold text-sm">
              {criticalAlerts?.length > 0 && `${criticalAlerts?.length} Critical Alert${criticalAlerts?.length > 1 ? 's' : ''}`}
              {criticalAlerts?.length === 0 && highAlerts?.length > 0 && `${highAlerts?.length} High Priority Alert${highAlerts?.length > 1 ? 's' : ''}`}
            </span>
          </div>
          
          <div className="hidden md:block flex-1 min-w-0">
            <p className="text-sm truncate">{primaryAlert?.title}: {primaryAlert?.message}</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-xs opacity-90 hidden sm:block">
              {formatTimestamp(primaryAlert?.timestamp)}
            </span>
            {activeAlerts?.length > 1 && (
              <span className="text-xs bg-black/20 px-2 py-1 rounded-full">
                +{activeAlerts?.length - 1} more
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2 ml-4">
          {primaryAlert?.actions && primaryAlert?.actions?.length > 0 && (
            <div className="hidden md:flex items-center space-x-2">
              {primaryAlert?.actions?.slice(0, 2)?.map((action, index) => (
                <Button
                  key={index}
                  variant={action?.primary ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => handleAction(action, primaryAlert)}
                  className={action?.primary ? "bg-white/20 hover:bg-white/30 text-white border-white/30" : "text-white/90 hover:text-white hover:bg-white/10"}
                >
                  {action?.label}
                </Button>
              ))}
            </div>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-white/90 hover:text-white hover:bg-white/10"
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconSize={16}
          >
            {isExpanded ? 'Collapse' : 'Details'}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => dismissAlert(primaryAlert?.id)}
            className="text-white/90 hover:text-white hover:bg-white/10"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>
      </div>
      {/* Expanded Alert Details */}
      {isExpanded && (
        <div className="px-6 pb-2 border-t border-white/20">
          <div className="mt-4 space-y-3">
            {activeAlerts?.slice(0, 3)?.map((alert) => {
              const alertConfig = getSeverityConfig(alert?.severity);
              return (
                <div key={alert?.id} className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <Icon name={alertConfig?.icon} size={16} className="mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-sm">{alert?.title}</h4>
                          <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full uppercase tracking-wide">
                            {alert?.severity}
                          </span>
                        </div>
                        <p className="text-sm opacity-90 mb-2">{alert?.message}</p>
                        <div className="flex items-center space-x-4 text-xs opacity-75">
                          <span>Source: {alert?.source}</span>
                          <span>{formatTimestamp(alert?.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      {alert?.actions && alert?.actions?.map((action, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          size="sm"
                          onClick={() => handleAction(action, alert)}
                          className="text-white/90 hover:text-white hover:bg-white/10 text-xs"
                        >
                          {action?.label}
                        </Button>
                      ))}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => dismissAlert(alert?.id)}
                        className="text-white/70 hover:text-white hover:bg-white/10"
                      >
                        <Icon name="X" size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {activeAlerts?.length > 3 && (
              <div className="text-center pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white/90 hover:text-white hover:bg-white/10"
                  onClick={() => window.location.href = '/threat-monitoring'}
                >
                  View All {activeAlerts?.length} Alerts
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurityAlertBanner;