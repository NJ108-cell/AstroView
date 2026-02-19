import React, { useState, useEffect } from 'react';
import LocationPanel from '../components/sky/LocationPanel';
import TimeDisplay from '../components/sky/TimeDisplay';
import SkyCanvas from '../components/sky/SkyCanvas';
import SatelliteList from '../components/sky/SatelliteList';
import ObjectDetailsModal from '../components/sky/ObjectDetailsModal';
import { Button } from "@/components/ui/button";
import { Save, Info } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useQueryClient } from '@tanstack/react-query';
import { getSatellites } from '../components/utils/AstronomyCalculations';

export default function SkyFinderPage() {
  const [location, setLocation] = useState(null);
  const [selectedObject, setSelectedObject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [satellites, setSatellites] = useState([]);
  const [saving, setSaving] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
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

  const handleSaveObservation = async () => {
    if (!selectedObject || !location) {
      alert('Please ensure location is detected and an object is selected');
      return;
    }
    
    setSaving(true);
    try {
      await base44.entities.SkyObservation.create({
        observation_date: new Date().toISOString(),
        latitude: location.latitude,
        longitude: location.longitude,
        object_name: selectedObject.name,
        object_type: selectedObject.type,
        azimuth: selectedObject.azimuth,
        altitude: selectedObject.altitude,
        notes: `Observed from sky finder application`
      });
      
      queryClient.invalidateQueries(['sky-observations']);
      alert(`✨ Observation of ${selectedObject.name} saved successfully!`);
      setModalOpen(false);
    } catch (error) {
      console.error('Error saving observation:', error);
      alert('❌ Failed to save observation. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8" style={{ background: '#0a0612' }}>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Universal Sky Finder
            </h1>
            <p className="text-blue-200">Real-time astronomical observation platform</p>
          </div>
          
          <Button
            variant="outline"
            className="border-white/20 hover:bg-white/10 text-white gap-2"
          >
            <Info className="w-4 h-4" />
            Guide
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <LocationPanel onLocationChange={setLocation} />
            
            <div className="grid md:grid-cols-2 gap-6">
              <TimeDisplay />
              
              <div className="bg-gradient-to-br from-black/60 to-blue-900/30 backdrop-blur-xl border border-white/20 rounded-lg p-6 shadow-2xl">
                <h3 className="text-lg font-bold text-white mb-3">Quick Stats</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-blue-200">
                    <span>Visible Planets:</span>
                    <span className="font-bold text-white">4</span>
                  </div>
                  <div className="flex justify-between text-blue-200">
                    <span>Bright Stars:</span>
                    <span className="font-bold text-white">5+</span>
                  </div>
                  <div className="flex justify-between text-blue-200">
                    <span>Active Satellites:</span>
                    <span className="font-bold text-white">{satellites.filter(s => s.altitude > 0).length}</span>
                  </div>
                </div>
              </div>
            </div>

            <SkyCanvas 
              location={location} 
              onObjectClick={handleObjectClick}
            />
          </div>

          <div className="space-y-6">
            <SatelliteList 
              satellites={satellites}
              onSatelliteClick={handleObjectClick}
            />

            <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/30 backdrop-blur-xl border border-white/20 rounded-lg p-6 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-3">Deep Sky Objects</h3>
              <div className="space-y-3 text-sm">
                <div 
                  onClick={() => handleObjectClick({
                    name: 'Andromeda Galaxy',
                    type: 'deep_sky',
                    azimuth: 45,
                    altitude: 35,
                    distance: '2.5 million light years',
                    magnitude: 3.4
                  })}
                  className="flex justify-between items-center p-3 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition-all"
                >
                  <div>
                    <p className="font-semibold text-white">Andromeda Galaxy</p>
                    <p className="text-xs text-purple-300">M31 • 2.5M ly away</p>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400/30 to-pink-500/30"></div>
                </div>
                
                <div 
                  onClick={() => handleObjectClick({
                    name: 'Orion Nebula',
                    type: 'deep_sky',
                    azimuth: 180,
                    altitude: 25,
                    distance: '1,344 light years',
                    magnitude: 4.0
                  })}
                  className="flex justify-between items-center p-3 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition-all"
                >
                  <div>
                    <p className="font-semibold text-white">Orion Nebula</p>
                    <p className="text-xs text-purple-300">M42 • 1,344 ly away</p>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-400/30 to-red-500/30"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ObjectDetailsModal
        object={selectedObject}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        additionalData={selectedObject}
      />

      {modalOpen && selectedObject && (
        <div className="fixed bottom-8 right-8 z-50">
          <Button
            onClick={handleSaveObservation}
            disabled={saving}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl shadow-purple-500/50 gap-2"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Observation'}
          </Button>
        </div>
      )}
    </div>
  );
}