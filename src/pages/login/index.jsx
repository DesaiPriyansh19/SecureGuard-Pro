import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import SecurityBadges from './components/SecurityBadges';
import SecurityBackground from './components/SecurityBackground';
import LoginAlerts from './components/LoginAlerts';

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [sessionTimeout, setSessionTimeout] = useState(null);

  // Mock credentials for demonstration
  const mockCredentials = {
    admin: { email: 'admin@secureguard.com', password: 'SecureAdmin123!' },
    analyst: { email: 'analyst@secureguard.com', password: 'AnalystSecure456!' },
    manager: { email: 'manager@secureguard.com', password: 'ManagerSafe789!' }
  };

  useEffect(() => {
    // Check for session timeout message
    const urlParams = new URLSearchParams(window.location.search);
    const timeout = urlParams?.get('timeout');
    
    if (timeout === 'true') {
      setAlert({
        type: 'warning',
        title: 'Session Expired',
        message: 'Your session has expired for security reasons. Please sign in again.',
        details: 'Sessions automatically expire after 30 minutes of inactivity.'
      });
    }

    // Clear any existing session data
    localStorage.removeItem('secureGuardToken');
    localStorage.removeItem('userRole');
  }, []);

  const handleLogin = async (formData) => {
    setIsLoading(true);
    setAlert(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Validate credentials
      const isValidCredential = Object.values(mockCredentials)?.some(
        cred => cred?.email === formData?.email && cred?.password === formData?.password
      );

      if (!isValidCredential) {
        throw new Error('Invalid credentials');
      }

      // Determine user role based on email
      let userRole = 'analyst';
      if (formData?.email?.includes('admin')) userRole = 'admin';
      else if (formData?.email?.includes('manager')) userRole = 'manager';

      // Simulate successful login
      const mockToken = `secure_token_${Date.now()}_${Math.random()?.toString(36)?.substr(2, 9)}`;
      
      // Store session data
      localStorage.setItem('secureGuardToken', mockToken);
      localStorage.setItem('userRole', userRole);
      localStorage.setItem('loginTime', new Date()?.toISOString());
      
      if (formData?.rememberMe) {
        localStorage.setItem('rememberUser', formData?.email);
      }

      // Show success message briefly
      setAlert({
        type: 'success',
        title: 'Authentication Successful',
        message: 'Welcome to SecureGuard Pro. Redirecting to your dashboard...',
        details: `Logged in as ${userRole} at ${new Date()?.toLocaleTimeString()}`
      });

      // Redirect to dashboard after brief delay
      setTimeout(() => {
        navigate('/security-dashboard', { replace: true });
      }, 1500);

    } catch (error) {
      setAlert({
        type: 'error',
        title: 'Authentication Failed',
        message: 'Invalid email or password. Please check your credentials and try again.',
        details: 'Use admin@secureguard.com / SecureAdmin123! or analyst@secureguard.com / AnalystSecure456!'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const dismissAlert = () => {
    setAlert(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <SecurityBackground />
      
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-2xl security-shadow-xl p-8 relative">
          {/* Security indicator */}
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <div className="bg-success text-success-foreground px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
              <div className="w-2 h-2 bg-success-foreground rounded-full animate-pulse"></div>
              <span>Secure Connection</span>
            </div>
          </div>

          <LoginHeader />
          
          <LoginAlerts alert={alert} onDismiss={dismissAlert} />
          
          <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
          
          <SecurityBadges />
        </div>

        {/* Additional security info */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>SSL Encrypted</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>SOC 2 Compliant</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>24/7 Monitoring</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;