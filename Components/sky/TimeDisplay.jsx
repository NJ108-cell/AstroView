import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from 'lucide-react';
import { format } from 'date-fns';

export default function TimeDisplay() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Card 
      className="backdrop-blur-xl shadow-xl border"
      style={{ 
        background: 'rgba(15, 10, 20, 0.7)',
        borderColor: 'rgba(141, 124, 238, 0.3)',
        boxShadow: '0 8px 32px rgba(141, 124, 238, 0.15)'
      }}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5" style={{ color: '#8cbdf8' }} />
          <div>
            <p className="text-xs mb-1" style={{ color: '#8cbdf8' }}>Observation Time</p>
            <p className="text-lg font-bold" style={{ color: '#fffff4' }}>
              {format(currentTime, 'HH:mm:ss')}
            </p>
            <p className="text-xs" style={{ color: '#8cbdf8' }}>
              {format(currentTime, 'EEEE, MMMM d, yyyy')}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}