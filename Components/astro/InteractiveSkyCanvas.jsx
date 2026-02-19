
import React, { useRef, useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { calculateCelestialObjects } from '../utils/AstronomyCalculations';

export default function InteractiveSkyCanvas({ location, onObjectClick }) {
  const canvasRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [viewAzimuth, setViewAzimuth] = useState(0);
  const [celestialObjects, setCelestialObjects] = useState([]);
  const [hoveredObject, setHoveredObject] = useState(null);

  useEffect(() => {
    if (!location) return;

    const updateObjects = () => {
      const objects = calculateCelestialObjects(
        location.latitude,
        location.longitude,
        new Date()
      );
      setCelestialObjects(objects);
    };

    updateObjects();
    const interval = setInterval(updateObjects, 60000);
    return () => clearInterval(interval);
  }, [location]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 20;

    ctx.clearRect(0, 0, width, height);

    // Background gradient
    const sunObject = celestialObjects.find(obj => obj.name === 'Sun');
    const isNight = sunObject ? sunObject.altitude < 0 : false;

    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    if (isNight) {
      gradient.addColorStop(0, '#26110e');
      gradient.addColorStop(0.5, '#1a0d1f');
      gradient.addColorStop(1, '#0d0a1f');
    } else {
      gradient.addColorStop(0, '#8cbdf8');
      gradient.addColorStop(1, '#6e55d7');
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Stars
    if (isNight) {
      for (let i = 0; i < 150; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = Math.random() * 2;
        ctx.fillStyle = '#fffff4';
        ctx.globalAlpha = Math.random() * 0.8 + 0.2;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    // Horizon circle
    ctx.strokeStyle = 'rgba(141, 124, 238, 0.3)';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Compass directions
    const directions = [
      { angle: 0, label: 'N', color: '#ac3af2' },
      { angle: 90, label: 'E', color: '#8cbdf8' },
      { angle: 180, label: 'S', color: '#8d7cee' },
      { angle: 270, label: 'W', color: '#6e55d7' }
    ];

    directions.forEach(dir => {
      const adjustedAngle = (dir.angle - viewAzimuth) * Math.PI / 180;
      const x = centerX + radius * Math.sin(adjustedAngle);
      const y = centerY - radius * Math.cos(adjustedAngle);

      ctx.fillStyle = dir.color;
      ctx.font = 'bold 20px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(dir.label, x, y);

      ctx.fillStyle = 'rgba(255, 255, 244, 0.5)';
      ctx.font = '12px Arial';
      ctx.fillText(`${dir.angle}°`, x, y + 20);
    });

    // Celestial objects
    celestialObjects.forEach(obj => {
      if (obj.altitude < 0) return;

      const altitudeRadius = radius * (1 - obj.altitude / 90);
      const adjustedAzimuth = (obj.azimuth - viewAzimuth) * Math.PI / 180;
      const x = centerX + altitudeRadius * Math.sin(adjustedAzimuth);
      const y = centerY - altitudeRadius * Math.cos(adjustedAzimuth);

      const colors = {
        sun: '#fffff4',
        moon: '#8cbdf8',
        Mercury: '#8cbdf8',
        Venus: '#fffff4',
        Mars: '#ac3af2',
        Jupiter: '#8d7cee',
        Saturn: '#6e55d7',
        star: '#fffff4',
        satellite: '#8cbdf8',
        deep_sky: 'rgba(141, 124, 238, 0.4)'
      };

      const sizes = {
        sun: 16,
        moon: 14,
        planet: 8,
        star: 4,
        satellite: 6,
        deep_sky: 10
      };

      const color = colors[obj.name] || colors[obj.type] || colors.star;
      const size = obj.type === 'sun' ? sizes.sun : 
                   obj.type === 'moon' ? sizes.moon :
                   obj.type === 'planet' ? sizes.planet :
                   obj.type === 'satellite' ? sizes.satellite :
                   obj.type === 'deep_sky' ? sizes.deep_sky : sizes.star;

      // Glow effect
      if (obj.type === 'sun' || obj.type === 'planet') {
        const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, size * 2.5);
        glowGradient.addColorStop(0, color);
        glowGradient.addColorStop(1, 'transparent');
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(x, y, size * 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();

      // Label
      if (hoveredObject?.name === obj.name) {
        ctx.fillStyle = 'rgba(38, 17, 14, 0.9)';
        ctx.fillRect(x - 50, y - 40, 100, 30);
        ctx.fillStyle = '#fffff4';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(obj.name, x, y - 25);
      }

      obj.canvasX = x;
      obj.canvasY = y;
      obj.canvasSize = size;
    });

    // Center crosshair
    ctx.strokeStyle = 'rgba(172, 58, 242, 0.6)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(centerX - 10, centerY);
    ctx.lineTo(centerX + 10, centerY);
    ctx.moveTo(centerX, centerY - 10);
    ctx.lineTo(centerX, centerY + 10);
    ctx.stroke();

  }, [celestialObjects, viewAzimuth, hoveredObject]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    const rect = canvasRef.current.getBoundingClientRect();
    setDragStart({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (isDragging) {
      const deltaX = x - dragStart.x;
      setViewAzimuth(prev => (prev - deltaX * 0.5 + 360) % 360);
      setDragStart({ x, y });
    } else {
      const hovered = celestialObjects.find(obj => {
        if (!obj.canvasX) return false;
        const dist = Math.sqrt(
          Math.pow(x - obj.canvasX, 2) + Math.pow(y - obj.canvasY, 2)
        );
        return dist < (obj.canvasSize || 5) + 5;
      });
      setHoveredObject(hovered || null);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const clicked = celestialObjects.find(obj => {
      if (!obj.canvasX) return false;
      const dist = Math.sqrt(
        Math.pow(x - obj.canvasX, 2) + Math.pow(y - obj.canvasY, 2)
      );
      return dist < (obj.canvasSize || 5) + 5;
    });

    if (clicked && onObjectClick) {
      onObjectClick(clicked);
    }
  };

  return (
    <Card 
      className="backdrop-blur-xl shadow-2xl overflow-hidden border"
      style={{ 
        background: 'rgba(15, 10, 20, 0.5)',
        borderColor: 'rgba(141, 124, 238, 0.3)',
        boxShadow: '0 8px 32px rgba(172, 58, 242, 0.2)'
      }}
    >
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={800}
          height={800}
          className="w-full h-auto cursor-move"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onClick={handleClick}
        />
        <div 
          className="absolute top-4 left-4 backdrop-blur-sm rounded-lg p-3 text-sm border"
          style={{ 
            backgroundColor: 'rgba(15, 10, 20, 0.9)',
            borderColor: 'rgba(141, 124, 238, 0.3)'
          }}
        >
          <p className="font-semibold mb-1" style={{ color: '#8cbdf8' }}>View Direction</p>
          <p className="text-2xl font-bold" style={{ color: '#fffff4' }}>
            {Math.round(viewAzimuth)}°
          </p>
          <p className="text-xs mt-1" style={{ color: '#8d7cee' }}>Drag to pan</p>
        </div>
      </div>
    </Card>
  );
}
