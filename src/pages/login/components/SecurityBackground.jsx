import React from 'react';

const SecurityBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100"></div>
      
      {/* Animated security grid pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(30, 58, 138, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(30, 58, 138, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      {/* Floating security elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top left shield */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary/5 rounded-full blur-xl animate-pulse"></div>
        
        {/* Top right lock */}
        <div className="absolute top-32 right-32 w-24 h-24 bg-accent/5 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Bottom left key */}
        <div className="absolute bottom-40 left-40 w-28 h-28 bg-success/5 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Bottom right security */}
        <div className="absolute bottom-20 right-20 w-36 h-36 bg-secondary/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        
        {/* Center elements */}
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-warning/5 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-error/5 rounded-full blur-md animate-pulse" style={{ animationDelay: '2.5s' }}></div>
      </div>
      
      {/* Subtle overlay for better text contrast */}
      <div className="absolute inset-0 bg-white/20"></div>
    </div>
  );
};

export default SecurityBackground;