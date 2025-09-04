import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl security-shadow-md">
            <Icon name="Shield" size={28} color="white" />
          </div>
          <div className="text-left">
            <h1 className="text-2xl font-bold text-primary">SecureGuard</h1>
            <span className="text-sm text-muted-foreground font-medium">Pro</span>
          </div>
        </div>
      </div>
      
      {/* Welcome Message */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-text-primary">
          Welcome Back
        </h2>
        <p className="text-muted-foreground">
          Sign in to your enterprise security dashboard
        </p>
      </div>
      
      {/* Security Status Indicator */}
      <div className="mt-4 inline-flex items-center space-x-2 px-3 py-1.5 bg-success/10 border border-success/20 rounded-full">
        <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
        <span className="text-xs font-medium text-success">
          All Systems Secure
        </span>
      </div>
    </div>
  );
};

export default LoginHeader;