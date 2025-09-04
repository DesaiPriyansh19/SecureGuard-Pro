import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ThreatFeed = ({ filters, onThreatSelect, selectedThreat }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'timestamp', direction: 'desc' });
  const [expandedThreat, setExpandedThreat] = useState(null);

  const mockThreats = [
    {
      id: 'THR-2025-001',
      severity: 'critical',
      category: 'malware',
      title: 'Advanced Persistent Threat Detected',
      description: 'Sophisticated malware campaign targeting financial data through compromised email attachments.',
      sourceIp: '192.168.1.100',
      targetSystem: 'DB-SERVER-01',
      affectedAssets: ['DB-SERVER-01', 'WEB-APP-03', 'FILE-SHARE-02'],
      status: 'active',
      timestamp: new Date('2025-09-01T05:05:00Z'),
      lastActivity: new Date('2025-09-01T05:08:30Z'),
      riskScore: 95,
      iocs: [
        { type: 'IP', value: '192.168.1.100', confidence: 'High' },
        { type: 'Hash', value: 'a1b2c3d4e5f6...', confidence: 'Medium' },
        { type: 'Domain', value: 'malicious-site.com', confidence: 'High' }
      ],
      mitreAttack: ['T1566.001', 'T1059.001'],
      analyst: 'Sarah Chen',
      priority: 1
    },
    {
      id: 'THR-2025-002',
      severity: 'high',
      category: 'phishing',
      title: 'Credential Harvesting Campaign',
      description: 'Large-scale phishing campaign impersonating corporate login pages to steal user credentials.',
      sourceIp: '203.0.113.45',
      targetSystem: 'MAIL-SERVER-01',
      affectedAssets: ['MAIL-SERVER-01', 'AD-CONTROLLER-01'],
      status: 'investigating',
      timestamp: new Date('2025-09-01T04:45:00Z'),
      lastActivity: new Date('2025-09-01T05:02:15Z'),
      riskScore: 78,
      iocs: [
        { type: 'URL', value: 'https://fake-login.example.com', confidence: 'High' },
        { type: 'Email', value: 'admin@fake-domain.com', confidence: 'Medium' }
      ],
      mitreAttack: ['T1566.002', 'T1078'],
      analyst: 'Mike Rodriguez',
      priority: 2
    },
    {
      id: 'THR-2025-003',
      severity: 'medium',
      category: 'ddos',
      title: 'Distributed Denial of Service Attack',
      description: 'Coordinated DDoS attack targeting web application infrastructure with volumetric traffic.',
      sourceIp: 'Multiple IPs',
      targetSystem: 'WEB-LB-01',
      affectedAssets: ['WEB-LB-01', 'WEB-APP-01', 'WEB-APP-02'],
      status: 'active',
      timestamp: new Date('2025-09-01T04:30:00Z'),
      lastActivity: new Date('2025-09-01T05:09:45Z'),
      riskScore: 65,
      iocs: [
        { type: 'IP Range', value: '198.51.100.0/24', confidence: 'High' },
        { type: 'User-Agent', value: 'BotNet/1.0', confidence: 'Medium' }
      ],
      mitreAttack: ['T1498.001'],
      analyst: 'Alex Thompson',
      priority: 3
    },
    {
      id: 'THR-2025-004',
      severity: 'high',
      category: 'intrusion',
      title: 'Unauthorized Access Attempt',
      description: 'Multiple failed authentication attempts followed by successful privilege escalation on critical server.',
      sourceIp: '10.0.0.50',
      targetSystem: 'PROD-SERVER-05',
      affectedAssets: ['PROD-SERVER-05', 'AD-CONTROLLER-02'],
      status: 'investigating',
      timestamp: new Date('2025-09-01T04:15:00Z'),
      lastActivity: new Date('2025-09-01T04:55:20Z'),
      riskScore: 82,
      iocs: [
        { type: 'Username', value: 'admin_backup', confidence: 'High' },
        { type: 'Process', value: 'powershell.exe', confidence: 'Medium' }
      ],
      mitreAttack: ['T1110.001', 'T1078.003'],
      analyst: 'Jessica Park',
      priority: 2
    },
    {
      id: 'THR-2025-005',
      severity: 'low',
      category: 'suspicious',
      title: 'Anomalous Network Traffic Pattern',
      description: 'Unusual data transfer patterns detected during off-hours, potentially indicating data exfiltration.',
      sourceIp: '172.16.0.25',
      targetSystem: 'FILE-SERVER-03',
      affectedAssets: ['FILE-SERVER-03'],
      status: 'resolved',
      timestamp: new Date('2025-09-01T03:45:00Z'),
      lastActivity: new Date('2025-09-01T04:30:10Z'),
      riskScore: 35,
      iocs: [
        { type: 'File Path', value: '/sensitive/financial_data/', confidence: 'Low' }
      ],
      mitreAttack: ['T1041'],
      analyst: 'David Kim',
      priority: 4
    }
  ];

  const getSeverityConfig = (severity) => {
    switch (severity) {
      case 'critical':
        return { color: 'text-error', bgColor: 'bg-error/10', borderColor: 'border-error' };
      case 'high':
        return { color: 'text-warning', bgColor: 'bg-warning/10', borderColor: 'border-warning' };
      case 'medium':
        return { color: 'text-accent', bgColor: 'bg-accent/10', borderColor: 'border-accent' };
      case 'low':
        return { color: 'text-success', bgColor: 'bg-success/10', borderColor: 'border-success' };
      default:
        return { color: 'text-muted-foreground', bgColor: 'bg-muted', borderColor: 'border-muted' };
    }
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'active':
        return { color: 'text-error', bgColor: 'bg-error/10', icon: 'AlertCircle' };
      case 'investigating':
        return { color: 'text-warning', bgColor: 'bg-warning/10', icon: 'Search' };
      case 'resolved':
        return { color: 'text-success', bgColor: 'bg-success/10', icon: 'CheckCircle' };
      case 'false_positive':
        return { color: 'text-muted-foreground', bgColor: 'bg-muted', icon: 'XCircle' };
      default:
        return { color: 'text-muted-foreground', bgColor: 'bg-muted', icon: 'Circle' };
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'malware': return 'Bug';
      case 'phishing': return 'Mail';
      case 'ddos': return 'Zap';
      case 'intrusion': return 'Shield';
      case 'data_exfil': return 'Download';
      case 'suspicious': return 'Eye';
      default: return 'AlertTriangle';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diffMs = now - timestamp;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return timestamp?.toLocaleDateString();
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const sortedThreats = [...mockThreats]?.sort((a, b) => {
    if (sortConfig?.key === 'severity') {
      const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
      const aValue = severityOrder?.[a?.severity];
      const bValue = severityOrder?.[b?.severity];
      return sortConfig?.direction === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    if (sortConfig?.key === 'timestamp') {
      return sortConfig?.direction === 'asc' 
        ? new Date(a.timestamp) - new Date(b.timestamp)
        : new Date(b.timestamp) - new Date(a.timestamp);
    }
    
    if (sortConfig?.key === 'riskScore') {
      return sortConfig?.direction === 'asc' ? a?.riskScore - b?.riskScore : b?.riskScore - a?.riskScore;
    }
    
    return 0;
  });

  const toggleThreatExpansion = (threatId) => {
    setExpandedThreat(expandedThreat === threatId ? null : threatId);
  };

  const handleThreatAction = (action, threat) => {
    console.log(`Executing ${action} for threat ${threat?.id}`);
  };

  return (
    <div className="w-full h-full bg-surface overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Icon name="Activity" size={24} className="text-primary" />
            <div>
              <h2 className="text-xl font-semibold text-text-primary">Threat Feed</h2>
              <p className="text-sm text-muted-foreground">Real-time security threat monitoring</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="RefreshCw" iconPosition="left">
              Refresh
            </Button>
            <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
              Export
            </Button>
          </div>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center space-x-4">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleSort('timestamp')}
            className={`${sortConfig?.key === 'timestamp' ? 'bg-muted' : ''}`}
          >
            Time {sortConfig?.key === 'timestamp' && (
              <Icon name={sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown'} size={14} className="ml-1" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleSort('severity')}
            className={`${sortConfig?.key === 'severity' ? 'bg-muted' : ''}`}
          >
            Severity {sortConfig?.key === 'severity' && (
              <Icon name={sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown'} size={14} className="ml-1" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleSort('riskScore')}
            className={`${sortConfig?.key === 'riskScore' ? 'bg-muted' : ''}`}
          >
            Risk Score {sortConfig?.key === 'riskScore' && (
              <Icon name={sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown'} size={14} className="ml-1" />
            )}
          </Button>
        </div>
      </div>
      {/* Threat List */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-2 p-4">
          {sortedThreats?.map((threat) => {
            const severityConfig = getSeverityConfig(threat?.severity);
            const statusConfig = getStatusConfig(threat?.status);
            const isExpanded = expandedThreat === threat?.id;
            const isSelected = selectedThreat?.id === threat?.id;

            return (
              <div
                key={threat?.id}
                className={`border rounded-lg transition-security cursor-pointer ${
                  isSelected ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                } ${severityConfig?.borderColor}`}
                onClick={() => onThreatSelect(threat)}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      {/* Severity Indicator */}
                      <div className={`w-3 h-3 rounded-full ${severityConfig?.bgColor} border-2 ${severityConfig?.borderColor} mt-2`} />
                      
                      {/* Threat Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <Icon name={getCategoryIcon(threat?.category)} size={16} className="text-muted-foreground" />
                          <h3 className="font-semibold text-text-primary">{threat?.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${severityConfig?.bgColor} ${severityConfig?.color}`}>
                            {threat?.severity?.toUpperCase()}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig?.bgColor} ${statusConfig?.color}`}>
                            {threat?.status?.replace('_', ' ')?.toUpperCase()}
                          </span>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3">{threat?.description}</p>
                        
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                          <div>
                            <span className="text-muted-foreground">Source IP:</span>
                            <p className="font-mono text-text-primary">{threat?.sourceIp}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Target:</span>
                            <p className="font-mono text-text-primary">{threat?.targetSystem}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Risk Score:</span>
                            <p className={`font-semibold ${threat?.riskScore >= 80 ? 'text-error' : threat?.riskScore >= 60 ? 'text-warning' : 'text-success'}`}>
                              {threat?.riskScore}/100
                            </p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Last Activity:</span>
                            <p className="text-text-primary">{formatTimestamp(threat?.lastActivity)}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2 ml-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e?.stopPropagation();
                          toggleThreatExpansion(threat?.id);
                        }}
                      >
                        <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={16} />
                      </Button>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* IOCs */}
                        <div>
                          <h4 className="font-semibold text-sm text-text-primary mb-3">Indicators of Compromise</h4>
                          <div className="space-y-2">
                            {threat?.iocs?.map((ioc, index) => (
                              <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                                <div>
                                  <span className="text-xs text-muted-foreground">{ioc?.type}:</span>
                                  <p className="font-mono text-sm text-text-primary">{ioc?.value}</p>
                                </div>
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  ioc?.confidence === 'High' ? 'bg-error/10 text-error' :
                                  ioc?.confidence === 'Medium'? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'
                                }`}>
                                  {ioc?.confidence}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* MITRE ATT&CK */}
                        <div>
                          <h4 className="font-semibold text-sm text-text-primary mb-3">MITRE ATT&CK Techniques</h4>
                          <div className="flex flex-wrap gap-2">
                            {threat?.mitreAttack?.map((technique) => (
                              <span key={technique} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md font-mono">
                                {technique}
                              </span>
                            ))}
                          </div>
                          
                          <div className="mt-4">
                            <h5 className="font-medium text-sm text-text-primary mb-2">Affected Assets</h5>
                            <div className="flex flex-wrap gap-2">
                              {threat?.affectedAssets?.map((asset) => (
                                <span key={asset} className="px-2 py-1 bg-muted text-text-primary text-xs rounded-md font-mono">
                                  {asset}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <Icon name="User" size={14} />
                          <span>Assigned to: {threat?.analyst}</span>
                          <span>•</span>
                          <span>Priority: {threat?.priority}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            iconName="Shield"
                            iconPosition="left"
                            onClick={(e) => {
                              e?.stopPropagation();
                              handleThreatAction('block', threat);
                            }}
                          >
                            Block IP
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            iconName="Lock"
                            iconPosition="left"
                            onClick={(e) => {
                              e?.stopPropagation();
                              handleThreatAction('quarantine', threat);
                            }}
                          >
                            Quarantine
                          </Button>
                          <Button
                            variant="default"
                            size="sm"
                            iconName="Plus"
                            iconPosition="left"
                            onClick={(e) => {
                              e?.stopPropagation();
                              handleThreatAction('incident', threat);
                            }}
                          >
                            Create Incident
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ThreatFeed;