import { useState, useEffect } from 'react';

const LiveChart = () => {
  const [growth, setGrowth] = useState(127);
  const [payouts, setPayouts] = useState(2.4);
  const [activeUsers, setActiveUsers] = useState(1247);

  useEffect(() => {
    const interval = setInterval(() => {
      setGrowth(prev => prev + (Math.random() - 0.5) * 2);
      setPayouts(prev => prev + (Math.random() - 0.3) * 0.1);
      setActiveUsers(prev => prev + Math.floor((Math.random() - 0.5) * 10));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <h3 className="text-xl font-bold text-white mb-4">Live Investment Growth</h3>
      <div className="relative h-80">
        <svg className="w-full h-full" viewBox="0 0 400 300">
          <defs>
            <pattern id="grid" width="40" height="30" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 30" fill="none" stroke="#374151" strokeWidth="1"/>
            </pattern>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.05"/>
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05"/>
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* First animated line (Green) */}
          <polyline
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
            points="20,250 60,220 100,180 140,160 180,120 220,100 260,80 300,60 340,40 380,20"
          >
            <animate attributeName="points" 
              values="20,250 60,220 100,180 140,160 180,120 220,100 260,80 300,60 340,40 380,20;
                      20,245 60,215 100,175 140,155 180,115 220,95 260,75 300,55 340,35 380,15;
                      20,255 60,225 100,185 140,165 180,125 220,105 260,85 300,65 340,45 380,25;
                      20,250 60,220 100,180 140,160 180,120 220,100 260,80 300,60 340,40 380,20" 
              dur="4s" 
              repeatCount="indefinite"/>
          </polyline>
          
          {/* Second animated line (Blue) */}
          <polyline
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            points="20,200 60,190 100,170 140,150 180,140 220,130 260,110 300,90 340,70 380,50"
          >
            <animate attributeName="points" 
              values="20,200 60,190 100,170 140,150 180,140 220,130 260,110 300,90 340,70 380,50;
                      20,210 60,195 100,175 140,155 180,145 220,135 260,115 300,95 340,75 380,55;
                      20,195 60,185 100,165 140,145 180,135 220,125 260,105 300,85 340,65 380,45;
                      20,205 60,200 100,180 140,160 180,150 220,140 260,120 300,100 340,80 380,60;
                      20,200 60,190 100,170 140,150 180,140 220,130 260,110 300,90 340,70 380,50" 
              dur="3.5s" 
              repeatCount="indefinite"/>
          </polyline>
          
          {/* Third animated line (Purple) */}
          <polyline
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="2"
            points="20,230 60,210 100,200 140,180 180,170 220,160 260,140 300,120 340,100 380,80"
          >
            <animate attributeName="points" 
              values="20,230 60,210 100,200 140,180 180,170 220,160 260,140 300,120 340,100 380,80;
                      20,235 60,215 100,205 140,185 180,175 220,165 260,145 300,125 340,105 380,85;
                      20,225 60,205 100,195 140,175 180,165 220,155 260,135 300,115 340,95 380,75;
                      20,240 60,220 100,210 140,190 180,180 220,170 260,150 300,130 340,110 380,90;
                      20,230 60,210 100,200 140,180 180,170 220,160 260,140 300,120 340,100 380,80" 
              dur="5s" 
              repeatCount="indefinite"/>
          </polyline>
          
          {/* Animated data points */}
          <circle cx="380" cy="20" r="4" fill="#10b981" className="animate-pulse" />
          <circle cx="380" cy="50" r="3" fill="#3b82f6" className="animate-pulse" />
          <circle cx="380" cy="80" r="3" fill="#8b5cf6" className="animate-pulse" />
        </svg>
        
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-400 px-2">
          <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span>
        </div>
        
        <div className="absolute top-0 left-0 bottom-0 flex flex-col justify-between text-xs text-gray-400 py-2">
          <span>100K</span><span>75K</span><span>50K</span><span>25K</span><span>0</span>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="text-center">
          <div className="text-xl font-bold text-green-400">+{growth.toFixed(1)}%</div>
          <div className="text-xs text-gray-400">Growth Rate</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-blue-400">KES {payouts.toFixed(1)}M</div>
          <div className="text-xs text-gray-400">Total Payouts</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-purple-400">{activeUsers}</div>
          <div className="text-xs text-gray-400">Active Users</div>
        </div>
      </div>
      
      <div className="flex items-center justify-center mt-4 space-x-4">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-ping mr-1"></div>
          <span className="text-xs text-green-400">Portfolio A</span>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping mr-1"></div>
          <span className="text-xs text-blue-400">Portfolio B</span>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-ping mr-1"></div>
          <span className="text-xs text-purple-400">Portfolio C</span>
        </div>
      </div>
    </div>
  );
};

export default LiveChart;