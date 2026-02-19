import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Satellite, Radio } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

export default function SatelliteList({ satellites, onSatelliteClick }) {
  return (
    <Card 
      className="backdrop-blur-xl shadow-xl border"
      style={{ 
        background: 'rgba(15, 10, 20, 0.7)',
        borderColor: 'rgba(141, 124, 238, 0.3)',
        boxShadow: '0 8px 32px rgba(140, 189, 248, 0.15)'
      }}
    >
      <CardHeader className="border-b" style={{ borderColor: 'rgba(141, 124, 238, 0.2)' }}>
        <CardTitle className="flex items-center gap-2" style={{ color: '#fffff4' }}>
          <Satellite className="w-5 h-5" style={{ color: '#8cbdf8' }} />
          Nearby Satellites
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3">
          {satellites.filter(sat => sat.altitude > 0).slice(0, 5).map((satellite, index) => (
            <div
              key={satellite.name}
              onClick={() => onSatelliteClick(satellite)}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-[#8d7cee]/10 cursor-pointer transition-all duration-200 group border"
              style={{ 
                backgroundColor: 'rgba(141, 124, 238, 0.05)',
                borderColor: 'rgba(141, 124, 238, 0.3)'
              }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
                  style={{ 
                    background: 'linear-gradient(135deg, #8cbdf8, #8d7cee)',
                    boxShadow: '0 0 15px rgba(140, 189, 248, 0.4)'
                  }}
                >
                  <Radio className="w-5 h-5" style={{ color: '#fffff4' }} />
                </div>
                <div>
                  <p className="font-semibold group-hover:text-[#8cbdf8] transition-colors" style={{ color: '#fffff4' }}>
                    {satellite.name}
                  </p>
                  <p className="text-xs" style={{ color: '#8cbdf8' }}>
                    {satellite.distance} km • {satellite.altitude.toFixed(0)}° altitude
                  </p>
                </div>
              </div>
              <Badge 
                variant="outline" 
                className="border"
                style={{ 
                  borderColor: 'rgba(140, 189, 248, 0.5)',
                  color: '#8cbdf8'
                }}
              >
                Visible
              </Badge>
            </div>
          ))}
          
          {satellites.filter(sat => sat.altitude > 0).length === 0 && (
            <div className="text-center py-8" style={{ color: '#8cbdf8' }}>
              <Satellite className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No satellites currently visible</p>
              <p className="text-xs mt-1" style={{ color: '#6e55d7' }}>Check back in a few minutes</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}