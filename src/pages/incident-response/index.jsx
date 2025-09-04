import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import SecurityAlertBanner from '../../components/ui/SecurityAlertBanner';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import IncidentCard from './components/IncidentCard';
import IncidentDetails from './components/IncidentDetails';
import IncidentFilters from './components/IncidentFilters';
import IncidentStats from './components/IncidentStats';
import IncidentTimeline from './components/IncidentTimeline';

const IncidentResponse = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    severity: '',
    status: '',
    type: '',
    assignee: '',
    timeRange: ''
  });
  const [incidents, setIncidents] = useState([]);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Mock data for incidents
  const mockIncidents = [
    {
      id: "INC-2025-001",
      title: "Suspicious Network Activity Detected",
      description: "Multiple failed authentication attempts detected from external IP addresses targeting critical infrastructure systems. Potential brute force attack in progress.",
      type: "Unauthorized Access",
      severity: "Critical",
      status: "Investigating",
      assignedTo: "Sarah Johnson",
      createdAt: "2025-09-01T04:30:00.000Z",
      updatedAt: "2025-09-01T05:00:00.000Z",
      affectedSystems: [
        { name: "Web Server 01", type: "Production Server", status: "Monitoring" },
        { name: "Database Cluster", type: "Database", status: "Compromised" },
        { name: "Load Balancer", type: "Network Infrastructure", status: "Secure" }
      ],
      timeline: [
        { name: "Detection", description: "Initial threat detected", completed: true, active: false, completedAt: "2025-09-01T04:30:00.000Z", tasks: [{ name: "Alert triggered", completed: true }, { name: "Initial assessment", completed: true }] },
        { name: "Investigation", description: "Analyzing threat scope", completed: false, active: true, tasks: [{ name: "Log analysis", completed: true }, { name: "System scan", completed: false }] },
        { name: "Containment", description: "Isolate affected systems", completed: false, active: false, tasks: [{ name: "Block suspicious IPs", completed: false }] },
        { name: "Eradication", description: "Remove threat completely", completed: false, active: false, tasks: [] },
        { name: "Recovery", description: "Restore normal operations", completed: false, active: false, tasks: [] }
      ],
      evidence: [
        { name: "network_logs_20250901.log", type: "Log File", size: "2.4 MB", uploadedAt: "2025-09-01T04:45:00.000Z" },
        { name: "suspicious_ips.csv", type: "CSV File", size: "156 KB", uploadedAt: "2025-09-01T04:50:00.000Z" }
      ],
      communications: [
        { id: 1, author: "System", content: "Incident automatically created based on security alert threshold", timestamp: "2025-09-01T04:30:00.000Z", type: "system" },
        { id: 2, author: "Sarah Johnson", content: "Initial investigation started. Reviewing network logs and identifying attack vectors.", timestamp: "2025-09-01T04:35:00.000Z", type: "comment" },
        { id: 3, author: "Mike Chen", content: "Blocked 15 suspicious IP addresses at firewall level. Monitoring for additional activity.", timestamp: "2025-09-01T04:55:00.000Z", type: "comment" }
      ]
    },
    {
      id: "INC-2025-002",
      title: "Malware Detection on Endpoint",
      description: "Advanced persistent threat detected on executive workstation. Potential data exfiltration attempt identified through behavioral analysis.",
      type: "Malware Detection",
      severity: "High",
      status: "Containment",
      assignedTo: "Mike Chen",
      createdAt: "2025-09-01T03:15:00.000Z",
      updatedAt: "2025-09-01T04:45:00.000Z",
      affectedSystems: [
        { name: "Executive Workstation", type: "Endpoint", status: "Quarantined" },
        { name: "File Server", type: "Storage", status: "Monitoring" }
      ],
      timeline: [
        { name: "Detection", description: "Malware signature detected", completed: true, active: false, completedAt: "2025-09-01T03:15:00.000Z", tasks: [{ name: "Endpoint alert", completed: true }] },
        { name: "Investigation", description: "Malware analysis completed", completed: true, active: false, completedAt: "2025-09-01T03:45:00.000Z", tasks: [{ name: "Sample analysis", completed: true }] },
        { name: "Containment", description: "System isolated", completed: false, active: true, tasks: [{ name: "Workstation quarantine", completed: true }, { name: "Network isolation", completed: false }] },
        { name: "Eradication", description: "Remove malware", completed: false, active: false, tasks: [] },
        { name: "Recovery", description: "Restore system", completed: false, active: false, tasks: [] }
      ],
      evidence: [
        { name: "malware_sample.exe", type: "Executable", size: "1.2 MB", uploadedAt: "2025-09-01T03:20:00.000Z" },
        { name: "forensic_report.pdf", type: "PDF Document", size: "3.8 MB", uploadedAt: "2025-09-01T04:00:00.000Z" }
      ],
      communications: [
        { id: 1, author: "System", content: "Malware detected on EXEC-WS-001. Automatic quarantine initiated.", timestamp: "2025-09-01T03:15:00.000Z", type: "system" },
        { id: 2, author: "Mike Chen", content: "Confirmed APT malware. Initiating full forensic analysis.", timestamp: "2025-09-01T03:25:00.000Z", type: "comment" }
      ]
    },
    {
      id: "INC-2025-003",
      title: "Phishing Campaign Detected",
      description: "Large-scale phishing campaign targeting employee credentials. Multiple users reported suspicious emails with malicious attachments.",
      type: "Phishing Attack",
      severity: "Medium",
      status: "Recovery",
      assignedTo: "Lisa Davis",
      createdAt: "2025-08-31T14:20:00.000Z",
      updatedAt: "2025-09-01T02:30:00.000Z",
      affectedSystems: [
        { name: "Email Server", type: "Communication", status: "Secure" },
        { name: "User Workstations", type: "Endpoints", status: "Patched" }
      ],
      timeline: [
        { name: "Detection", description: "Phishing emails identified", completed: true, active: false, completedAt: "2025-08-31T14:20:00.000Z", tasks: [{ name: "Email analysis", completed: true }] },
        { name: "Investigation", description: "Campaign scope analyzed", completed: true, active: false, completedAt: "2025-08-31T16:00:00.000Z", tasks: [{ name: "Affected users identified", completed: true }] },
        { name: "Containment", description: "Emails blocked", completed: true, active: false, completedAt: "2025-08-31T17:30:00.000Z", tasks: [{ name: "Email quarantine", completed: true }] },
        { name: "Eradication", description: "Malicious content removed", completed: true, active: false, completedAt: "2025-09-01T01:00:00.000Z", tasks: [{ name: "System cleanup", completed: true }] },
        { name: "Recovery", description: "User training initiated", completed: false, active: true, tasks: [{ name: "Security awareness training", completed: false }] }
      ],
      evidence: [
        { name: "phishing_emails.mbox", type: "Email Archive", size: "5.2 MB", uploadedAt: "2025-08-31T15:00:00.000Z" },
        { name: "url_analysis.json", type: "JSON File", size: "892 KB", uploadedAt: "2025-08-31T16:30:00.000Z" }
      ],
      communications: [
        { id: 1, author: "System", content: "Multiple phishing emails detected and quarantined automatically.", timestamp: "2025-08-31T14:20:00.000Z", type: "system" },
        { id: 2, author: "Lisa Davis", content: "Identified 47 affected users. Initiating password reset procedures.", timestamp: "2025-08-31T15:30:00.000Z", type: "comment" }
      ]
    }
  ];

  // Mock statistics
  const mockStats = {
    active: 12,
    activeChange: 8,
    investigating: 5,
    investigatingChange: -12,
    resolvedToday: 8,
    resolvedChange: 15,
    avgResponseTime: 23,
    responseTimeChange: -8,
    critical: 3,
    criticalChange: 25,
    teamUtilization: 78,
    utilizationChange: 5
  };

  // Mock recent activity timeline
  const mockTimeline = [
    {
      id: 1,
      type: 'status_change',
      title: 'Incident INC-2025-001 status updated',
      description: 'Status changed from "New" to "Investigating"',
      user: 'Sarah Johnson',
      timestamp: '2025-09-01T05:05:00.000Z',
      metadata: { from_status: 'New', to_status: 'Investigating' }
    },
    {
      id: 2,
      type: 'escalated',
      title: 'Critical incident escalated',
      description: 'INC-2025-001 escalated to senior security team',
      user: 'Mike Chen',
      timestamp: '2025-09-01T04:58:00.000Z'
    },
    {
      id: 3,
      type: 'evidence',
      title: 'Evidence uploaded',
      description: 'Network logs attached to INC-2025-001',
      user: 'Sarah Johnson',
      timestamp: '2025-09-01T04:45:00.000Z',
      metadata: { file_name: 'network_logs_20250901.log', file_size: '2.4 MB' }
    },
    {
      id: 4,
      type: 'assigned',
      title: 'Incident assigned',
      description: 'INC-2025-002 assigned to Mike Chen',
      user: 'System',
      timestamp: '2025-09-01T04:30:00.000Z'
    },
    {
      id: 5,
      type: 'resolved',
      title: 'Incident resolved',
      description: 'INC-2025-003 marked as resolved',
      user: 'Lisa Davis',
      timestamp: '2025-09-01T02:30:00.000Z'
    }
  ];

  useEffect(() => {
    setIncidents(mockIncidents);
  }, []);

  const tabs = [
    { id: 'active', label: 'Active Incidents', count: mockIncidents?.filter(i => i?.status !== 'Closed')?.length },
    { id: 'investigation', label: 'Investigation', count: mockIncidents?.filter(i => i?.status === 'Investigating')?.length },
    { id: 'closed', label: 'Closed Incidents', count: 0 }
  ];

  const filteredIncidents = incidents?.filter(incident => {
    if (activeTab === 'active' && incident?.status === 'Closed') return false;
    if (activeTab === 'investigation' && incident?.status !== 'Investigating') return false;
    if (activeTab === 'closed' && incident?.status !== 'Closed') return false;

    if (filters?.search && !incident?.title?.toLowerCase()?.includes(filters?.search?.toLowerCase()) && 
        !incident?.id?.toLowerCase()?.includes(filters?.search?.toLowerCase())) return false;
    if (filters?.severity && incident?.severity?.toLowerCase() !== filters?.severity) return false;
    if (filters?.status && incident?.status?.toLowerCase() !== filters?.status) return false;
    if (filters?.type && incident?.type?.toLowerCase() !== filters?.type?.toLowerCase()) return false;
    if (filters?.assignee && incident?.assignedTo?.toLowerCase()?.replace(' ', '-') !== filters?.assignee) return false;

    return true;
  });

  const handleIncidentSelect = (incident) => {
    setSelectedIncident(incident);
    setIsDetailsOpen(true);
  };

  const handleIncidentUpdate = (updatedIncident) => {
    setIncidents(prev => prev?.map(inc => 
      inc?.id === updatedIncident?.id ? updatedIncident : inc
    ));
    setSelectedIncident(updatedIncident);
  };

  const handleStatusUpdate = (incident) => {
    console.log('Update status for:', incident?.id);
  };

  const handleEscalate = (incident) => {
    console.log('Escalate incident:', incident?.id);
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      severity: '',
      status: '',
      type: '',
      assignee: '',
      timeRange: ''
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SecurityAlertBanner />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Incident Response</h1>
              <p className="text-muted-foreground mt-2">
                Manage and track security incidents from detection through resolution
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" iconName="Download" iconPosition="left">
                Export Report
              </Button>
              <Button variant="default" iconName="Plus" iconPosition="left">
                Create Incident
              </Button>
            </div>
          </div>

          {/* Statistics */}
          <IncidentStats stats={mockStats} />

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Panel - Incidents List */}
            <div className="lg:col-span-2">
              {/* Filters */}
              <IncidentFilters 
                filters={filters}
                onFiltersChange={setFilters}
                onClearFilters={handleClearFilters}
              />

              {/* Tabs */}
              <div className="bg-card border border-border rounded-lg mb-4">
                <div className="flex border-b border-border">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors ${
                        activeTab === tab?.id
                          ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-card-foreground'
                      }`}
                    >
                      <span>{tab?.label}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        activeTab === tab?.id
                          ? 'bg-primary/10 text-primary' :'bg-muted text-muted-foreground'
                      }`}>
                        {tab?.count}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Incidents List */}
                <div className="p-4">
                  {filteredIncidents?.length === 0 ? (
                    <div className="text-center py-12">
                      <Icon name="FileText" size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
                      <h3 className="text-lg font-semibold text-card-foreground mb-2">No incidents found</h3>
                      <p className="text-muted-foreground">
                        {activeTab === 'active' && 'No active incidents at this time.'}
                        {activeTab === 'investigation' && 'No incidents under investigation.'}
                        {activeTab === 'closed' && 'No closed incidents to display.'}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {filteredIncidents?.map((incident) => (
                        <IncidentCard
                          key={incident?.id}
                          incident={incident}
                          onSelect={handleIncidentSelect}
                          isSelected={selectedIncident?.id === incident?.id}
                          onStatusUpdate={handleStatusUpdate}
                          onEscalate={handleEscalate}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Panel - Incident Details & Timeline */}
            <div className="lg:col-span-2 space-y-6">
              {/* Incident Details */}
              <div className="bg-card border border-border rounded-lg h-96">
                <IncidentDetails
                  incident={selectedIncident}
                  onClose={() => {
                    setSelectedIncident(null);
                    setIsDetailsOpen(false);
                  }}
                  onUpdate={handleIncidentUpdate}
                />
              </div>

              {/* Recent Activity Timeline */}
              <IncidentTimeline timeline={mockTimeline} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentResponse;