
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from 'lucide-react';
import { calculatePlanetaryPositions } from '../utils/AstrologicalCalculations';

export default function ZodiacDisplay({ location }) {
  const [planetaryPositions, setPlanetaryPositions] = useState([]);

  useEffect(() => {
    if (!location) return;

    const updatePositions = () => {
      const positions = calculatePlanetaryPositions(
        location.latitude,
        location.longitude,
        new Date()
      );
      setPlanetaryPositions(positions);
    };

    updatePositions();
    const interval = setInterval(updatePositions, 300000); // Update every 5 minutes
    return () => clearInterval(interval);
  }, [location]);

  const zodiacSigns = [
    { name: 'Aries (Mesha)', symbol: '♈', color: 'text-red-400' },
    { name: 'Taurus (Vrishabha)', symbol: '♉', color: 'text-green-400' },
    { name: 'Gemini (Mithuna)', symbol: '♊', color: 'text-yellow-400' },
    { name: 'Cancer (Karka)', symbol: '♋', color: 'text-blue-400' },
    { name: 'Leo (Simha)', symbol: '♌', color: 'text-orange-400' },
    { name: 'Virgo (Kanya)', symbol: '♍', color: 'text-teal-400' },
    { name: 'Libra (Tula)', symbol: '♎', color: 'text-pink-400' },
    { name: 'Scorpio (Vrishchika)', symbol: '♏', color: 'text-purple-400' },
    { name: 'Sagittarius (Dhanu)', symbol: '♐', color: 'text-indigo-400' },
    { name: 'Capricorn (Makara)', symbol: '♑', color: 'text-cyan-400' },
    { name: 'Aquarius (Kumbha)', symbol: '♒', color: 'text-blue-300' },
    { name: 'Pisces (Meena)', symbol: '♓', color: 'text-purple-300' }
  ];

  return (
    <Card 
      className="backdrop-blur-xl shadow-2xl border"
      style={{ 
        background: 'rgba(15, 10, 20, 0.7)',
        borderColor: 'rgba(172, 58, 242, 0.3)',
        boxShadow: '0 8px 32px rgba(172, 58, 242, 0.2)'
      }}
    >
      <CardHeader className="border-b" style={{ borderColor: 'rgba(172, 58, 242, 0.3)' }}>
        <CardTitle className="flex items-center gap-2" style={{ color: '#fffff4' }}>
          <Star className="w-5 h-5" style={{ color: '#ac3af2' }} />
          Current Planetary Positions in Zodiac
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-3">
          {planetaryPositions.map((planet) => {
            const zodiac = zodiacSigns[Math.floor(planet.longitude / 30)];
            const degreesInSign = planet.longitude % 30;

            return (
              <div
                key={planet.name}
                className="rounded-lg p-4 hover:bg-[#8d7cee]/10 transition-all border"
                style={{ 
                  backgroundColor: 'rgba(141, 124, 238, 0.05)',
                  borderColor: 'rgba(141, 124, 238, 0.3)'
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-2xl"
                      style={{ backgroundColor: planet.color + '30' }}
                    >
                      {planet.symbol}
                    </div>
                    <div>
                      <p className="font-semibold" style={{ color: '#fffff4' }}>{planet.name}</p>
                      <p className="text-sm" style={{ color: '#8cbdf8' }}>{planet.sanskrit}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <span className={`text-2xl ${zodiac.color}`}>{zodiac.symbol}</span>
                      <div>
                        <p className="font-bold" style={{ color: '#fffff4' }}>{zodiac.name.split(' ')[0]}</p>
                        <p className="text-xs" style={{ color: '#8cbdf8' }}>
                          {degreesInSign.toFixed(2)}°
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {planet.nakshatra && (
                  <div className="mt-2 pt-2 border-t" style={{ borderColor: 'rgba(141, 124, 238, 0.2)' }}>
                    <p className="text-xs" style={{ color: '#8cbdf8' }}>
                      Nakshatra: <span className="font-semibold" style={{ color: '#fffff4' }}>{planet.nakshatra}</span>
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
