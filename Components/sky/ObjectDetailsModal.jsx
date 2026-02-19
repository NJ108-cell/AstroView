import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Compass, TrendingUp, Clock, Ruler } from 'lucide-react';

export default function ObjectDetailsModal({ object, isOpen, onClose, additionalData }) {
  if (!object) return null;

  const formatCoordinate = (value, suffix) => {
    return `${Math.abs(value).toFixed(2)}° ${suffix}`;
  };

  const getObjectColor = (type) => {
    const colors = {
      sun: 'bg-orange-500',
      moon: 'bg-gray-400',
      planet: 'bg-purple-500',
      star: 'bg-blue-400',
      satellite: 'bg-cyan-500',
      deep_sky: 'bg-pink-500'
    };
    return colors[type] || 'bg-blue-500';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-slate-900 to-purple-900 border-white/20 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <div className={`w-8 h-8 ${getObjectColor(object.type)} rounded-full shadow-lg`}></div>
            {object.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          <div className="flex items-center gap-2">
            <Badge className={`${getObjectColor(object.type)} text-white border-0`}>
              {object.type.replace('_', ' ').toUpperCase()}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Compass className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-blue-300">Azimuth</span>
              </div>
              <p className="text-2xl font-bold">{object.azimuth.toFixed(1)}°</p>
              <p className="text-xs text-gray-400 mt-1">
                {object.azimuth < 45 || object.azimuth >= 315 ? 'North' :
                 object.azimuth < 135 ? 'East' :
                 object.azimuth < 225 ? 'South' : 'West'}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-300">Altitude</span>
              </div>
              <p className="text-2xl font-bold">{object.altitude.toFixed(1)}°</p>
              <p className="text-xs text-gray-400 mt-1">
                {object.altitude > 60 ? 'High in sky' :
                 object.altitude > 30 ? 'Mid-level' :
                 object.altitude > 0 ? 'Near horizon' : 'Below horizon'}
              </p>
            </div>
          </div>

          {additionalData && (
            <>
              {additionalData.distance && (
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Ruler className="w-4 h-4 text-purple-400" />
                    <span className="text-sm text-purple-300">Distance</span>
                  </div>
                  <p className="text-xl font-bold">{additionalData.distance}</p>
                </div>
              )}

              {additionalData.riseTime && (
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-yellow-300">Rise / Set Times</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm"><span className="text-gray-400">Rise:</span> {additionalData.riseTime}</p>
                    <p className="text-sm"><span className="text-gray-400">Set:</span> {additionalData.setTime}</p>
                  </div>
                </div>
              )}

              {additionalData.magnitude && (
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-1">Apparent Magnitude</div>
                  <p className="text-xl font-bold">{additionalData.magnitude}</p>
                </div>
              )}

              {additionalData.constellation && (
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-1">Constellation</div>
                  <p className="text-lg font-bold">{additionalData.constellation}</p>
                </div>
              )}
            </>
          )}

          {object.type === 'satellite' && additionalData?.nextPass && (
            <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-lg p-4">
              <div className="text-sm text-cyan-300 mb-2">Next Visible Pass</div>
              <p className="text-lg font-bold">{additionalData.nextPass}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}