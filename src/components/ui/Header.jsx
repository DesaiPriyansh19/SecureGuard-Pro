import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  const navigationItems = [
    { label: 'Dashboard', path: '/security-dashboard', icon: 'Shield' },
    { label: 'Threats', path: '/threat-monitoring', icon: 'AlertTriangle' },
    { label: 'Vulnerabilities', path: '/vulnerability-management', icon: 'Bug' },
    { label: 'Incidents', path: '/incident-response', icon: 'Siren' },
    { label: 'Compliance', path: '/compliance-management', icon: 'FileCheck' }
  ];

  const notifications = [
    { id: 1, type: 'critical', title: 'Critical Threat Detected', message: 'Suspicious activity on server cluster 3', time: '2 min ago', category: 'threat' },
    { id: 2, type: 'warning', title: 'Vulnerability Scan Complete', message: '15 medium-risk vulnerabilities found', time: '15 min ago', category: 'vulnerability' },
    { id: 3, type: 'info', title: 'Compliance Report Ready', message: 'Monthly SOC 2 report generated', time: '1 hour ago', category: 'compliance' }
  ];

  const quickActions = [
    { label: 'Create Incident', icon: 'Plus', action: () => console.log('Create incident') },
    { label: 'Block IP', icon: 'Shield', action: () => console.log('Block IP') },
    { label: 'Generate Report', icon: 'FileText', action: () => console.log('Generate report') }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef?.current && !profileRef?.current?.contains(event?.target)) {
        setIsProfileOpen(false);
      }
      if (notificationRef?.current && !notificationRef?.current?.contains(event?.target)) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'critical': return 'AlertCircle';
      case 'warning': return 'AlertTriangle';
      case 'info': return 'Info';
      default: return 'Bell';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'critical': return 'text-error';
      case 'warning': return 'text-warning';
      case 'info': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  const currentPath = window.location?.pathname;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-16 bg-surface border-b border-border z-navigation">
        <div className="flex items-center justify-between h-full px-6">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <Icon name="Shield" size={20} color="white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-primary">SecureGuard</span>
              <span className="text-xs text-muted-foreground -mt-1">Pro</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <a
                key={item?.path}
                href={item?.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-security ${
                  currentPath === item?.path
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </a>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Quick Actions - Desktop Only */}
            <div className="hidden lg:flex items-center space-x-2">
              {quickActions?.map((action, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  iconName={action?.icon}
                  iconSize={16}
                  onClick={action?.action}
                  className="text-text-secondary hover:text-text-primary"
                >
                  {action?.label}
                </Button>
              ))}
            </div>

            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative"
              >
                <Icon name="Bell" size={20} />
                {notifications?.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center">
                    {notifications?.length}
                  </span>
                )}
              </Button>

              {/* Notification Dropdown */}
              {isNotificationOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-popover border border-border rounded-lg security-shadow-lg z-dropdown">
                  <div className="p-4 border-b border-border">
                    <h3 className="font-semibold text-popover-foreground">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications?.map((notification) => (
                      <div key={notification?.id} className="p-4 border-b border-border last:border-b-0 hover:bg-muted transition-security">
                        <div className="flex items-start space-x-3">
                          <Icon 
                            name={getNotificationIcon(notification?.type)} 
                            size={16} 
                            className={getNotificationColor(notification?.type)}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-popover-foreground">{notification?.title}</p>
                            <p className="text-sm text-muted-foreground mt-1">{notification?.message}</p>
                            <p className="text-xs text-muted-foreground mt-2">{notification?.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-border">
                    <Button variant="ghost" size="sm" className="w-full">
                      View All Notifications
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="relative" ref={profileRef}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2"
              >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="white" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-text-primary">John Smith</p>
                  <p className="text-xs text-muted-foreground">Security Admin</p>
                </div>
                <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
              </Button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-popover border border-border rounded-lg security-shadow-lg z-dropdown">
                  <div className="p-4 border-b border-border">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <Icon name="User" size={20} color="white" />
                      </div>
                      <div>
                        <p className="font-medium text-popover-foreground">John Smith</p>
                        <p className="text-sm text-muted-foreground">Security Administrator</p>
                        <p className="text-xs text-muted-foreground">Last login: Today, 9:15 AM</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <Button variant="ghost" size="sm" className="w-full justify-start" iconName="User" iconPosition="left">
                      Profile Settings
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start" iconName="Settings" iconPosition="left">
                      Preferences
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start" iconName="Shield" iconPosition="left">
                      Security Settings
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start" iconName="HelpCircle" iconPosition="left">
                      Help & Support
                    </Button>
                  </div>
                  <div className="p-2 border-t border-border">
                    <Button variant="ghost" size="sm" className="w-full justify-start text-error hover:text-error" iconName="LogOut" iconPosition="left">
                      Sign Out
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </Button>
          </div>
        </div>
      </header>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-modal lg:hidden">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed left-0 top-16 bottom-0 w-80 bg-surface border-r border-border animate-slide-in">
            <div className="p-6">
              <nav className="space-y-2">
                {navigationItems?.map((item) => (
                  <a
                    key={item?.path}
                    href={item?.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-security ${
                      currentPath === item?.path
                        ? 'bg-primary text-primary-foreground'
                        : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon name={item?.icon} size={20} />
                    <span>{item?.label}</span>
                  </a>
                ))}
              </nav>

              <div className="mt-8 pt-6 border-t border-border">
                <h3 className="text-sm font-semibold text-text-primary mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  {quickActions?.map((action, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      iconName={action?.icon}
                      iconPosition="left"
                      onClick={action?.action}
                      className="w-full justify-start"
                    >
                      {action?.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;