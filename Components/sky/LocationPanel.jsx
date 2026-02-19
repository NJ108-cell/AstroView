
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Loader2, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function LocationPanel({ onLocationChange }) {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const setDefaultLocation = useCallback(() => {
    const defaultLoc = {
      latitude: 28.6139,
      longitude: 77.2090,
      name: "New Delhi, India"
    };
    setLocation(defaultLoc);
    setLoading(false);
    if (onLocationChange) onLocationChange(defaultLoc);
  }, [onLocationChange]);

  const getLocation = useCallback(() => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      setDefaultLocation();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const loc = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        };
        setLocation(loc);
        setLoading(false);
        if (onLocationChange) onLocationChange(loc);
      },
      (err) => {
        setError("Location access denied");
        setDefaultLocation();
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, [onLocationChange, setDefaultLocation]);

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  if (loading) {
    return (
      <Card className="bg-black/40 backdrop-blur-xl border-white/20 shadow-2xl shadow-purple-500/10">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 text-blue-200">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm font-medium">Detecting your location...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      className="backdrop-blur-xl shadow-2xl border"
      style={{ 
        background: 'rgba(15, 10, 20, 0.7)',
        borderColor: 'rgba(141, 124, 238, 0.3)',
        boxShadow: '0 8px 32px rgba(172, 58, 242, 0.2)'
      }}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
              style={{ 
                background: 'linear-gradient(135deg, #8cbdf8, #8d7cee)',
                boxShadow: '0 0 20px rgba(140, 189, 248, 0.5)'
              }}
            >
              <MapPin className="w-6 h-6" style={{ color: '#fffff4' }} />
            </div>
            <div>
              <h3 className="text-sm font-medium mb-1" style={{ color: '#8cbdf8' }}>Viewing Sky From</h3>
              <p className="text-2xl font-bold mb-1" style={{ color: '#fffff4' }}>
                {location.latitude.toFixed(4)}° {location.latitude >= 0 ? 'N' : 'S'}
                {', '}
                {Math.abs(location.longitude).toFixed(4)}° {location.longitude >= 0 ? 'E' : 'W'}
              </p>
              {location.name && (
                <p className="text-sm" style={{ color: '#8cbdf8' }}>{location.name}</p>
              )}
              {error && (
                <div className="flex items-center gap-2 mt-2" style={{ color: '#ac3af2' }}>
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-xs">{error} - Using default location</span>
                </div>
              )}
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={getLocation}
            className="hover:bg-[#8d7cee]/20"
            style={{ 
              borderColor: 'rgba(141, 124, 238, 0.5)',
              color: '#fffff4',
              backgroundColor: 'rgba(141, 124, 238, 0.1)'
            }}
          >
            Refresh
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
