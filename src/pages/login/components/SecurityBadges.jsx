import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const badges = [
    {
      id: 1,
      name: 'ISO 27001',
      description: 'Information Security Management',
      icon: 'Shield',
      verified: true
    },
    {
      id: 2,
      name: 'SOC 2 Type II',
      description: 'Security & Availability',
      icon: 'CheckCircle',
      verified: true
    },
    {
      id: 3,
      name: 'GDPR Compliant',
      description: 'Data Protection Regulation',
      icon: 'Lock',
      verified: true
    },
    {
      id: 4,
      name: 'CISSP Certified',
      description: 'Certified Information Systems Security Professional',
      icon: 'Award',
      verified: true
    }
  ];

  return (
    <div className="mt-8 pt-6 border-t border-border">
      <div className="text-center mb-4">
        <h3 className="text-sm font-medium text-text-primary mb-1">
          Enterprise Security Certifications
        </h3>
        <p className="text-xs text-muted-foreground">
          Trusted by security professionals worldwide
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {badges?.map((badge) => (
          <div
            key={badge?.id}
            className="flex items-center space-x-2 p-2 bg-muted/50 rounded-lg border border-border/50"
          >
            <div className="flex items-center justify-center w-6 h-6 bg-success/10 rounded-full">
              <Icon name={badge?.icon} size={12} className="text-success" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-1">
                <p className="text-xs font-medium text-text-primary truncate">
                  {badge?.name}
                </p>
                {badge?.verified && (
                  <Icon name="CheckCircle" size={10} className="text-success flex-shrink-0" />
                )}
              </div>
              <p className="text-xs text-muted-foreground truncate">
                {badge?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date()?.getFullYear()} SecureGuard Pro. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default SecurityBadges;