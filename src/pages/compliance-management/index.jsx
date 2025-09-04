import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import SecurityAlertBanner from '../../components/ui/SecurityAlertBanner';
import ComplianceFrameworkSelector from './components/ComplianceFrameworkSelector';
import ComplianceStatusDashboard from './components/ComplianceStatusDashboard';
import ControlsTable from './components/ControlsTable';
import ComplianceCalendar from './components/ComplianceCalendar';
import EvidenceManagement from './components/EvidenceManagement';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const ComplianceManagement = () => {
  const [selectedFramework, setSelectedFramework] = useState('iso-27001');
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for compliance frameworks
  const frameworks = [
    {
      id: 'iso-27001',
      name: 'ISO 27001:2022',
      controlsCount: 114,
      completionRate: 78,
      description: 'Information Security Management Systems'
    },
    {
      id: 'soc-2',
      name: 'SOC 2 Type II',
      controlsCount: 64,
      completionRate: 85,
      description: 'Service Organization Control 2'
    },
    {
      id: 'nist-csf',
      name: 'NIST Cybersecurity Framework',
      controlsCount: 108,
      completionRate: 72,
      description: 'National Institute of Standards and Technology'
    },
    {
      id: 'pci-dss',
      name: 'PCI DSS v4.0',
      controlsCount: 321,
      completionRate: 91,
      description: 'Payment Card Industry Data Security Standard'
    }
  ];

  // Mock compliance status data
  const statusData = {
    overallCompliance: 78,
    implementedControls: 89,
    totalControls: 114,
    nextAudit: 'Mar 15, 2025',
    openFindings: 12,
    overdueItems: 3,
    statusBreakdown: [
      { type: 'compliant', count: 89, percentage: 78 },
      { type: 'partial', count: 15, percentage: 13 },
      { type: 'non-compliant', count: 7, percentage: 6 },
      { type: 'not-started', count: 3, percentage: 3 }
    ]
  };

  // Mock controls data
  const controls = [
    {
      id: 'A.5.1.1',
      title: 'Information Security Policy',
      description: 'A set of policies for information security shall be defined, approved by management, published and communicated to employees and relevant external parties.',
      status: 'implemented',
      priority: 'high',
      family: 'access-control',
      owner: 'Sarah Johnson',
      ownerRole: 'CISO',
      dueDate: 'Dec 31, 2024',
      isOverdue: false,
      evidenceCount: 5
    },
    {
      id: 'A.5.1.2',
      title: 'Review of Information Security Policy',
      description: 'The information security policy shall be reviewed at planned intervals or if significant changes occur to ensure its continuing suitability, adequacy and effectiveness.',
      status: 'in-progress',
      priority: 'medium',
      family: 'access-control',
      owner: 'Michael Chen',
      ownerRole: 'Security Manager',
      dueDate: 'Jan 15, 2025',
      isOverdue: false,
      evidenceCount: 2
    },
    {
      id: 'A.6.1.1',
      title: 'Information Security Roles and Responsibilities',
      description: 'All information security responsibilities shall be defined and allocated.',
      status: 'needs-review',
      priority: 'high',
      family: 'audit-accountability',
      owner: 'Lisa Wang',
      ownerRole: 'HR Director',
      dueDate: 'Nov 30, 2024',
      isOverdue: true,
      evidenceCount: 1
    },
    {
      id: 'A.8.1.1',
      title: 'Inventory of Assets',
      description: 'Assets associated with information and information processing facilities shall be identified and an inventory of these assets shall be drawn up and maintained.',
      status: 'not-started',
      priority: 'medium',
      family: 'configuration-management',
      owner: 'David Rodriguez',
      ownerRole: 'IT Manager',
      dueDate: 'Feb 28, 2025',
      isOverdue: false,
      evidenceCount: 0
    },
    {
      id: 'A.9.1.1',
      title: 'Access Control Policy',
      description: 'An access control policy shall be established, documented and reviewed based on business and information security requirements.',
      status: 'implemented',
      priority: 'high',
      family: 'identification-authentication',
      owner: 'Jennifer Kim',
      ownerRole: 'Security Analyst',
      dueDate: 'Dec 15, 2024',
      isOverdue: false,
      evidenceCount: 8
    }
  ];

  // Mock calendar events
  const calendarEvents = [
    {
      id: 1,
      title: 'ISO 27001 Internal Audit',
      description: 'Quarterly internal audit for ISO 27001 compliance assessment',
      date: '2025-01-15T09:00:00Z',
      type: 'audit',
      priority: 'high',
      assignee: 'Sarah Johnson',
      status: 'scheduled'
    },
    {
      id: 2,
      title: 'SOC 2 Evidence Collection Deadline',
      description: 'Final deadline for Q4 SOC 2 evidence submission',
      date: '2025-01-08T17:00:00Z',
      type: 'deadline',
      priority: 'high',
      assignee: 'Michael Chen',
      status: 'in-progress'
    },
    {
      id: 3,
      title: 'Security Awareness Training',
      description: 'Mandatory security awareness training for all employees',
      date: '2025-01-12T14:00:00Z',
      type: 'training',
      priority: 'medium',
      assignee: 'Lisa Wang',
      status: 'scheduled'
    },
    {
      id: 4,
      title: 'Risk Assessment Review',
      description: 'Annual risk assessment review and update',
      date: '2025-01-20T10:00:00Z',
      type: 'review',
      priority: 'medium',
      assignee: 'David Rodriguez',
      status: 'scheduled'
    },
    {
      id: 5,
      title: 'PCI DSS Vulnerability Scan',
      description: 'Quarterly vulnerability scan for PCI DSS compliance',
      date: '2025-01-25T11:00:00Z',
      type: 'assessment',
      priority: 'high',
      assignee: 'Jennifer Kim',
      status: 'scheduled'
    }
  ];

  // Mock evidence data
  const evidence = [
    {
      id: 1,
      name: 'Information Security Policy v2.1.pdf',
      description: 'Updated information security policy document with latest regulatory requirements',
      type: 'document',
      status: 'approved',
      controlId: 'A.5.1.1',
      size: 2048576,
      uploadDate: '2024-12-15T10:30:00Z',
      uploadedBy: 'Sarah Johnson',
      expiryDate: '2025-12-31T23:59:59Z'
    },
    {
      id: 2,
      name: 'Access Control Matrix.xlsx',
      description: 'Comprehensive access control matrix showing user permissions and roles',
      type: 'document',
      status: 'pending',
      controlId: 'A.9.1.1',
      size: 1536000,
      uploadDate: '2024-12-20T14:15:00Z',
      uploadedBy: 'Jennifer Kim',
      expiryDate: null
    },
    {
      id: 3,
      name: 'Security Training Certificate.pdf',
      description: 'ISO 27001 Lead Auditor certification for compliance team',
      type: 'certificate',
      status: 'approved',
      controlId: 'A.6.1.1',
      size: 512000,
      uploadDate: '2024-11-28T09:45:00Z',
      uploadedBy: 'Michael Chen',
      expiryDate: '2026-11-28T23:59:59Z'
    },
    {
      id: 4,
      name: 'Vulnerability Scan Report.pdf',
      description: 'Monthly vulnerability assessment report for critical systems',
      type: 'report',
      status: 'approved',
      controlId: 'A.8.1.1',
      size: 3072000,
      uploadDate: '2024-12-01T16:20:00Z',
      uploadedBy: 'David Rodriguez',
      expiryDate: null
    },
    {
      id: 5,
      name: 'Incident Response Procedure.docx',
      description: 'Updated incident response procedure with new escalation matrix',
      type: 'procedure',
      status: 'expired',
      controlId: 'A.16.1.1',
      size: 768000,
      uploadDate: '2024-06-15T11:30:00Z',
      uploadedBy: 'Lisa Wang',
      expiryDate: '2024-12-15T23:59:59Z'
    },
    {
      id: 6,
      name: 'Network Architecture Diagram.png',
      description: 'Current network architecture showing security zones and controls',
      type: 'screenshot',
      status: 'pending',
      controlId: 'A.13.1.1',
      size: 2560000,
      uploadDate: '2024-12-18T13:10:00Z',
      uploadedBy: 'David Rodriguez',
      expiryDate: null
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'controls', label: 'Controls', icon: 'Shield' },
    { id: 'calendar', label: 'Calendar', icon: 'Calendar' },
    { id: 'evidence', label: 'Evidence', icon: 'FileText' }
  ];

  const selectedFrameworkData = frameworks?.find(f => f?.id === selectedFramework);

  const handleFrameworkChange = (frameworkId) => {
    setSelectedFramework(frameworkId);
  };

  const handleControlUpdate = (controlId) => {
    console.log('Update control:', controlId);
  };

  const handleViewEvidence = (controlId) => {
    console.log('View evidence for control:', controlId);
    setActiveTab('evidence');
  };

  const handleEventClick = (event) => {
    console.log('Event clicked:', event);
  };

  const handleScheduleAssessment = () => {
    console.log('Schedule new assessment');
  };

  const handleUploadEvidence = () => {
    console.log('Upload evidence');
  };

  const handleDeleteEvidence = (evidenceId) => {
    console.log('Delete evidence:', evidenceId);
  };

  const handleGenerateReport = () => {
    console.log('Generate compliance report');
  };

  const handleUpdateControlStatus = () => {
    console.log('Update control status');
  };

  useEffect(() => {
    document.title = 'Compliance Management - SecureGuard Pro';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SecurityAlertBanner />
      <main className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Compliance Management</h1>
                <p className="text-muted-foreground">Monitor and manage regulatory compliance across multiple frameworks</p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  iconName="FileDown"
                  iconPosition="left"
                  onClick={handleGenerateReport}
                >
                  Generate Report
                </Button>
                <Button
                  variant="outline"
                  iconName="Calendar"
                  iconPosition="left"
                  onClick={handleScheduleAssessment}
                >
                  Schedule Assessment
                </Button>
                <Button
                  variant="default"
                  iconName="RefreshCw"
                  iconPosition="left"
                  onClick={handleUpdateControlStatus}
                >
                  Update Status
                </Button>
              </div>
            </div>
          </div>

          {/* Framework Selector */}
          <div className="mb-8">
            <ComplianceFrameworkSelector
              selectedFramework={selectedFramework}
              onFrameworkChange={handleFrameworkChange}
              frameworks={frameworks}
            />
          </div>

          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="border-b border-border">
              <nav className="flex space-x-8">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-security ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-8">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2">
                  <ComplianceStatusDashboard
                    framework={selectedFrameworkData}
                    statusData={statusData}
                  />
                </div>
                <div>
                  <ComplianceCalendar
                    events={calendarEvents?.slice(0, 5)}
                    onEventClick={handleEventClick}
                    onScheduleAssessment={handleScheduleAssessment}
                  />
                </div>
              </div>
            )}

            {activeTab === 'controls' && (
              <ControlsTable
                controls={controls}
                onControlUpdate={handleControlUpdate}
                onViewEvidence={handleViewEvidence}
              />
            )}

            {activeTab === 'calendar' && (
              <ComplianceCalendar
                events={calendarEvents}
                onEventClick={handleEventClick}
                onScheduleAssessment={handleScheduleAssessment}
              />
            )}

            {activeTab === 'evidence' && (
              <EvidenceManagement
                evidence={evidence}
                onUploadEvidence={handleUploadEvidence}
                onViewEvidence={handleViewEvidence}
                onDeleteEvidence={handleDeleteEvidence}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ComplianceManagement;