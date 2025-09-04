import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ComplianceCalendar = ({ events, onEventClick, onScheduleAssessment }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month'); // month, week, list

  const getEventTypeConfig = (type) => {
    switch (type) {
      case 'audit':
        return { color: 'text-error', bg: 'bg-error/10', icon: 'FileCheck' };
      case 'assessment':
        return { color: 'text-warning', bg: 'bg-warning/10', icon: 'Search' };
      case 'review':
        return { color: 'text-accent', bg: 'bg-accent/10', icon: 'Eye' };
      case 'deadline':
        return { color: 'text-error', bg: 'bg-error/10', icon: 'Clock' };
      case 'training':
        return { color: 'text-success', bg: 'bg-success/10', icon: 'GraduationCap' };
      default:
        return { color: 'text-muted-foreground', bg: 'bg-muted/10', icon: 'Calendar' };
    }
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (date) => {
    return new Date(date)?.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const isToday = (date) => {
    const today = new Date();
    const eventDate = new Date(date);
    return eventDate?.toDateString() === today?.toDateString();
  };

  const isUpcoming = (date) => {
    const today = new Date();
    const eventDate = new Date(date);
    const diffTime = eventDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 7;
  };

  const sortedEvents = [...events]?.sort((a, b) => new Date(a.date) - new Date(b.date));
  const upcomingEvents = sortedEvents?.filter(event => isUpcoming(event?.date));

  return (
    <div className="bg-card rounded-lg security-shadow-sm border border-border">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Compliance Calendar</h3>
            <p className="text-sm text-muted-foreground">Upcoming assessments and deadlines</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center bg-muted rounded-lg p-1">
              <Button
                variant={viewMode === 'month' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('month')}
              >
                Month
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                List
              </Button>
            </div>
            <Button
              variant="default"
              size="sm"
              iconName="Plus"
              iconPosition="left"
              onClick={onScheduleAssessment}
            >
              Schedule
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={16} className="text-accent" />
              <span className="text-sm font-medium text-card-foreground">This Week</span>
            </div>
            <div className="text-lg font-semibold text-card-foreground mt-1">
              {upcomingEvents?.length}
            </div>
          </div>
          <div className="p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="FileCheck" size={16} className="text-error" />
              <span className="text-sm font-medium text-card-foreground">Audits</span>
            </div>
            <div className="text-lg font-semibold text-card-foreground mt-1">
              {events?.filter(e => e?.type === 'audit')?.length}
            </div>
          </div>
          <div className="p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-warning" />
              <span className="text-sm font-medium text-card-foreground">Deadlines</span>
            </div>
            <div className="text-lg font-semibold text-card-foreground mt-1">
              {events?.filter(e => e?.type === 'deadline')?.length}
            </div>
          </div>
          <div className="p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="Search" size={16} className="text-success" />
              <span className="text-sm font-medium text-card-foreground">Reviews</span>
            </div>
            <div className="text-lg font-semibold text-card-foreground mt-1">
              {events?.filter(e => e?.type === 'review')?.length}
            </div>
          </div>
        </div>
      </div>
      {/* Calendar Content */}
      <div className="p-6">
        {viewMode === 'list' && (
          <div className="space-y-4">
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-card-foreground mb-3">Upcoming Events</h4>
            </div>
            
            {sortedEvents?.slice(0, 10)?.map((event) => {
              const config = getEventTypeConfig(event?.type);
              return (
                <div
                  key={event?.id}
                  className={`p-4 rounded-lg border transition-security cursor-pointer hover:security-shadow-sm ${
                    isToday(event?.date) ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => onEventClick(event)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className={`p-2 rounded-lg ${config?.bg}`}>
                        <Icon name={config?.icon} size={16} className={config?.color} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h5 className="font-medium text-card-foreground">{event?.title}</h5>
                          {isToday(event?.date) && (
                            <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
                              Today
                            </span>
                          )}
                          {event?.priority === 'high' && (
                            <span className="px-2 py-0.5 bg-error/10 text-error text-xs rounded-full">
                              High Priority
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{event?.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Icon name="Calendar" size={12} />
                            <span>{formatDate(event?.date)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Icon name="Clock" size={12} />
                            <span>{formatTime(event?.date)}</span>
                          </div>
                          {event?.assignee && (
                            <div className="flex items-center space-x-1">
                              <Icon name="User" size={12} />
                              <span>{event?.assignee}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {event?.status && (
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          event?.status === 'completed' ? 'bg-success/10 text-success' :
                          event?.status === 'in-progress'? 'bg-warning/10 text-warning' : 'bg-muted/50 text-muted-foreground'
                        }`}>
                          {event?.status?.replace('-', ' ')}
                        </span>
                      )}
                      <Button variant="ghost" size="icon" iconName="MoreVertical" />
                    </div>
                  </div>
                </div>
              );
            })}

            {sortedEvents?.length === 0 && (
              <div className="text-center py-8">
                <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No upcoming compliance events</p>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Plus"
                  iconPosition="left"
                  onClick={onScheduleAssessment}
                  className="mt-4"
                >
                  Schedule Assessment
                </Button>
              </div>
            )}
          </div>
        )}

        {viewMode === 'month' && (
          <div className="text-center py-8">
            <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">Calendar view coming soon</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode('list')}
            >
              Switch to List View
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplianceCalendar;