import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import CompassRose from './CompassRose';
import CelestialObject from './CelestialObject';
import { calculateSunPosition, calculatePlanetPositions, getBrightStars, getSatellites } from '../utils/AstronomyCalculations';

export default function SkyCanvas({ location, onObjectClick }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [celestialObjects, setCelestialObjects] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!location) return;

    const sun = calculateSunPosition(location.latitude, location.longitude, currentTime);
    const planets = calculatePlanetPositions(location.latitude, location.longitude, currentTime);
    const stars = getBrightStars(location.latitude, location.longitude, currentTime);
    const satellites = getSatellites(location.latitude, location.longitude, currentTime);

    const allObjects = [
      { ...sun, type: 'sun', size: 'xlarge' },
      ...planets.map(p => ({ ...p, type: 'planet', size: 'large' })),
      ...stars.map(s => ({ ...s, type: 'star', size: 'medium' })),
      ...satellites.map(s => ({ ...s, type: 'satellite', size: 'small' }))
    ];

    setCelestialObjects(allObjects);
  }, [location, currentTime]);

  const isNightTime = () => {
    const sunObj = celestialObjects.find(obj => obj.type === 'sun');
    return sunObj ? sunObj.altitude < 0 : false;
  };

  const getBackgroundGradient = () => {
    const sunObj = celestialObjects.find(obj => obj.type === 'sun');
    if (!sunObj) return 'from-indigo-950 via-purple-950 to-slate-950';

    if (sunObj.altitude > 20) {
      return 'from-blue-400 via-cyan-300 to-blue-500';
    } else if (sunObj.altitude > 0) {
      return 'from-orange-400 via-pink-500 to-purple-700';
    } else if (sunObj.altitude > -10) {
      return 'from-indigo-800 via-purple-900 to-slate-900';
    } else {
      return 'from-indigo-950 via-purple-950 to-slate-950';
    }
  };

  return (
    <Card className="relative overflow-hidden border-white/20 shadow-2xl">
      <div 
        className={`relative w-full aspect-square bg-gradient-to-br ${getBackgroundGradient()} transition-colors duration-1000`}
        style={{
          backgroundImage: isNightTime() 
            ? `radial-gradient(2px 2px at 20% 30%, white, transparent),
               radial-gradient(2px 2px at 60% 70%, white, transparent),
               radial-gradient(1px 1px at 50% 50%, white, transparent),
               radial-gradient(1px 1px at 80% 10%, white, transparent),
               radial-gradient(2px 2px at 90% 60%, white, transparent),
               radial-gradient(1px 1px at 33% 50%, white, transparent),
               radial-gradient(2px 2px at 15% 80%, white, transparent)`
            : 'none',
          backgroundSize: isNightTime() ? '200% 200%' : 'auto',
          backgroundPosition: isNightTime() ? '50% 50%' : 'center'
        }}
      >
        <CompassRose />
        
        {celestialObjects.map((obj, index) => (
          <CelestialObject
            key={`${obj.name}-${index}`}
            name={obj.name}
            type={obj.type}
            azimuth={obj.azimuth}
            altitude={obj.altitude}
            size={obj.size}
            onClick={onObjectClick}
          />
        ))}

        {/* Horizon line */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="w-full h-full">
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              fill="none"
              stroke="white"
              strokeWidth="1"
              strokeOpacity="0.3"
              strokeDasharray="5,5"
            />
          </svg>
        </div>
      </div>
    </Card>
  );
}