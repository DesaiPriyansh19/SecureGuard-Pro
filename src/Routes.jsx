import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ComplianceManagement from './pages/compliance-management';
import IncidentResponse from './pages/incident-response';
import Login from './pages/login';
import ThreatMonitoring from './pages/threat-monitoring';
import VulnerabilityManagement from './pages/vulnerability-management';
import SecurityDashboard from './pages/security-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<ComplianceManagement />} />
        <Route path="/compliance-management" element={<ComplianceManagement />} />
        <Route path="/incident-response" element={<IncidentResponse />} />
        <Route path="/login" element={<Login />} />
        <Route path="/threat-monitoring" element={<ThreatMonitoring />} />
        <Route path="/vulnerability-management" element={<VulnerabilityManagement />} />
        <Route path="/security-dashboard" element={<SecurityDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
