import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import SecurityAlertBanner from '../../components/ui/SecurityAlertBanner';
import ThreatSidebar from './components/ThreatSidebar';
import ThreatFeed from './components/ThreatFeed';
import ThreatIntelligence from './components/ThreatIntelligence';

const ThreatMonitoring = () => {
  const [filters, setFilters] = useState({
    severity: [],
    category: [],
    timeRange: ['last_24h'],
    status: []
  });
  const [selectedThreat, setSelectedThreat] = useState(null);
  const [isRealTimeEnabled, setIsRealTimeEnabled] = useState(true);

  // Simulate real-time updates
  useEffect(() => {
    if (!isRealTimeEnabled) return;

    const interval = setInterval(() => {
      // Simulate new threat detection
      console.log('Real-time threat update received');
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [isRealTimeEnabled]);

  const handleFilterChange = (filterType, filterId) => {
    if (filterType === 'clear_all') {
      setFilters({
        severity: [],
        category: [],
        timeRange: ['last_24h'],
        status: []
      });
      return;
    }

    setFilters(prev => {
      const currentFilters = prev?.[filterType] || [];
      
      if (filterType === 'timeRange') {
        // Only one time range can be selected
        return { ...prev, [filterType]: [filterId] };
      }
      
      // Toggle filter for other types
      const isActive = currentFilters?.includes(filterId);
      const newFilters = isActive
        ? currentFilters?.filter(id => id !== filterId)
        : [...currentFilters, filterId];
      
      return { ...prev, [filterType]: newFilters };
    });
  };

  const handleThreatSelect = (threat) => {
    setSelectedThreat(threat);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SecurityAlertBanner />
      
      <div className="pt-16">
        <div className="flex h-screen">
          {/* Left Sidebar - Filters */}
          <div className="w-80 flex-shrink-0">
            <ThreatSidebar 
              onFilterChange={handleFilterChange}
              activeFilters={filters}
            />
          </div>

          {/* Main Content - Threat Feed */}
          <div className="flex-1 min-w-0">
            <ThreatFeed 
              filters={filters}
              onThreatSelect={handleThreatSelect}
              selectedThreat={selectedThreat}
            />
          </div>

          {/* Right Panel - Threat Intelligence */}
          <div className="w-96 flex-shrink-0">
            <ThreatIntelligence 
              selectedThreat={selectedThreat}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreatMonitoring;