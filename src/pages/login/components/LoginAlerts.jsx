import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginAlerts = ({ alert, onDismiss }) => {
  if (!alert) return null;

  const getAlertConfig = (type) => {
    switch (type) {
      case 'error':
        return {
          bgColor: 'bg-error/10',
          borderColor: 'border-error/20',
          textColor: 'text-error',
          icon: 'AlertCircle'
        };
      case 'warning':
        return {
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning/20',
          textColor: 'text-warning',
          icon: 'AlertTriangle'
        };
      case 'success':
        return {
          bgColor: 'bg-success/10',
          borderColor: 'border-success/20',
          textColor: 'text-success',
          icon: 'CheckCircle'
        };
      default:
        return {
          bgColor: 'bg-accent/10',
          borderColor: 'border-accent/20',
          textColor: 'text-accent',
          icon: 'Info'
        };
    }
  };

  const config = getAlertConfig(alert?.type);

  return (
    <div className={`mb-6 p-4 rounded-lg border ${config?.bgColor} ${config?.borderColor}`}>
      <div className="flex items-start space-x-3">
        <Icon name={config?.icon} size={20} className={`${config?.textColor} flex-shrink-0 mt-0.5`} />
        <div className="flex-1 min-w-0">
          <h4 className={`font-medium text-sm ${config?.textColor} mb-1`}>
            {alert?.title}
          </h4>
          <p className="text-sm text-text-secondary">
            {alert?.message}
          </p>
          {alert?.details && (
            <div className="mt-2 text-xs text-muted-foreground">
              {alert?.details}
            </div>
          )}
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className={`${config?.textColor} hover:opacity-70 transition-security flex-shrink-0`}
          >
            <Icon name="X" size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default LoginAlerts;