import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const IncidentCard = ({ incident, onSelect, isSelected, onStatusUpdate, onEscalate }) => {
  const getSeverityConfig = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical':
        return {
          bgColor: 'bg-error/10',
          borderColor: 'border-error',
          textColor: 'text-error',
          icon: 'AlertCircle'
        };
      case 'high':
        return {
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning',
          textColor: 'text-warning',
          icon: 'AlertTriangle'
        };
      case 'medium':
        return {
          bgColor: 'bg-accent/10',
          borderColor: 'border-accent',
          textColor: 'text-accent',
          icon: 'Info'
        };
      case 'low':
        return {
          bgColor: 'bg-success/10',
          borderColor: 'border-success',
          textColor: 'text-success',
          icon: 'CheckCircle'
        };
      default:
        return {
          bgColor: 'bg-muted',
          borderColor: 'border-border',
          textColor: 'text-muted-foreground',
          icon: 'Circle'
        };
    }
  };

  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case 'new':
        return { color: 'text-accent', bg: 'bg-accent/10' };
      case 'investigating':
        return { color: 'text-warning', bg: 'bg-warning/10' };
      case 'containment':
        return { color: 'text-error', bg: 'bg-error/10' };
      case 'eradication':
        return { color: 'text-primary', bg: 'bg-primary/10' };
      case 'recovery':
        return { color: 'text-success', bg: 'bg-success/10' };
      case 'closed':
        return { color: 'text-muted-foreground', bg: 'bg-muted' };
      default:
        return { color: 'text-muted-foreground', bg: 'bg-muted' };
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    return date?.toLocaleDateString();
  };

  const severityConfig = getSeverityConfig(incident?.severity);
  const statusConfig = getStatusConfig(incident?.status);

  return (
    <div 
      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:security-shadow-md ${
        isSelected 
          ? `${severityConfig?.borderColor} ${severityConfig?.bgColor}` 
          : 'border-border bg-card hover:border-accent/50'
      }`}
      onClick={() => onSelect(incident)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${severityConfig?.bgColor}`}>
            <Icon 
              name={severityConfig?.icon} 
              size={16} 
              className={severityConfig?.textColor}
            />
          </div>
          <div>
            <h3 className="font-semibold text-card-foreground">{incident?.id}</h3>
            <p className="text-sm text-muted-foreground">{incident?.type}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig?.bg} ${statusConfig?.color}`}>
            {incident?.status}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${severityConfig?.bgColor} ${severityConfig?.textColor}`}>
            {incident?.severity}
          </span>
        </div>
      </div>
      <div className="mb-3">
        <p className="text-sm text-card-foreground font-medium mb-1">{incident?.title}</p>
        <p className="text-sm text-muted-foreground line-clamp-2">{incident?.description}</p>
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
        <div className="flex items-center space-x-4">
          <span>Assigned: {incident?.assignedTo}</span>
          <span>Systems: {incident?.affectedSystems?.length}</span>
        </div>
        <span>{formatTimestamp(incident?.createdAt)}</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex -space-x-1">
            {incident?.timeline?.slice(0, 4)?.map((phase, index) => (
              <div
                key={index}
                className={`w-6 h-6 rounded-full border-2 border-card flex items-center justify-center ${
                  phase?.completed 
                    ? 'bg-success text-success-foreground' 
                    : phase?.active 
                      ? 'bg-accent text-accent-foreground' 
                      : 'bg-muted text-muted-foreground'
                }`}
              >
                <Icon 
                  name={phase?.completed ? 'Check' : phase?.active ? 'Clock' : 'Circle'} 
                  size={10} 
                />
              </div>
            ))}
          </div>
          <span className="text-xs text-muted-foreground ml-2">
            Phase {incident?.timeline?.findIndex(p => p?.active) + 1}/5
          </span>
        </div>

        <div className="flex items-center space-x-1">
          {incident?.severity === 'Critical' && (
            <Button
              variant="ghost"
              size="sm"
              iconName="ArrowUp"
              iconSize={14}
              onClick={(e) => {
                e?.stopPropagation();
                onEscalate(incident);
              }}
              className="text-error hover:text-error"
            >
              Escalate
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            iconName="Edit"
            iconSize={14}
            onClick={(e) => {
              e?.stopPropagation();
              onStatusUpdate(incident);
            }}
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IncidentCard;