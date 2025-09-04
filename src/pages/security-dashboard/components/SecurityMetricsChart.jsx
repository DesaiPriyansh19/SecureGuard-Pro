import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SecurityMetricsChart = () => {
  const threatTrendData = [
    { month: 'Jan', threats: 45, blocked: 42, resolved: 3 },
    { month: 'Feb', threats: 52, blocked: 48, resolved: 4 },
    { month: 'Mar', threats: 38, blocked: 35, resolved: 3 },
    { month: 'Apr', threats: 67, blocked: 61, resolved: 6 },
    { month: 'May', threats: 71, blocked: 65, resolved: 6 },
    { month: 'Jun', threats: 58, blocked: 53, resolved: 5 },
    { month: 'Jul', threats: 89, blocked: 82, resolved: 7 },
    { month: 'Aug', threats: 94, blocked: 87, resolved: 7 }
  ];

  const vulnerabilityData = [
    { severity: 'Critical', count: 8, color: '#DC2626' },
    { severity: 'High', count: 23, color: '#D97706' },
    { severity: 'Medium', count: 67, color: '#0EA5E9' },
    { severity: 'Low', count: 58, color: '#059669' }
  ];

  const incidentResponseData = [
    { day: 'Mon', incidents: 12, resolved: 10, avgTime: 4.2 },
    { day: 'Tue', incidents: 8, resolved: 8, avgTime: 3.8 },
    { day: 'Wed', incidents: 15, resolved: 13, avgTime: 5.1 },
    { day: 'Thu', incidents: 6, resolved: 6, avgTime: 2.9 },
    { day: 'Fri', incidents: 11, resolved: 9, avgTime: 4.5 },
    { day: 'Sat', incidents: 4, resolved: 4, avgTime: 3.2 },
    { day: 'Sun', incidents: 3, resolved: 3, avgTime: 2.8 }
  ];

  const complianceData = [
    { framework: 'ISO 27001', score: 92 },
    { framework: 'SOC 2', score: 89 },
    { framework: 'GDPR', score: 85 },
    { framework: 'HIPAA', score: 78 },
    { framework: 'PCI DSS', score: 94 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 security-shadow-md">
          <p className="font-medium text-popover-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {entry?.dataKey}: {entry?.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg border border-border security-shadow-md">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="BarChart3" size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-card-foreground">Security Metrics</h3>
              <p className="text-sm text-muted-foreground">Performance analytics and trends</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" iconName="Download" iconPosition="right">
            Export
          </Button>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Threat Trends */}
          <div className="bg-muted/20 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-card-foreground">Threat Detection Trends</h4>
              <div className="flex items-center space-x-4 text-xs">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-error rounded-full"></div>
                  <span className="text-muted-foreground">Threats</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                  <span className="text-muted-foreground">Blocked</span>
                </div>
              </div>
            </div>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={threatTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
                  <YAxis stroke="#64748B" fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="threats" 
                    stroke="#DC2626" 
                    strokeWidth={2}
                    dot={{ fill: '#DC2626', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="blocked" 
                    stroke="#059669" 
                    strokeWidth={2}
                    dot={{ fill: '#059669', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Vulnerability Distribution */}
          <div className="bg-muted/20 rounded-lg p-4">
            <h4 className="font-semibold text-card-foreground mb-4">Vulnerability Distribution</h4>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={vulnerabilityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="count"
                  >
                    {vulnerabilityData?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry?.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {vulnerabilityData?.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item?.color }}
                  ></div>
                  <span className="text-xs text-muted-foreground">
                    {item?.severity}: {item?.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Incident Response Times */}
          <div className="bg-muted/20 rounded-lg p-4">
            <h4 className="font-semibold text-card-foreground mb-4">Weekly Incident Response</h4>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={incidentResponseData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="day" stroke="#64748B" fontSize={12} />
                  <YAxis stroke="#64748B" fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="incidents" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="resolved" fill="#059669" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center space-x-6 mt-4 text-xs">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-accent rounded-full"></div>
                <span className="text-muted-foreground">Incidents</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span className="text-muted-foreground">Resolved</span>
              </div>
            </div>
          </div>

          {/* Compliance Scores */}
          <div className="bg-muted/20 rounded-lg p-4">
            <h4 className="font-semibold text-card-foreground mb-4">Compliance Framework Scores</h4>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={complianceData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis type="number" domain={[0, 100]} stroke="#64748B" fontSize={12} />
                  <YAxis dataKey="framework" type="category" stroke="#64748B" fontSize={12} width={80} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="score" fill="#1E3A8A" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <div className="flex items-start space-x-3">
            <Icon name="TrendingUp" size={20} className="text-primary mt-0.5" />
            <div>
              <h4 className="font-semibold text-primary mb-2">Key Security Insights</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Threat Detection</p>
                  <p className="font-medium text-card-foreground">18% increase from last month</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Response Time</p>
                  <p className="font-medium text-card-foreground">Average 3.9 hours (↓12%)</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Compliance</p>
                  <p className="font-medium text-card-foreground">87% overall score (↑3%)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityMetricsChart;