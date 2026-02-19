import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Calendar, MapPin, Trash2, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { Skeleton } from "@/components/ui/skeleton";

export default function MyChartsPage() {
  const { data: charts = [], isLoading, refetch } = useQuery({
    queryKey: ['birth-charts'],
    queryFn: async () => {
      try {
        return await base44.entities.BirthChart.list('-created_date');
      } catch (error) {
        console.error('Error loading birth charts:', error);
        return [];
      }
    }
  });

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this birth chart?')) return;
    
    try {
      await base44.entities.BirthChart.delete(id);
      refetch();
      alert('✨ Birth chart deleted successfully!');
    } catch (error) {
      console.error('Error deleting birth chart:', error);
      alert('❌ Failed to delete birth chart. Please try again.');
    }
  };

  const handleView = (chart) => {
    const chartDetails = `
VEDIC BIRTH CHART (JANAM KUNDALI)

Name: ${chart.name}
Birth Date: ${format(new Date(chart.birth_date), 'PPpp')}
Birth Place: ${chart.birth_place || 'Not specified'}
Coordinates: ${chart.birth_latitude?.toFixed(4)}°, ${chart.birth_longitude?.toFixed(4)}°

MAIN POSITIONS:
- Ascendant (Lagna): ${chart.ascendant_sign}
- Moon Sign (Rashi): ${chart.moon_sign}
- Sun Sign: ${chart.sun_sign}
- Nakshatra: ${chart.nakshatra}
    `;
    alert(chartDetails);
  };

  return (
    <div className="min-h-screen p-4 md:p-8" style={{ background: '#0a0612' }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 
            className="text-4xl font-bold mb-2"
            style={{ 
              background: 'linear-gradient(90deg, #ac3af2, #8d7cee, #8cbdf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            My Birth Charts
          </h1>
          <p style={{ color: '#8cbdf8' }}>Saved Vedic horoscopes and kundalis</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array(3).fill(0).map((_, i) => (
              <Card 
                key={i} 
                className="backdrop-blur-xl border"
                style={{ 
                  background: 'rgba(15, 10, 20, 0.7)',
                  borderColor: 'rgba(141, 124, 238, 0.3)'
                }}
              >
                <CardContent className="p-6">
                  <Skeleton className="h-32 w-full" style={{ backgroundColor: 'rgba(141, 124, 238, 0.1)' }} />
                </CardContent>
              </Card>
            ))
          ) : charts.length === 0 ? (
            <Card 
              className="col-span-full backdrop-blur-xl border"
              style={{ 
                background: 'rgba(15, 10, 20, 0.7)',
                borderColor: 'rgba(141, 124, 238, 0.3)'
              }}
            >
              <CardContent className="p-12 text-center">
                <Star className="w-16 h-16 mx-auto mb-4" style={{ color: '#8cbdf8', opacity: 0.3 }} />
                <p className="text-lg mb-2" style={{ color: '#fffff4' }}>No birth charts yet</p>
                <p className="text-sm" style={{ color: '#8cbdf8' }}>Create your first Vedic birth chart to get started!</p>
              </CardContent>
            </Card>
          ) : (
            charts.map((chart) => (
              <Card 
                key={chart.id} 
                className="backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300 group border"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(172, 58, 242, 0.1), rgba(141, 124, 238, 0.1))',
                  borderColor: 'rgba(172, 58, 242, 0.3)'
                }}
              >
                <CardHeader className="border-b" style={{ borderColor: 'rgba(172, 58, 242, 0.2)' }}>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5" style={{ color: '#ac3af2' }} />
                      <span style={{ color: '#fffff4' }}>{chart.name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(chart.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: '#ac3af2' }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2" style={{ color: '#8cbdf8' }}>
                      <Calendar className="w-4 h-4" />
                      <span>{format(new Date(chart.birth_date), 'PP')}</span>
                    </div>
                    {chart.birth_place && (
                      <div className="flex items-center gap-2" style={{ color: '#8cbdf8' }}>
                        <MapPin className="w-4 h-4" />
                        <span>{chart.birth_place}</span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div 
                      className="rounded-lg p-2 border"
                      style={{ 
                        backgroundColor: 'rgba(141, 124, 238, 0.1)',
                        borderColor: 'rgba(141, 124, 238, 0.3)'
                      }}
                    >
                      <p style={{ color: '#8cbdf8' }}>Ascendant</p>
                      <p className="font-bold" style={{ color: '#fffff4' }}>{chart.ascendant_sign}</p>
                    </div>
                    <div 
                      className="rounded-lg p-2 border"
                      style={{ 
                        backgroundColor: 'rgba(141, 124, 238, 0.1)',
                        borderColor: 'rgba(141, 124, 238, 0.3)'
                      }}
                    >
                      <p style={{ color: '#8cbdf8' }}>Moon Sign</p>
                      <p className="font-bold" style={{ color: '#fffff4' }}>{chart.moon_sign}</p>
                    </div>
                    <div 
                      className="rounded-lg p-2 border"
                      style={{ 
                        backgroundColor: 'rgba(141, 124, 238, 0.1)',
                        borderColor: 'rgba(141, 124, 238, 0.3)'
                      }}
                    >
                      <p style={{ color: '#8cbdf8' }}>Sun Sign</p>
                      <p className="font-bold" style={{ color: '#fffff4' }}>{chart.sun_sign}</p>
                    </div>
                    <div 
                      className="rounded-lg p-2 border"
                      style={{ 
                        backgroundColor: 'rgba(141, 124, 238, 0.1)',
                        borderColor: 'rgba(141, 124, 238, 0.3)'
                      }}
                    >
                      <p style={{ color: '#8cbdf8' }}>Nakshatra</p>
                      <p className="font-bold text-xs" style={{ color: '#fffff4' }}>{chart.nakshatra}</p>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleView(chart)}
                    className="w-full"
                    style={{ 
                      background: 'linear-gradient(90deg, rgba(172, 58, 242, 0.3), rgba(141, 124, 238, 0.3))',
                      color: '#fffff4'
                    }}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}