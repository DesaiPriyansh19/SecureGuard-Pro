import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ComplianceScoreWidget = () => {
  const complianceData = {
    overallScore: 87,
    frameworks: [
      {
        name: "ISO 27001",
        score: 92,
        status: "compliant",
        lastAudit: "2025-08-15",
        nextAudit: "2025-11-15",
        controls: { total: 114, passed: 105, failed: 9 }
      },
      {
        name: "SOC 2 Type II",
        score: 89,
        status: "compliant",
        lastAudit: "2025-07-20",
        nextAudit: "2025-10-20",
        controls: { total: 64, passed: 57, failed: 7 }
      },
      {
        name: "GDPR",
        score: 85,
        status: "minor-issues",
        lastAudit: "2025-08-01",
        nextAudit: "2025-11-01",
        controls: { total: 32, passed: 27, failed: 5 }
      },
      {
        name: "HIPAA",
        score: 78,
        status: "needs-attention",
        lastAudit: "2025-07-10",
        nextAudit: "2025-10-10",
        controls: { total: 45, passed: 35, failed: 10 }
      }
    ]
  };

  const recentFindings = [
    {
      id: 1,
      framework: "HIPAA",
      control: "164.312(a)(1)",
      finding: "Access control procedures need documentation update",
      severity: "medium",
      dueDate: "2025-09-15",
      assignee: "Compliance Team"
    },
    {
      id: 2,
      framework: "GDPR",
      control: "Art. 32",
      finding: "Encryption key rotation policy requires review",
      severity: "low",
      dueDate: "2025-09-30",
      assignee: "Security Team"
    },
    {
      id: 3,
      framework: "SOC 2",
      control: "CC6.1",
      finding: "Logical access controls need strengthening",
      severity: "high",
      dueDate: "2025-09-10",
      assignee: "IT Operations"
    }
  ];

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 80) return 'text-warning';
    return 'text-error';
  };

  const getScoreBgColor = (score) => {
    if (score >= 90) return 'bg-success/10 border-success/20';
    if (score >= 80) return 'bg-warning/10 border-warning/20';
    return 'bg-error/10 border-error/20';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'compliant': return 'text-success bg-success/10';
      case 'minor-issues': return 'text-warning bg-warning/10';
      case 'needs-attention': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-error bg-error/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'low': return 'text-accent bg-accent/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="bg-card rounded-lg border border-border security-shadow-md">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="FileCheck" size={20} className="text-success" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-card-foreground">Compliance Score</h3>
              <p className="text-sm text-muted-foreground">Regulatory compliance status</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" iconName="ExternalLink" iconPosition="right">
            View Reports
          </Button>
        </div>
      </div>
      <div className="p-6">
        {/* Overall Score */}
        <div className="text-center mb-6">
          <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full border-4 ${getScoreBgColor(complianceData?.overallScore)}`}>
            <span className={`text-3xl font-bold ${getScoreColor(complianceData?.overallScore)}`}>
              {complianceData?.overallScore}%
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-2">Overall Compliance Score</p>
        </div>

        {/* Framework Scores */}
        <div className="space-y-4 mb-6">
          {complianceData?.frameworks?.map((framework, index) => (
            <div key={index} className="p-4 bg-muted/20 rounded-lg border border-border/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="Shield" size={14} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-card-foreground">{framework?.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(framework?.status)}`}>
                      {framework?.status?.replace('-', ' ')}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-xl font-bold ${getScoreColor(framework?.score)}`}>
                    {framework?.score}%
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Controls</p>
                  <p className="font-medium text-card-foreground">
                    {framework?.controls?.passed}/{framework?.controls?.total}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Failed</p>
                  <p className="font-medium text-error">{framework?.controls?.failed}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Last Audit</p>
                  <p className="font-medium text-card-foreground">{formatDate(framework?.lastAudit)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Next Audit</p>
                  <p className="font-medium text-card-foreground">{formatDate(framework?.nextAudit)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Findings */}
        <div>
          <h4 className="font-semibold text-card-foreground mb-4">Recent Findings</h4>
          <div className="space-y-3">
            {recentFindings?.map((finding) => {
              const daysUntilDue = getDaysUntilDue(finding?.dueDate);
              return (
                <div key={finding?.id} className="p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-security border border-border/50">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-warning/10 rounded-full flex items-center justify-center">
                        <Icon name="AlertTriangle" size={14} className="text-warning" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <p className="font-medium text-sm text-card-foreground">{finding?.framework}</p>
                          <span className="text-xs text-muted-foreground">({finding?.control})</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(finding?.severity)}`}>
                            {finding?.severity}
                          </span>
                        </div>
                        <p className="text-sm text-card-foreground mb-2">{finding?.finding}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>Assignee: {finding?.assignee}</span>
                          <span className={daysUntilDue <= 7 ? 'text-error font-medium' : ''}>
                            Due: {formatDate(finding?.dueDate)} ({daysUntilDue} days)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end space-x-2 ml-11">
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      Update Status
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceScoreWidget;