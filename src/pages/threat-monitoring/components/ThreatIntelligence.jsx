import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ThreatIntelligence = ({ selectedThreat }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const threatIntelligence = {
    overview: {
      threatActor: 'APT-29 (Cozy Bear)',
      campaign: 'Operation CloudHopper 2.0',
      firstSeen: '2025-08-15T10:30:00Z',
      lastSeen: '2025-09-01T05:05:00Z',
      confidence: 'High',
      tlp: 'AMBER',
      sources: ['CrowdStrike', 'FireEye', 'Microsoft Threat Intelligence'],
      geography: ['United States', 'European Union', 'Asia-Pacific'],
      industries: ['Financial Services', 'Healthcare', 'Government', 'Technology']
    },
    tactics: [
      {
        phase: 'Initial Access',
        technique: 'T1566.001 - Spearphishing Attachment',
        description: 'Malicious email attachments containing macro-enabled documents',
        indicators: ['Suspicious email patterns', 'Macro execution', 'External network connections']
      },
      {
        phase: 'Execution',
        technique: 'T1059.001 - PowerShell',
        description: 'PowerShell scripts for payload execution and system reconnaissance',
        indicators: ['PowerShell process spawning', 'Encoded commands', 'WMI queries']
      },
      {
        phase: 'Persistence',
        technique: 'T1053.005 - Scheduled Task',
        description: 'Scheduled tasks created for maintaining persistence',
        indicators: ['New scheduled tasks', 'Registry modifications', 'Service installations']
      },
      {
        phase: 'Defense Evasion',
        technique: 'T1055 - Process Injection',
        description: 'Code injection into legitimate processes to evade detection',
        indicators: ['Process hollowing', 'DLL injection', 'Memory anomalies']
      }
    ],
    recommendations: [
      {
        priority: 'critical',
        action: 'Immediate Containment',
        description: 'Isolate affected systems and block malicious IP addresses',
        timeline: 'Within 1 hour',
        owner: 'SOC Team'
      },
      {
        priority: 'high',
        action: 'Threat Hunting',
        description: 'Search for additional compromised systems using IOCs',
        timeline: 'Within 4 hours',
        owner: 'Threat Intelligence Team'
      },
      {
        priority: 'medium',
        action: 'Policy Update',
        description: 'Update email security policies and user awareness training',
        timeline: 'Within 24 hours',
        owner: 'Security Architecture Team'
      },
      {
        priority: 'low',
        action: 'Documentation',
        description: 'Document lessons learned and update incident response procedures',
        timeline: 'Within 1 week',
        owner: 'Security Operations Manager'
      }
    ],
    relatedThreats: [
      {
        id: 'THR-2025-006',
        title: 'Similar Phishing Campaign',
        similarity: 85,
        date: '2025-08-28T14:20:00Z'
      },
      {
        id: 'THR-2025-007',
        title: 'APT-29 Infrastructure Reuse',
        similarity: 92,
        date: '2025-08-25T09:15:00Z'
      },
      {
        id: 'THR-2025-008',
        title: 'PowerShell-based Attack',
        similarity: 78,
        date: '2025-08-20T16:45:00Z'
      }
    ]
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'tactics', label: 'TTPs', icon: 'Target' },
    { id: 'recommendations', label: 'Actions', icon: 'CheckSquare' },
    { id: 'related', label: 'Related', icon: 'Link' }
  ];

  const getPriorityConfig = (priority) => {
    switch (priority) {
      case 'critical':
        return { color: 'text-error', bgColor: 'bg-error/10', icon: 'AlertCircle' };
      case 'high':
        return { color: 'text-warning', bgColor: 'bg-warning/10', icon: 'AlertTriangle' };
      case 'medium':
        return { color: 'text-accent', bgColor: 'bg-accent/10', icon: 'Info' };
      case 'low':
        return { color: 'text-success', bgColor: 'bg-success/10', icon: 'CheckCircle' };
      default:
        return { color: 'text-muted-foreground', bgColor: 'bg-muted', icon: 'Circle' };
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!selectedThreat) {
    return (
      <div className="w-full h-full bg-surface border-l border-border flex items-center justify-center">
        <div className="text-center">
          <Icon name="Shield" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-text-primary mb-2">No Threat Selected</h3>
          <p className="text-muted-foreground">Select a threat from the feed to view intelligence details</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-surface border-l border-border overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Brain" size={24} className="text-primary" />
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Threat Intelligence</h2>
            <p className="text-sm text-muted-foreground">Analysis for {selectedThreat?.id}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-security ${
                activeTab === tab?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-text-primary hover:bg-muted'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Threat Actor Info */}
            <div className="bg-card rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-text-primary mb-4 flex items-center space-x-2">
                <Icon name="Users" size={18} />
                <span>Threat Actor Profile</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">Actor:</label>
                  <p className="font-semibold text-text-primary">{threatIntelligence?.overview?.threatActor}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Campaign:</label>
                  <p className="font-semibold text-text-primary">{threatIntelligence?.overview?.campaign}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Confidence:</label>
                  <span className="px-2 py-1 bg-success/10 text-success rounded-full text-sm font-medium">
                    {threatIntelligence?.overview?.confidence}
                  </span>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">TLP Classification:</label>
                  <span className="px-2 py-1 bg-warning/10 text-warning rounded-full text-sm font-medium">
                    {threatIntelligence?.overview?.tlp}
                  </span>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-card rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-text-primary mb-4 flex items-center space-x-2">
                <Icon name="Clock" size={18} />
                <span>Timeline</span>
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">First Seen:</span>
                  <span className="text-sm text-text-primary">{formatDate(threatIntelligence?.overview?.firstSeen)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Last Seen:</span>
                  <span className="text-sm text-text-primary">{formatDate(threatIntelligence?.overview?.lastSeen)}</span>
                </div>
              </div>
            </div>

            {/* Intelligence Sources */}
            <div className="bg-card rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-text-primary mb-4 flex items-center space-x-2">
                <Icon name="Database" size={18} />
                <span>Intelligence Sources</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {threatIntelligence?.overview?.sources?.map((source, index) => (
                  <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    {source}
                  </span>
                ))}
              </div>
            </div>

            {/* Geographic Distribution */}
            <div className="bg-card rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-text-primary mb-4 flex items-center space-x-2">
                <Icon name="Globe" size={18} />
                <span>Geographic Impact</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-text-primary mb-2">Regions:</h4>
                  <div className="space-y-1">
                    {threatIntelligence?.overview?.geography?.map((region, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Icon name="MapPin" size={14} className="text-muted-foreground" />
                        <span className="text-sm text-text-primary">{region}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-text-primary mb-2">Industries:</h4>
                  <div className="space-y-1">
                    {threatIntelligence?.overview?.industries?.map((industry, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Icon name="Building" size={14} className="text-muted-foreground" />
                        <span className="text-sm text-text-primary">{industry}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tactics' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-text-primary">MITRE ATT&CK Tactics & Techniques</h3>
              <Button variant="outline" size="sm" iconName="ExternalLink" iconPosition="left">
                View in MITRE
              </Button>
            </div>
            {threatIntelligence?.tactics?.map((tactic, index) => (
              <div key={index} className="bg-card rounded-lg p-4 border border-border">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Target" size={16} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-semibold text-text-primary">{tactic?.phase}</h4>
                      <span className="px-2 py-1 bg-muted text-muted-foreground rounded-md text-xs font-mono">
                        {tactic?.technique}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{tactic?.description}</p>
                    <div>
                      <h5 className="text-xs font-medium text-text-primary mb-2">Key Indicators:</h5>
                      <div className="flex flex-wrap gap-1">
                        {tactic?.indicators?.map((indicator, idx) => (
                          <span key={idx} className="px-2 py-1 bg-accent/10 text-accent rounded-md text-xs">
                            {indicator}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="space-y-4">
            <h3 className="font-semibold text-text-primary mb-4">Recommended Actions</h3>
            {threatIntelligence?.recommendations?.map((rec, index) => {
              const priorityConfig = getPriorityConfig(rec?.priority);
              return (
                <div key={index} className="bg-card rounded-lg p-4 border border-border">
                  <div className="flex items-start space-x-4">
                    <div className={`w-8 h-8 ${priorityConfig?.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon name={priorityConfig?.icon} size={16} className={priorityConfig?.color} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-text-primary">{rec?.action}</h4>
                        <span className={`px-2 py-1 ${priorityConfig?.bgColor} ${priorityConfig?.color} rounded-full text-xs font-medium uppercase`}>
                          {rec?.priority}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{rec?.description}</p>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Icon name="Clock" size={12} className="text-muted-foreground" />
                            <span className="text-muted-foreground">Timeline: {rec?.timeline}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Icon name="User" size={12} className="text-muted-foreground" />
                            <span className="text-muted-foreground">Owner: {rec?.owner}</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Assign Task
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'related' && (
          <div className="space-y-4">
            <h3 className="font-semibold text-text-primary mb-4">Related Threats</h3>
            {threatIntelligence?.relatedThreats?.map((threat, index) => (
              <div key={index} className="bg-card rounded-lg p-4 border border-border hover:border-primary/50 transition-security cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon name="Link" size={16} className="text-muted-foreground" />
                    <div>
                      <h4 className="font-semibold text-text-primary">{threat?.title}</h4>
                      <p className="text-sm text-muted-foreground">ID: {threat?.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground">Similarity:</span>
                        <span className={`text-sm font-semibold ${
                          threat?.similarity >= 90 ? 'text-error' :
                          threat?.similarity >= 70 ? 'text-warning': 'text-success'
                        }`}>
                          {threat?.similarity}%
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{formatDate(threat?.date)}</p>
                    </div>
                    <Button variant="ghost" size="sm" iconName="ExternalLink">
                      View
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ThreatIntelligence;