import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import SecurityAlertBanner from '../../components/ui/SecurityAlertBanner';
import ThreatDetectionWidget from './components/ThreatDetectionWidget';
import VulnerabilityStatusWidget from './components/VulnerabilityStatusWidget';
import IncidentResponseWidget from './components/IncidentResponseWidget';
import ComplianceScoreWidget from './components/ComplianceScoreWidget';
import NetworkHealthWidget from './components/NetworkHealthWidget';
import SecurityMetricsChart from './components/SecurityMetricsChart';
import QuickActionsPanel from './components/QuickActionsPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const SecurityDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dashboardLayout, setDashboardLayout] = useState('default');
  const [refreshing, setRefreshing] = useState(false);

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Mock critical alerts for the banner
  const criticalAlerts = [
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
    }
  ];

  const dashboardStats = {
    totalThreats: 247,
    activeIncidents: 12,
    vulnerabilities: 156,
    complianceScore: 87,
    networkHealth: 94
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRefreshing(false);
  };

  const formatDateTime = (date) => {
    return date?.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SecurityAlertBanner alerts={criticalAlerts} />
      {/* Main Content */}
      <main className="pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          {/* Dashboard Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">Security Dashboard</h1>
                <p className="text-muted-foreground">
                  {formatDateTime(currentTime)} • Real-time security monitoring and threat analysis
                </p>
              </div>
              
              <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="RefreshCw"
                  iconPosition="left"
                  loading={refreshing}
                  onClick={handleRefresh}
                >
                  Refresh Data
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Download"
                  iconPosition="left"
                >
                  Export Report
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  iconName="Settings"
                  iconPosition="left"
                >
                  Dashboard Settings
                </Button>
              </div>
            </div>
          </div>

          {/* Key Metrics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <div className="bg-card rounded-lg border border-border security-shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Threats</p>
                  <p className="text-2xl font-bold text-error">{dashboardStats?.totalThreats}</p>
                </div>
                <div className="w-12 h-12 bg-error/10 rounded-lg flex items-center justify-center">
                  <Icon name="Shield" size={24} className="text-error" />
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border security-shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Incidents</p>
                  <p className="text-2xl font-bold text-warning">{dashboardStats?.activeIncidents}</p>
                </div>
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Icon name="Siren" size={24} className="text-warning" />
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border security-shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Vulnerabilities</p>
                  <p className="text-2xl font-bold text-accent">{dashboardStats?.vulnerabilities}</p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Icon name="Bug" size={24} className="text-accent" />
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border security-shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Compliance</p>
                  <p className="text-2xl font-bold text-success">{dashboardStats?.complianceScore}%</p>
                </div>
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <Icon name="FileCheck" size={24} className="text-success" />
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border security-shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Network Health</p>
                  <p className="text-2xl font-bold text-primary">{dashboardStats?.networkHealth}%</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Activity" size={24} className="text-primary" />
                </div>
              </div>
            </div>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
            {/* Left Column - Primary Widgets */}
            <div className="xl:col-span-2 space-y-8">
              <ThreatDetectionWidget />
              <IncidentResponseWidget />
              <SecurityMetricsChart />
            </div>

            {/* Right Column - Secondary Widgets */}
            <div className="space-y-8">
              <QuickActionsPanel />
              <VulnerabilityStatusWidget />
              <ComplianceScoreWidget />
            </div>
          </div>

          {/* Bottom Row - Full Width Widgets */}
          <div className="grid grid-cols-1 gap-8">
            <NetworkHealthWidget />
          </div>

          {/* Dashboard Footer */}
          <div className="mt-8 pt-6 border-t border-border">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between text-sm text-muted-foreground">
              <div className="flex items-center space-x-4">
                <span>Last updated: {formatDateTime(currentTime)}</span>
                <span>•</span>
                <span>Auto-refresh: Every 5 minutes</span>
              </div>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <Button variant="ghost" size="sm" iconName="HelpCircle" iconPosition="left">
                  Help & Support
                </Button>
                <Button variant="ghost" size="sm" iconName="MessageSquare" iconPosition="left">
                  Feedback
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SecurityDashboard;