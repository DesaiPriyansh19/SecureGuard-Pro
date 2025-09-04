import React from 'react';
import Icon from '../../../components/AppIcon';

const IncidentTimeline = ({ timeline }) => {
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return {
      time: date?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: date?.toLocaleDateString()
    };
  };

  const getEventIcon = (type) => {
    switch (type) {
      case 'created': return 'Plus';
      case 'assigned': return 'User';
      case 'status_change': return 'ArrowRight';
      case 'escalated': return 'ArrowUp';
      case 'comment': return 'MessageSquare';
      case 'evidence': return 'Paperclip';
      case 'resolved': return 'CheckCircle';
      case 'closed': return 'X';
      default: return 'Circle';
    }
  };

  const getEventColor = (type) => {
    switch (type) {
      case 'created': return 'text-accent';
      case 'assigned': return 'text-primary';
      case 'status_change': return 'text-warning';
      case 'escalated': return 'text-error';
      case 'comment': return 'text-muted-foreground';
      case 'evidence': return 'text-accent';
      case 'resolved': return 'text-success';
      case 'closed': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Clock" size={20} className="text-muted-foreground" />
        <h3 className="font-semibold text-card-foreground">Recent Activity</h3>
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {timeline?.map((event, index) => {
          const timestamp = formatTimestamp(event?.timestamp);
          const isLast = index === timeline?.length - 1;
          
          return (
            <div key={index} className="flex items-start space-x-3">
              <div className="relative">
                <div className={`w-8 h-8 rounded-full border-2 border-card bg-card flex items-center justify-center ${getEventColor(event?.type)}`}>
                  <Icon name={getEventIcon(event?.type)} size={14} />
                </div>
                {!isLast && (
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-6 bg-border" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-card-foreground">
                    {event?.title}
                  </p>
                  <div className="text-xs text-muted-foreground text-right">
                    <div>{timestamp?.time}</div>
                    <div>{timestamp?.date}</div>
                  </div>
                </div>
                
                {event?.description && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {event?.description}
                  </p>
                )}
                
                {event?.user && (
                  <div className="flex items-center space-x-2 mt-2">
                    <Icon name="User" size={12} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {event?.user}
                    </span>
                  </div>
                )}
                
                {event?.metadata && (
                  <div className="mt-2 p-2 bg-muted rounded text-xs text-muted-foreground">
                    {Object.entries(event?.metadata)?.map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="capitalize">{key?.replace('_', ' ')}:</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IncidentTimeline;