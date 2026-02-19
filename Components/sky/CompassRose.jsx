import React from 'react';

export default function CompassRose() {
  const directions = [
    { angle: 0, label: 'N', color: 'text-red-400' },
    { angle: 45, label: 'NE', color: 'text-blue-300' },
    { angle: 90, label: 'E', color: 'text-green-400' },
    { angle: 135, label: 'SE', color: 'text-blue-300' },
    { angle: 180, label: 'S', color: 'text-yellow-400' },
    { angle: 225, label: 'SW', color: 'text-blue-300' },
    { angle: 270, label: 'W', color: 'text-purple-400' },
    { angle: 315, label: 'NW', color: 'text-blue-300' }
  ];

  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="relative w-full h-full">
        {directions.map((dir) => {
          const radians = (dir.angle - 90) * (Math.PI / 180);
          const radius = 45;
          const x = 50 + radius * Math.cos(radians);
          const y = 50 + radius * Math.sin(radians);

          return (
            <div
              key={dir.label}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${x}%`,
                top: `${y}%`
              }}
            >
              <div className={`text-center ${dir.color}`}>
                <div className="text-xl font-bold mb-1">{dir.label}</div>
                <div className="text-xs opacity-70">{dir.angle}°</div>
              </div>
            </div>
          );
        })}
        
        {/* Center crosshair */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 border-2 border-white/30 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}