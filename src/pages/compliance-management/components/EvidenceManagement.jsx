import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const EvidenceManagement = ({ evidence, onUploadEvidence, onViewEvidence, onDeleteEvidence }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'document', label: 'Documents' },
    { value: 'screenshot', label: 'Screenshots' },
    { value: 'report', label: 'Reports' },
    { value: 'certificate', label: 'Certificates' },
    { value: 'policy', label: 'Policies' },
    { value: 'procedure', label: 'Procedures' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'approved', label: 'Approved' },
    { value: 'pending', label: 'Pending Review' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'expired', label: 'Expired' }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'document': return 'FileText';
      case 'screenshot': return 'Image';
      case 'report': return 'BarChart3';
      case 'certificate': return 'Award';
      case 'policy': return 'Shield';
      case 'procedure': return 'List';
      default: return 'File';
    }
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'approved':
        return { color: 'text-success', bg: 'bg-success/10', icon: 'CheckCircle' };
      case 'pending':
        return { color: 'text-warning', bg: 'bg-warning/10', icon: 'Clock' };
      case 'rejected':
        return { color: 'text-error', bg: 'bg-error/10', icon: 'XCircle' };
      case 'expired':
        return { color: 'text-muted-foreground', bg: 'bg-muted/10', icon: 'AlertTriangle' };
      default:
        return { color: 'text-muted-foreground', bg: 'bg-muted/10', icon: 'Circle' };
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const filteredEvidence = evidence?.filter(item => {
    const matchesSearch = item?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         item?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         item?.controlId?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesType = typeFilter === 'all' || item?.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || item?.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="bg-card rounded-lg security-shadow-sm border border-border">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Evidence Management</h3>
            <p className="text-sm text-muted-foreground">Upload and manage compliance evidence</p>
          </div>
          <Button
            variant="default"
            iconName="Upload"
            iconPosition="left"
            onClick={onUploadEvidence}
          >
            Upload Evidence
          </Button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            type="search"
            placeholder="Search evidence..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="col-span-1 md:col-span-2"
          />
          <Select
            placeholder="Filter by type"
            options={typeOptions}
            value={typeFilter}
            onChange={setTypeFilter}
          />
          <Select
            placeholder="Filter by status"
            options={statusOptions}
            value={statusFilter}
            onChange={setStatusFilter}
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          <div className="p-3 bg-muted/30 rounded-lg">
            <div className="text-sm text-muted-foreground">Total Evidence</div>
            <div className="text-lg font-semibold text-card-foreground">{evidence?.length}</div>
          </div>
          <div className="p-3 bg-success/10 rounded-lg">
            <div className="text-sm text-muted-foreground">Approved</div>
            <div className="text-lg font-semibold text-success">
              {evidence?.filter(e => e?.status === 'approved')?.length}
            </div>
          </div>
          <div className="p-3 bg-warning/10 rounded-lg">
            <div className="text-sm text-muted-foreground">Pending</div>
            <div className="text-lg font-semibold text-warning">
              {evidence?.filter(e => e?.status === 'pending')?.length}
            </div>
          </div>
          <div className="p-3 bg-error/10 rounded-lg">
            <div className="text-sm text-muted-foreground">Expired</div>
            <div className="text-lg font-semibold text-error">
              {evidence?.filter(e => e?.status === 'expired')?.length}
            </div>
          </div>
        </div>
      </div>
      {/* Evidence Grid */}
      <div className="p-6">
        {filteredEvidence?.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredEvidence?.map((item) => {
              const statusConfig = getStatusConfig(item?.status);
              return (
                <div
                  key={item?.id}
                  className="p-4 border border-border rounded-lg hover:border-primary/50 transition-security cursor-pointer"
                  onClick={() => onViewEvidence(item?.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-muted/50 rounded-lg flex items-center justify-center">
                        <Icon name={getTypeIcon(item?.type)} size={20} className="text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-card-foreground truncate">{item?.name}</h4>
                        <p className="text-xs text-muted-foreground">Control: {item?.controlId}</p>
                      </div>
                    </div>
                    <div className={`p-1 rounded-full ${statusConfig?.bg}`}>
                      <Icon name={statusConfig?.icon} size={12} className={statusConfig?.color} />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item?.description}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span>{formatFileSize(item?.size)}</span>
                    <span>{formatDate(item?.uploadDate)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Icon name="User" size={12} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{item?.uploadedBy}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        iconName="Eye"
                        onClick={(e) => {
                          e?.stopPropagation();
                          onViewEvidence(item?.id);
                        }}
                        className="h-6 w-6"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        iconName="Download"
                        className="h-6 w-6"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        iconName="Trash2"
                        onClick={(e) => {
                          e?.stopPropagation();
                          onDeleteEvidence(item?.id);
                        }}
                        className="h-6 w-6 text-error hover:text-error"
                      />
                    </div>
                  </div>
                  {item?.expiryDate && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <div className="flex items-center space-x-1 text-xs">
                        <Icon name="Calendar" size={12} className="text-muted-foreground" />
                        <span className="text-muted-foreground">
                          Expires: {formatDate(item?.expiryDate)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">No evidence found</p>
            <Button
              variant="outline"
              iconName="Upload"
              iconPosition="left"
              onClick={onUploadEvidence}
            >
              Upload First Evidence
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EvidenceManagement;