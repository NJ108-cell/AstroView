import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Compass, TrendingUp, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { format } from 'date-fns';
import { Skeleton } from "@/components/ui/skeleton";

export default function ObservationsPage() {
  const { data: observations = [], isLoading, refetch } = useQuery({
    queryKey: ['sky-observations'],
    queryFn: async () => {
      try {
        return await base44.entities.SkyObservation.list('-observation_date');
      } catch (error) {
        console.error('Error loading observations:', error);
        return [];
      }
    }
  });

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this observation?')) return;
    
    try {
      await base44.entities.SkyObservation.delete(id);
      refetch();
      alert('✨ Observation deleted successfully!');
    } catch (error) {
      console.error('Error deleting observation:', error);
      alert('❌ Failed to delete observation. Please try again.');
    }
  };

  const getObjectIcon = (type) => {
    const icons = {
      sun: '☀️',
      moon: '🌙',
      planet: '🪐',
      star: '⭐',
      satellite: '🛰️',
      deep_sky: '🌌'
    };
    return icons[type] || '✨';
  };

  return (
    <div className="min-h-screen p-4 md:p-8" style={{ background: '#0a0612' }}>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">My Observations</h1>
          <p className="text-blue-200">Your personal astronomy journal</p>
        </div>

        <div className="space-y-4">
          {isLoading ? (
            Array(3).fill(0).map((_, i) => (
              <Card key={i} className="bg-black/40 backdrop-blur-xl border-white/20">
                <CardContent className="p-6">
                  <Skeleton className="h-24 w-full bg-white/10" />
                </CardContent>
              </Card>
            ))
          ) : observations.length === 0 ? (
            <Card className="bg-black/40 backdrop-blur-xl border-white/20">
              <CardContent className="p-12 text-center">
                <p className="text-gray-400 text-lg">No observations yet</p>
                <p className="text-gray-500 text-sm mt-2">Start exploring the sky and save your first observation!</p>
              </CardContent>
            </Card>
          ) : (
            observations.map((obs) => (
              <Card key={obs.id} className="bg-gradient-to-br from-black/60 to-purple-900/30 backdrop-blur-xl border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{getObjectIcon(obs.object_type)}</span>
                      <div>
                        <p className="text-xl">{obs.object_name}</p>
                        <p className="text-sm text-blue-300 font-normal">
                          {obs.object_type.replace('_', ' ').toUpperCase()}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(obs.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: '#ac3af2' }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 text-blue-200">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">
                        {format(new Date(obs.observation_date), 'PPpp')}
                      </span>
                    </div>
                    
                    {obs.latitude && obs.longitude && (
                      <div className="flex items-center gap-3 text-blue-200">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">
                          {obs.latitude.toFixed(2)}°, {obs.longitude.toFixed(2)}°
                        </span>
                      </div>
                    )}
                  </div>

                  {(obs.azimuth || obs.altitude) && (
                    <div className="grid grid-cols-2 gap-4">
                      {obs.azimuth && (
                        <div className="bg-white/10 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <Compass className="w-3 h-3 text-blue-400" />
                            <span className="text-xs text-blue-300">Azimuth</span>
                          </div>
                          <p className="text-white font-bold">{obs.azimuth.toFixed(1)}°</p>
                        </div>
                      )}
                      
                      {obs.altitude && (
                        <div className="bg-white/10 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <TrendingUp className="w-3 h-3 text-green-400" />
                            <span className="text-xs text-green-300">Altitude</span>
                          </div>
                          <p className="text-white font-bold">{obs.altitude.toFixed(1)}°</p>
                        </div>
                      )}
                    </div>
                  )}

                  {obs.notes && (
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-sm text-blue-200">{obs.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}