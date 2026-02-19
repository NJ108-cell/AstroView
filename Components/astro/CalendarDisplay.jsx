
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, Moon, Sun } from 'lucide-react';
import { format } from 'date-fns';

export default function CalendarDisplay() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const calculateVikramSamvat = (date) => {
    const gregorianYear = date.getFullYear();
    const month = date.getMonth();
    const vikramYear = month >= 3 ? gregorianYear + 57 : gregorianYear + 56;
    return vikramYear;
  };

  const calculateVeerNirvanSamvat = (date) => {
    const gregorianYear = date.getFullYear();
    return gregorianYear + 527;
  };

  const getTithi = () => {
    const day = currentDate.getDate();
    const tithis = [
      'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
      'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
      'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima/Amavasya'
    ];
    return tithis[day % 15];
  };

  const getPaksha = () => {
    const day = currentDate.getDate();
    return day < 15 ? 'Shukla Paksha (Waxing)' : 'Krishna Paksha (Waning)';
  };

  const getNakshatra = () => {
    const nakshatras = [
      'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira',
      'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha',
      'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati',
      'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha',
      'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
      'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
    ];
    const dayOfYear = Math.floor((currentDate - new Date(currentDate.getFullYear(), 0, 0)) / 86400000);
    return nakshatras[dayOfYear % 27];
  };

  const getHinduMonth = () => {
    const months = [
      'Chaitra', 'Vaishakha', 'Jyeshtha', 'Ashadha',
      'Shravana', 'Bhadrapada', 'Ashwin', 'Kartik',
      'Margashirsha', 'Pausha', 'Magha', 'Phalguna'
    ];
    const gregorianMonth = currentDate.getMonth();
    const adjustedMonth = (gregorianMonth + 9) % 12;
    return months[adjustedMonth];
  };

  const vikramSamvat = calculateVikramSamvat(currentDate);
  const veerNirvanSamvat = calculateVeerNirvanSamvat(currentDate);

  return (
    <div className="space-y-4">
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
            <Sun className="w-5 h-5" style={{ color: '#ac3af2' }} />
            Hindu Calendar (Panchang)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div 
              className="rounded-lg p-4 border"
              style={{ 
                backgroundColor: 'rgba(141, 124, 238, 0.15)',
                borderColor: 'rgba(141, 124, 238, 0.3)'
              }}
            >
              <p className="text-xs mb-1" style={{ color: '#8cbdf8' }}>Vikram Samvat</p>
              <p className="text-2xl font-bold" style={{ color: '#fffff4' }}>{vikramSamvat} VS</p>
            </div>
            <div 
              className="rounded-lg p-4 border"
              style={{ 
                backgroundColor: 'rgba(141, 124, 238, 0.15)',
                borderColor: 'rgba(141, 124, 238, 0.3)'
              }}
            >
              <p className="text-xs mb-1" style={{ color: '#8cbdf8' }}>Hindu Month</p>
              <p className="text-xl font-bold" style={{ color: '#fffff4' }}>{getHinduMonth()}</p>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div 
              className="flex justify-between p-3 rounded-lg border"
              style={{ 
                backgroundColor: 'rgba(110, 85, 215, 0.1)',
                borderColor: 'rgba(110, 85, 215, 0.3)'
              }}
            >
              <span style={{ color: '#8cbdf8' }}>Tithi:</span>
              <span className="font-semibold" style={{ color: '#fffff4' }}>{getTithi()}</span>
            </div>
            <div 
              className="flex justify-between p-3 rounded-lg border"
              style={{ 
                backgroundColor: 'rgba(110, 85, 215, 0.1)',
                borderColor: 'rgba(110, 85, 215, 0.3)'
              }}
            >
              <span style={{ color: '#8cbdf8' }}>Paksha:</span>
              <span className="font-semibold" style={{ color: '#fffff4' }}>{getPaksha()}</span>
            </div>
            <div 
              className="flex justify-between p-3 rounded-lg border"
              style={{ 
                backgroundColor: 'rgba(110, 85, 215, 0.1)',
                borderColor: 'rgba(110, 85, 215, 0.3)'
              }}
            >
              <span style={{ color: '#8cbdf8' }}>Nakshatra:</span>
              <span className="font-semibold" style={{ color: '#fffff4' }}>{getNakshatra()}</span>
            </div>
          </div>

          <div 
            className="border rounded-lg p-3 text-center"
            style={{ 
              background: 'linear-gradient(90deg, rgba(172, 58, 242, 0.15), rgba(141, 124, 238, 0.15))',
              borderColor: 'rgba(172, 58, 242, 0.4)'
            }}
          >
            <p className="text-xs mb-1" style={{ color: '#8cbdf8' }}>Gregorian Date</p>
            <p className="font-bold" style={{ color: '#fffff4' }}>{format(currentDate, 'PPPP')}</p>
          </div>
        </CardContent>
      </Card>

      <Card 
        className="backdrop-blur-xl shadow-2xl border"
        style={{ 
          background: 'rgba(15, 10, 20, 0.7)',
          borderColor: 'rgba(110, 85, 215, 0.3)',
          boxShadow: '0 8px 32px rgba(110, 85, 215, 0.2)'
        }}
      >
        <CardHeader className="border-b" style={{ borderColor: 'rgba(110, 85, 215, 0.3)' }}>
          <CardTitle className="flex items-center gap-2" style={{ color: '#fffff4' }}>
            <Moon className="w-5 h-5" style={{ color: '#8cbdf8' }} />
            Jain Calendar
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div 
            className="rounded-lg p-4 text-center border"
            style={{ 
              backgroundColor: 'rgba(141, 124, 238, 0.15)',
              borderColor: 'rgba(141, 124, 238, 0.3)'
            }}
          >
            <p className="text-xs mb-2" style={{ color: '#8cbdf8' }}>Veer Nirvan Samvat</p>
            <p className="text-3xl font-bold" style={{ color: '#fffff4' }}>{veerNirvanSamvat} VNS</p>
          </div>

          <div className="space-y-2 text-sm">
            <div 
              className="flex justify-between p-3 rounded-lg border"
              style={{ 
                backgroundColor: 'rgba(110, 85, 215, 0.1)',
                borderColor: 'rgba(110, 85, 215, 0.3)'
              }}
            >
              <span style={{ color: '#8cbdf8' }}>Era Since:</span>
              <span className="font-semibold" style={{ color: '#fffff4' }}>527 BCE</span>
            </div>
            <div 
              className="flex justify-between p-3 rounded-lg border"
              style={{ 
                backgroundColor: 'rgba(110, 85, 215, 0.1)',
                borderColor: 'rgba(110, 85, 215, 0.3)'
              }}
            >
              <span style={{ color: '#8cbdf8' }}>Based on:</span>
              <span className="font-semibold" style={{ color: '#fffff4' }}>Mahavira Nirvana</span>
            </div>
          </div>

          <div 
            className="border rounded-lg p-3"
            style={{ 
              background: 'linear-gradient(90deg, rgba(110, 85, 215, 0.15), rgba(141, 124, 238, 0.15))',
              borderColor: 'rgba(110, 85, 215, 0.4)'
            }}
          >
            <p className="text-xs mb-1 text-center" style={{ color: '#8cbdf8' }}>Current Time</p>
            <p className="text-2xl font-bold text-center" style={{ color: '#fffff4' }}>
              {format(currentDate, 'HH:mm:ss')}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card 
        className="backdrop-blur-xl shadow-2xl border"
        style={{ 
          background: 'rgba(15, 10, 20, 0.7)',
          borderColor: 'rgba(141, 124, 238, 0.3)',
          boxShadow: '0 8px 32px rgba(141, 124, 238, 0.2)'
        }}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2" style={{ color: '#fffff4' }}>
            <CalendarIcon className="w-5 h-5" style={{ color: '#8d7cee' }} />
            Auspicious Timings (Muhurat)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-3">
          <div className="space-y-2 text-sm">
            <div 
              className="flex justify-between items-center p-3 rounded-lg border"
              style={{ 
                backgroundColor: 'rgba(141, 124, 238, 0.1)',
                borderColor: 'rgba(141, 124, 238, 0.3)'
              }}
            >
              <div>
                <p style={{ color: '#fffff4' }}>Brahma Muhurat</p>
                <p className="text-xs" style={{ color: '#8cbdf8' }}>Best for meditation</p>
              </div>
              <span className="font-semibold" style={{ color: '#fffff4' }}>04:30 - 06:00</span>
            </div>
            <div 
              className="flex justify-between items-center p-3 rounded-lg border"
              style={{ 
                backgroundColor: 'rgba(141, 124, 238, 0.1)',
                borderColor: 'rgba(141, 124, 238, 0.3)'
              }}
            >
              <div>
                <p style={{ color: '#fffff4' }}>Abhijit Muhurat</p>
                <p className="text-xs" style={{ color: '#8cbdf8' }}>Auspicious period</p>
              </div>
              <span className="font-semibold" style={{ color: '#fffff4' }}>11:45 - 12:30</span>
            </div>
            <div 
              className="flex justify-between items-center p-3 rounded-lg border"
              style={{ 
                backgroundColor: 'rgba(141, 124, 238, 0.1)',
                borderColor: 'rgba(141, 124, 238, 0.3)'
              }}
            >
              <div>
                <p style={{ color: '#fffff4' }}>Rahu Kaal</p>
                <p className="text-xs" style={{ color: '#8cbdf8' }}>Inauspicious period</p>
              </div>
              <span className="font-semibold" style={{ color: '#ac3af2' }}>15:00 - 16:30</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
