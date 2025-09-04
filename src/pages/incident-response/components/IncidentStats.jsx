import React from 'react';
import Icon from '../../../components/AppIcon';

const IncidentStats = ({ stats }) => {
  const statCards = [
    {
      title: 'Active Incidents',
      value: stats?.active,
      change: stats?.activeChange,
      icon: 'AlertCircle',
      color: 'text-error',
      bgColor: 'bg-error/10'
    },
    {
      title: 'Under Investigation',
      value: stats?.investigating,
      change: stats?.investigatingChange,
      icon: 'Search',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      title: 'Resolved Today',
      value: stats?.resolvedToday,
      change: stats?.resolvedChange,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Avg Response Time',
      value: stats?.avgResponseTime,
      change: stats?.responseTimeChange,
      icon: 'Clock',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      suffix: 'min'
    },
    {
      title: 'Critical Incidents',
      value: stats?.critical,
      change: stats?.criticalChange,
      icon: 'AlertTriangle',
      color: 'text-error',
      bgColor: 'bg-error/10'
    },
    {
      title: 'Team Utilization',
      value: stats?.teamUtilization,
      change: stats?.utilizationChange,
      icon: 'Users',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      suffix: '%'
    }
  ];

  const getChangeIcon = (change) => {
    if (change > 0) return 'TrendingUp';
    if (change < 0) return 'TrendingDown';
    return 'Minus';
  };

  const getChangeColor = (change, isPositiveGood = true) => {
    if (change === 0) return 'text-muted-foreground';
    if (isPositiveGood) {
      return change > 0 ? 'text-success' : 'text-error';
    } else {
      return change > 0 ? 'text-error' : 'text-success';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      {statCards?.map((stat, index) => {
        const isPositiveGood = stat?.title?.includes('Resolved') || stat?.title?.includes('Utilization');
        const changeColor = getChangeColor(stat?.change, isPositiveGood);
        
        return (
          <div key={index} className="bg-card border border-border rounded-lg p-4 hover:security-shadow-md transition-all duration-200">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg ${stat?.bgColor}`}>
                <Icon name={stat?.icon} size={20} className={stat?.color} />
              </div>
              {stat?.change !== 0 && (
                <div className={`flex items-center space-x-1 ${changeColor}`}>
                  <Icon name={getChangeIcon(stat?.change)} size={14} />
                  <span className="text-xs font-medium">
                    {Math.abs(stat?.change)}%
                  </span>
                </div>
              )}
            </div>
            <div>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-bold text-card-foreground">
                  {stat?.value}
                </span>
                {stat?.suffix && (
                  <span className="text-sm text-muted-foreground">
                    {stat?.suffix}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {stat?.title}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default IncidentStats;