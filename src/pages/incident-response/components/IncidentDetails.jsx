import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const IncidentDetails = ({ incident, onClose, onUpdate }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [newComment, setNewComment] = useState('');
  const [isAddingComment, setIsAddingComment] = useState(false);

  if (!incident) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <Icon name="FileText" size={48} className="mx-auto mb-4 opacity-50" />
          <p>Select an incident to view details</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'FileText' },
    { id: 'timeline', label: 'Timeline', icon: 'Clock' },
    { id: 'evidence', label: 'Evidence', icon: 'Paperclip' },
    { id: 'communications', label: 'Communications', icon: 'MessageSquare' }
  ];

  const handleAddComment = () => {
    if (newComment?.trim()) {
      const comment = {
        id: Date.now(),
        author: 'John Smith',
        content: newComment,
        timestamp: new Date()?.toISOString(),
        type: 'comment'
      };
      
      onUpdate({
        ...incident,
        communications: [...incident?.communications, comment]
      });
      
      setNewComment('');
      setIsAddingComment(false);
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp)?.toLocaleString();
  };

  const getSeverityConfig = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical':
        return { color: 'text-error', bg: 'bg-error/10', icon: 'AlertCircle' };
      case 'high':
        return { color: 'text-warning', bg: 'bg-warning/10', icon: 'AlertTriangle' };
      case 'medium':
        return { color: 'text-accent', bg: 'bg-accent/10', icon: 'Info' };
      case 'low':
        return { color: 'text-success', bg: 'bg-success/10', icon: 'CheckCircle' };
      default:
        return { color: 'text-muted-foreground', bg: 'bg-muted', icon: 'Circle' };
    }
  };

  const severityConfig = getSeverityConfig(incident?.severity);

  return (
    <div className="h-full flex flex-col bg-card">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-lg ${severityConfig?.bg}`}>
            <Icon name={severityConfig?.icon} size={20} className={severityConfig?.color} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-card-foreground">{incident?.id}</h2>
            <p className="text-muted-foreground">{incident?.type}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <Icon name="X" size={20} />
        </Button>
      </div>
      {/* Tabs */}
      <div className="flex border-b border-border">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === tab?.id
                ? 'text-primary border-b-2 border-primary' :'text-muted-foreground hover:text-card-foreground'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span>{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-card-foreground mb-3">{incident?.title}</h3>
              <p className="text-muted-foreground mb-4">{incident?.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-sm font-medium text-card-foreground">Severity</label>
                  <div className={`mt-1 px-3 py-2 rounded-lg ${severityConfig?.bg} ${severityConfig?.color} font-medium`}>
                    {incident?.severity}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-card-foreground">Status</label>
                  <div className="mt-1 px-3 py-2 rounded-lg bg-accent/10 text-accent font-medium">
                    {incident?.status}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-card-foreground">Assigned To</label>
                  <p className="mt-1 text-muted-foreground">{incident?.assignedTo}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-card-foreground">Created</label>
                  <p className="mt-1 text-muted-foreground">{formatTimestamp(incident?.createdAt)}</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-card-foreground mb-3">Affected Systems</h4>
              <div className="space-y-2">
                {incident?.affectedSystems?.map((system, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon name="Server" size={16} className="text-muted-foreground" />
                      <div>
                        <p className="font-medium text-card-foreground">{system?.name}</p>
                        <p className="text-sm text-muted-foreground">{system?.type}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      system?.status === 'Compromised' ?'bg-error/10 text-error' 
                        : system?.status === 'Monitoring' ?'bg-warning/10 text-warning' :'bg-success/10 text-success'
                    }`}>
                      {system?.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Response Timeline</h3>
            <div className="space-y-4">
              {incident?.timeline?.map((phase, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className={`w-8 h-8 rounded-full border-2 border-card flex items-center justify-center ${
                    phase?.completed 
                      ? 'bg-success text-success-foreground' 
                      : phase?.active 
                        ? 'bg-accent text-accent-foreground' 
                        : 'bg-muted text-muted-foreground'
                  }`}>
                    <Icon 
                      name={phase?.completed ? 'Check' : phase?.active ? 'Clock' : 'Circle'} 
                      size={14} 
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-card-foreground">{phase?.name}</h4>
                      {phase?.completedAt && (
                        <span className="text-sm text-muted-foreground">
                          {formatTimestamp(phase?.completedAt)}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{phase?.description}</p>
                    {phase?.tasks && (
                      <div className="mt-2 space-y-1">
                        {phase?.tasks?.map((task, taskIndex) => (
                          <div key={taskIndex} className="flex items-center space-x-2 text-sm">
                            <Icon 
                              name={task?.completed ? 'CheckCircle' : 'Circle'} 
                              size={12} 
                              className={task?.completed ? 'text-success' : 'text-muted-foreground'}
                            />
                            <span className={task?.completed ? 'text-muted-foreground line-through' : 'text-card-foreground'}>
                              {task?.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'evidence' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-card-foreground">Evidence & Attachments</h3>
              <Button variant="outline" size="sm" iconName="Upload" iconPosition="left">
                Upload Evidence
              </Button>
            </div>
            <div className="space-y-3">
              {incident?.evidence?.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Icon name="Paperclip" size={16} className="text-muted-foreground" />
                    <div>
                      <p className="font-medium text-card-foreground">{item?.name}</p>
                      <p className="text-sm text-muted-foreground">{item?.type} • {item?.size}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-muted-foreground">{formatTimestamp(item?.uploadedAt)}</span>
                    <Button variant="ghost" size="sm" iconName="Download" iconSize={14}>
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'communications' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-card-foreground">Communications Log</h3>
              <Button 
                variant="outline" 
                size="sm" 
                iconName="Plus" 
                iconPosition="left"
                onClick={() => setIsAddingComment(true)}
              >
                Add Comment
              </Button>
            </div>

            {isAddingComment && (
              <div className="p-4 border border-border rounded-lg bg-muted/50">
                <Input
                  label="Add Comment"
                  type="text"
                  placeholder="Enter your comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e?.target?.value)}
                  className="mb-3"
                />
                <div className="flex items-center space-x-2">
                  <Button variant="default" size="sm" onClick={handleAddComment}>
                    Add Comment
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => {
                    setIsAddingComment(false);
                    setNewComment('');
                  }}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {incident?.communications?.map((comm, index) => (
                <div key={index} className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Icon name="User" size={16} className="text-muted-foreground" />
                      <span className="font-medium text-card-foreground">{comm?.author}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        comm?.type === 'system' ?'bg-accent/10 text-accent' :'bg-muted text-muted-foreground'
                      }`}>
                        {comm?.type}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">{formatTimestamp(comm?.timestamp)}</span>
                  </div>
                  <p className="text-muted-foreground">{comm?.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Actions */}
      <div className="p-6 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="ArrowUp" iconPosition="left">
              Escalate
            </Button>
            <Button variant="outline" size="sm" iconName="Users" iconPosition="left">
              Assign
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="FileText" iconPosition="left">
              Generate Report
            </Button>
            <Button variant="default" size="sm" iconName="Edit" iconPosition="left">
              Update Status
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentDetails;