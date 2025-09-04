import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NetworkHealthWidget = () => {
  const networkData = {
    overallHealth: 94,
    uptime: 99.97,
    totalDevices: 1247,
    onlineDevices: 1189,
    offlineDevices: 58,
    criticalAlerts: 3,
    warnings: 12,
    bandwidth: {
      current: 2.4,
      max: 10.0,
      unit: "Gbps"
    }
  };

  const networkSegments = [
    {
      name: "DMZ Network",
      status: "healthy",
      devices: 45,
      uptime: 99.99,
      bandwidth: 1.2,
      alerts: 0
    },
    {
      name: "Internal LAN",
      status: "healthy",
      devices: 892,
      uptime: 99.98,
      bandwidth: 0.8,
      alerts: 2
    },
    {
      name: "Guest Network",
      status: "warning",
      devices: 156,
      uptime: 99.85,
      bandwidth: 0.3,
      alerts: 5
    },
    {
      name: "IoT Network",
      status: "critical",
      devices: 154,
      uptime: 98.45,
      bandwidth: 0.1,
      alerts: 8
    }
  ];

  const recentEvents = [
    {
      id: 1,
      type: "device-offline",
      message: "Firewall FW-03 went offline",
      severity: "critical",
      timestamp: "2025-09-01T05:02:44.633Z",
      location: "DMZ Network"
    },
    {
      id: 2,
      type: "bandwidth-spike",
      message: "Unusual bandwidth spike detected",
      severity: "warning",
      timestamp: "2025-09-01T04:45:44.633Z",
      location: "Internal LAN"
    },
    {
      id: 3,
      type: "device-reconnected",
      message: "Switch SW-12 reconnected successfully",
      severity: "info",
      timestamp: "2025-09-01T04:30:44.633Z",
      location: "Guest Network"
    }
  ];

  const getHealthColor = (health) => {
    if (health >= 95) return 'text-success';
    if (health >= 85) return 'text-warning';
    return 'text-error';
  };

  const getHealthBgColor = (health) => {
    if (health >= 95) return 'bg-success/10 border-success/20';
    if (health >= 85) return 'bg-warning/10 border-warning/20';
    return 'bg-error/10 border-error/20';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'text-success bg-success/10';
      case 'warning': return 'text-warning bg-warning/10';
      case 'critical': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-error bg-error/10';
      case 'warning': return 'text-warning bg-warning/10';
      case 'info': return 'text-accent bg-accent/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getEventIcon = (type) => {
    switch (type) {
      case 'device-offline': return 'WifiOff';
      case 'bandwidth-spike': return 'TrendingUp';
      case 'device-reconnected': return 'Wifi';
      default: return 'Activity';
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

  const getBandwidthPercentage = (current, max) => {
    return Math.round((current / max) * 100);
  };

  return (
    <div className="bg-card rounded-lg border border-border security-shadow-md">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="Activity" size={20} className="text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-card-foreground">Network Health</h3>
              <p className="text-sm text-muted-foreground">Infrastructure monitoring</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" iconName="ExternalLink" iconPosition="right">
            Monitor
          </Button>
        </div>
      </div>
      <div className="p-6">
        {/* Overall Health Score */}
        <div className="text-center mb-6">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full border-4 ${getHealthBgColor(networkData?.overallHealth)}`}>
            <span className={`text-2xl font-bold ${getHealthColor(networkData?.overallHealth)}`}>
              {networkData?.overallHealth}%
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-2">Network Health Score</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-success/5 rounded-lg border border-success/20">
            <p className="text-2xl font-bold text-success">{networkData?.uptime}%</p>
            <p className="text-sm text-muted-foreground">Uptime</p>
          </div>
          
          <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
            <p className="text-2xl font-bold text-primary">{networkData?.onlineDevices}</p>
            <p className="text-sm text-muted-foreground">Online Devices</p>
          </div>
          
          <div className="text-center p-4 bg-error/5 rounded-lg border border-error/20">
            <p className="text-2xl font-bold text-error">{networkData?.offlineDevices}</p>
            <p className="text-sm text-muted-foreground">Offline Devices</p>
          </div>
          
          <div className="text-center p-4 bg-accent/5 rounded-lg border border-accent/20">
            <p className="text-2xl font-bold text-accent">
              {networkData?.bandwidth?.current}/{networkData?.bandwidth?.max}
            </p>
            <p className="text-sm text-muted-foreground">Bandwidth ({networkData?.bandwidth?.unit})</p>
          </div>
        </div>

        {/* Bandwidth Usage */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-card-foreground">Bandwidth Usage</h4>
            <span className="text-sm text-muted-foreground">
              {getBandwidthPercentage(networkData?.bandwidth?.current, networkData?.bandwidth?.max)}% utilized
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-3">
            <div 
              className="bg-accent h-3 rounded-full transition-all duration-300"
              style={{ width: `${getBandwidthPercentage(networkData?.bandwidth?.current, networkData?.bandwidth?.max)}%` }}
            />
          </div>
        </div>

        {/* Network Segments */}
        <div className="mb-6">
          <h4 className="font-semibold text-card-foreground mb-4">Network Segments</h4>
          <div className="space-y-3">
            {networkSegments?.map((segment, index) => (
              <div key={index} className="p-4 bg-muted/20 rounded-lg border border-border/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name="Network" size={14} className="text-primary" />
                    </div>
                    <div>
                      <h5 className="font-medium text-card-foreground">{segment?.name}</h5>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(segment?.status)}`}>
                        {segment?.status}
                      </span>
                    </div>
                  </div>
                  {segment?.alerts > 0 && (
                    <div className="flex items-center space-x-1 text-error">
                      <Icon name="AlertTriangle" size={14} />
                      <span className="text-sm font-medium">{segment?.alerts}</span>
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm ml-11">
                  <div>
                    <p className="text-muted-foreground">Devices</p>
                    <p className="font-medium text-card-foreground">{segment?.devices}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Uptime</p>
                    <p className="font-medium text-card-foreground">{segment?.uptime}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Bandwidth</p>
                    <p className="font-medium text-card-foreground">{segment?.bandwidth} Gbps</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Status</p>
                    <p className={`font-medium ${segment?.status === 'healthy' ? 'text-success' : segment?.status === 'warning' ? 'text-warning' : 'text-error'}`}>
                      {segment?.status}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Events */}
        <div>
          <h4 className="font-semibold text-card-foreground mb-4">Recent Network Events</h4>
          <div className="space-y-3">
            {recentEvents?.map((event) => (
              <div key={event?.id} className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg hover:bg-muted/30 transition-security">
                <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                  <Icon name={getEventIcon(event?.type)} size={14} className="text-accent" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="font-medium text-sm text-card-foreground">{event?.message}</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(event?.severity)}`}>
                      {event?.severity}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>Location: {event?.location}</span>
                    <span>{formatTimestamp(event?.timestamp)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkHealthWidget;