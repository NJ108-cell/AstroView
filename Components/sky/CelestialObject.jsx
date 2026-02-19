import React from 'react';
import { motion } from 'framer-motion';

export default function CelestialObject({ 
  name, 
  type, 
  azimuth, 
  altitude, 
  onClick,
  size = 'medium' 
}) {
  const getObjectStyle = () => {
    const baseStyles = {
      sun: 'bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500 shadow-2xl shadow-orange-500/50',
      moon: 'bg-gradient-to-br from-gray-200 to-gray-400 shadow-xl shadow-gray-300/30',
      planet: 'bg-gradient-to-br from-blue-400 to-purple-500 shadow-lg shadow-blue-400/50',
      star: 'bg-white shadow-lg shadow-white/50',
      satellite: 'bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg shadow-cyan-400/50',
      deep_sky: 'bg-gradient-to-br from-purple-400/30 to-pink-500/30 shadow-lg shadow-purple-400/20'
    };

    const sizes = {
      small: 'w-2 h-2',
      medium: 'w-4 h-4',
      large: 'w-8 h-8',
      xlarge: 'w-12 h-12'
    };

    return `${baseStyles[type] || baseStyles.star} ${sizes[size]}`;
  };

  // Convert altitude and azimuth to x,y coordinates
  // Altitude: 0° (horizon) to 90° (zenith) maps to radius
  // Azimuth: 0° (North) to 360° maps to angle
  const getPosition = () => {
    const centerX = 50;
    const centerY = 50;
    const maxRadius = 45; // percentage
    
    // Convert altitude to radius (90° = center, 0° = edge)
    const radius = maxRadius * (1 - altitude / 90);
    
    // Convert azimuth to radians (0° = top/North)
    const angleRad = (azimuth - 90) * (Math.PI / 180);
    
    const x = centerX + radius * Math.cos(angleRad);
    const y = centerY + radius * Math.sin(angleRad);
    
    return { x, y };
  };

  const { x, y } = getPosition();

  // Don't render if below horizon
  if (altitude < 0) return null;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.5 }}
      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
      style={{
        left: `${x}%`,
        top: `${y}%`
      }}
      onClick={() => onClick && onClick({ name, type, azimuth, altitude })}
    >
      <div className={`${getObjectStyle()} rounded-full transition-all duration-300`}>
        {type === 'sun' && (
          <div className="absolute inset-0 rounded-full animate-pulse bg-yellow-300/20 scale-150"></div>
        )}
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        whileHover={{ opacity: 1, y: -10 }}
        className="absolute left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-black/80 backdrop-blur-sm rounded text-xs text-white whitespace-nowrap pointer-events-none"
      >
        {name}
      </motion.div>
    </motion.div>
  );
}