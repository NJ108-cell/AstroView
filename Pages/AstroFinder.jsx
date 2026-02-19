import React, { useState } from 'react';
import LocationPanel from '../components/sky/LocationPanel';
import TimeDisplay from '../components/sky/TimeDisplay';
import CalendarDisplay from '../components/astro/CalendarDisplay';
import InteractiveSkyCanvas from '../components/astro/InteractiveSkyCanvas';
import ZodiacDisplay from '../components/astro/ZodiacDisplay';
import SatelliteList from '../components/sky/SatelliteList';
import ObjectDetailsModal from '../components/sky/ObjectDetailsModal';
import { Button } from "@/components/ui/button";
import { Sparkles, BookOpen } from 'lucide-react';
import { getSatellites } from '../components/utils/AstronomyCalculations';

export default function AstroFinderPage() {
  const [location, setLocation] = useState(null);
  const [selectedObject, setSelectedObject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [satellites, setSatellites] = React.useState([]);

  React.useEffect(() => {
    if (location) {
      const updateSatellites = () => {
        const sats = getSatellites(location.latitude, location.longitude, new Date());
        setSatellites(sats);
      };

      updateSatellites();
      const interval = setInterval(updateSatellites, 60000);
      return () => clearInterval(interval);
    }
  }, [location]);

  const handleObjectClick = (object) => {
    setSelectedObject(object);
    setModalOpen(true);
  };

  return (
    <div 
      className="min-h-screen p-4 md:p-8"
      style={{ background: '#0a0612' }}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 
              className="text-4xl md:text-5xl font-bold mb-2"
              style={{ 
                background: 'linear-gradient(90deg, #ac3af2, #8d7cee, #8cbdf8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 20px rgba(172, 58, 242, 0.5))'
              }}
            >
              Universal Astrometry Engine
            </h1>
            <p className="text-lg" style={{ color: '#8cbdf8' }}>
              Real-time Celestial Navigation & Vedic Astrology Platform
            </p>
          </div>
          
          <Button
            variant="outline"
            className="gap-2 border hover:bg-[#8d7cee]/20"
            style={{ 
              borderColor: 'rgba(172, 58, 242, 0.5)',
              color: '#fffff4',
              backgroundColor: 'rgba(141, 124, 238, 0.1)'
            }}
          >
            <BookOpen className="w-4 h-4" />
            Astrology Guide
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <LocationPanel onLocationChange={setLocation} />
            
            <div className="grid md:grid-cols-2 gap-6">
              <TimeDisplay />
              
              <div 
                className="backdrop-blur-xl border rounded-xl p-6 shadow-2xl"
                style={{ 
                  background: 'rgba(15, 10, 20, 0.7)',
                  borderColor: 'rgba(141, 124, 238, 0.3)',
                  boxShadow: '0 8px 32px rgba(172, 58, 242, 0.15)'
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-6 h-6" style={{ color: '#ac3af2' }} />
                  <h3 className="text-lg font-bold" style={{ color: '#fffff4' }}>Sky Status</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between" style={{ color: '#8cbdf8' }}>
                    <span>Visible Planets:</span>
                    <span className="font-bold" style={{ color: '#fffff4' }}>5</span>
                  </div>
                  <div className="flex justify-between" style={{ color: '#8cbdf8' }}>
                    <span>Bright Stars:</span>
                    <span className="font-bold" style={{ color: '#fffff4' }}>5+</span>
                  </div>
                  <div className="flex justify-between" style={{ color: '#8cbdf8' }}>
                    <span>Active Satellites:</span>
                    <span className="font-bold" style={{ color: '#fffff4' }}>
                      {satellites.filter(s => s.altitude > 0).length}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <InteractiveSkyCanvas 
              location={location}
              onObjectClick={handleObjectClick}
            />

            <div 
              className="backdrop-blur-xl border rounded-xl p-6 shadow-xl"
              style={{ 
                background: 'rgba(15, 10, 20, 0.7)',
                borderColor: 'rgba(172, 58, 242, 0.3)',
                boxShadow: '0 8px 32px rgba(172, 58, 242, 0.15)'
              }}
            >
              <h3 className="text-lg font-bold mb-4" style={{ color: '#fffff4' }}>
                Astrological Significance
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div 
                  className="rounded-lg p-4 border"
                  style={{ 
                    backgroundColor: 'rgba(141, 124, 238, 0.1)',
                    borderColor: 'rgba(141, 124, 238, 0.3)'
                  }}
                >
                  <p className="mb-2" style={{ color: '#8cbdf8' }}>Current Hora</p>
                  <p className="font-bold text-xl" style={{ color: '#fffff4' }}>Venus (Shukra)</p>
                  <p className="text-xs mt-1" style={{ color: '#8cbdf8' }}>Favorable for arts & beauty</p>
                </div>
                <div 
                  className="rounded-lg p-4 border"
                  style={{ 
                    backgroundColor: 'rgba(141, 124, 238, 0.1)',
                    borderColor: 'rgba(141, 124, 238, 0.3)'
                  }}
                >
                  <p className="mb-2" style={{ color: '#8cbdf8' }}>Planetary Day Lord</p>
                  <p className="font-bold text-xl" style={{ color: '#fffff4' }}>
                    {['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'][new Date().getDay()]}
                  </p>
                  <p className="text-xs mt-1" style={{ color: '#8cbdf8' }}>
                    {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][new Date().getDay()]}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <CalendarDisplay />
            <ZodiacDisplay location={location} />
            <SatelliteList 
              satellites={satellites}
              onSatelliteClick={handleObjectClick}
            />
          </div>
        </div>
      </div>

      <ObjectDetailsModal
        object={selectedObject}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        additionalData={selectedObject}
      />
    </div>
  );
}