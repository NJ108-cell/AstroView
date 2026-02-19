// Enhanced astronomical calculations

export function calculateCelestialObjects(latitude, longitude, date) {
  const hour = date.getHours() + date.getMinutes() / 60;
  const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 86400000);
  
  // Solar noon approximation
  const solarNoon = 12 - longitude / 15;
  const hourAngle = 15 * (hour - solarNoon);
  
  // Sun position
  const declination = 23.45 * Math.sin((360 / 365) * (dayOfYear - 81) * Math.PI / 180);
  const latRad = latitude * Math.PI / 180;
  const decRad = declination * Math.PI / 180;
  const haRad = hourAngle * Math.PI / 180;
  
  const sunAltitude = Math.asin(
    Math.sin(latRad) * Math.sin(decRad) +
    Math.cos(latRad) * Math.cos(decRad) * Math.cos(haRad)
  ) * 180 / Math.PI;
  
  let sunAzimuth = 180 + hourAngle;
  if (sunAzimuth < 0) sunAzimuth += 360;
  if (sunAzimuth >= 360) sunAzimuth -= 360;

  const objects = [
    {
      name: 'Sun',
      type: 'sun',
      azimuth: sunAzimuth,
      altitude: sunAltitude,
      distance: '149.6 million km',
      magnitude: -26.74
    }
  ];

  // Planets
  const baseOffset = hour * 15;
  const planetData = [
    { name: 'Mercury', offset: 30, altFactor: 25, color: '#BDBDBD' },
    { name: 'Venus', offset: 45, altFactor: 30, color: '#F0E68C' },
    { name: 'Mars', offset: 120, altFactor: 40, color: '#FF4500' },
    { name: 'Jupiter', offset: 180, altFactor: 50, color: '#D2B48C' },
    { name: 'Saturn', offset: 240, altFactor: 35, color: '#F5DEB3' }
  ];

  planetData.forEach(planet => {
    objects.push({
      name: planet.name,
      type: 'planet',
      azimuth: (baseOffset + planet.offset) % 360,
      altitude: Math.max(-20, Math.min(70, planet.altFactor * Math.sin((hour + planet.offset/30) * Math.PI / 12))),
      color: planet.color
    });
  });

  // Stars
  const siderealTime = (hour + longitude / 15) * 15;
  const starData = [
    { name: 'Sirius', offset: 100, baseLat: 16 },
    { name: 'Vega', offset: 280, baseLat: 38 },
    { name: 'Arcturus', offset: 215, baseLat: 19 },
    { name: 'Polaris', offset: 0, baseLat: latitude }
  ];

  starData.forEach(star => {
    objects.push({
      name: star.name,
      type: 'star',
      azimuth: (siderealTime + star.offset) % 360,
      altitude: Math.max(-20, 55 - Math.abs(latitude - star.baseLat))
    });
  });

  // Satellites
  const minute = date.getMinutes();
  const satAzimuth = (minute * 6) % 360;
  
  objects.push({
    name: 'ISS',
    type: 'satellite',
    azimuth: satAzimuth,
    altitude: Math.max(-10, 70 * Math.sin(minute * Math.PI / 30)),
    distance: '420 km'
  });

  return objects;
}

export function calculateSunPosition(latitude, longitude, date) {
  const hour = date.getHours() + date.getMinutes() / 60;
  const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 86400000);
  
  const solarNoon = 12 - longitude / 15;
  const hourAngle = 15 * (hour - solarNoon);
  
  const declination = 23.45 * Math.sin((360 / 365) * (dayOfYear - 81) * Math.PI / 180);
  
  const latRad = latitude * Math.PI / 180;
  const decRad = declination * Math.PI / 180;
  const haRad = hourAngle * Math.PI / 180;
  
  const altitude = Math.asin(
    Math.sin(latRad) * Math.sin(decRad) +
    Math.cos(latRad) * Math.cos(decRad) * Math.cos(haRad)
  ) * 180 / Math.PI;
  
  let azimuth = 180 + hourAngle;
  if (azimuth < 0) azimuth += 360;
  if (azimuth >= 360) azimuth -= 360;
  
  const sunriseHour = solarNoon - 6;
  const sunsetHour = solarNoon + 6;
  
  return {
    name: 'Sun',
    azimuth,
    altitude,
    riseTime: `${Math.floor(sunriseHour).toString().padStart(2, '0')}:${Math.floor((sunriseHour % 1) * 60).toString().padStart(2, '0')}`,
    setTime: `${Math.floor(sunsetHour).toString().padStart(2, '0')}:${Math.floor((sunsetHour % 1) * 60).toString().padStart(2, '0')}`,
    distance: '149.6 million km'
  };
}

export function calculatePlanetPositions(latitude, longitude, date) {
  const hour = date.getHours();
  const baseOffset = hour * 15;
  
  return [
    {
      name: 'Venus',
      azimuth: (baseOffset + 45) % 360,
      altitude: Math.max(-20, Math.min(60, 30 * Math.sin((hour + 2) * Math.PI / 12))),
      distance: '41 million km',
      magnitude: -4.2,
      constellation: 'Pisces'
    },
    {
      name: 'Mars',
      azimuth: (baseOffset + 120) % 360,
      altitude: Math.max(-20, Math.min(70, 40 * Math.sin((hour + 6) * Math.PI / 12))),
      distance: '225 million km',
      magnitude: 0.5,
      constellation: 'Taurus'
    },
    {
      name: 'Jupiter',
      azimuth: (baseOffset + 180) % 360,
      altitude: Math.max(-20, Math.min(75, 50 * Math.sin((hour + 4) * Math.PI / 12))),
      distance: '778 million km',
      magnitude: -2.5,
      constellation: 'Aries'
    },
    {
      name: 'Saturn',
      azimuth: (baseOffset + 240) % 360,
      altitude: Math.max(-20, Math.min(65, 35 * Math.sin((hour + 8) * Math.PI / 12))),
      distance: '1.4 billion km',
      magnitude: 0.7,
      constellation: 'Aquarius'
    }
  ];
}

export function getBrightStars(latitude, longitude, date) {
  const hour = date.getHours();
  const siderealTime = (hour + longitude / 15) * 15;
  
  return [
    {
      name: 'Sirius',
      azimuth: (siderealTime + 100) % 360,
      altitude: Math.max(-20, 45 - Math.abs(latitude - 16)),
      magnitude: -1.46,
      constellation: 'Canis Major',
      distance: '8.6 light years'
    },
    {
      name: 'Vega',
      azimuth: (siderealTime + 280) % 360,
      altitude: Math.max(-20, 60 - Math.abs(latitude - 38)),
      magnitude: 0.03,
      constellation: 'Lyra',
      distance: '25 light years'
    },
    {
      name: 'Arcturus',
      azimuth: (siderealTime + 215) % 360,
      altitude: Math.max(-20, 55 - Math.abs(latitude - 19)),
      magnitude: -0.05,
      constellation: 'Boötes',
      distance: '37 light years'
    },
    {
      name: 'Polaris',
      azimuth: 0,
      altitude: latitude > 0 ? latitude : -90,
      magnitude: 1.98,
      constellation: 'Ursa Minor',
      distance: '433 light years'
    },
    {
      name: 'Betelgeuse',
      azimuth: (siderealTime + 85) % 360,
      altitude: Math.max(-20, 40 - Math.abs(latitude - 7)),
      magnitude: 0.42,
      constellation: 'Orion',
      distance: '548 light years'
    }
  ];
}

export function getSatellites(latitude, longitude, date) {
  const minute = date.getMinutes();
  const baseAzimuth = (minute * 6) % 360;
  
  return [
    {
      name: 'ISS (International Space Station)',
      azimuth: baseAzimuth,
      altitude: Math.max(-10, 70 * Math.sin(minute * Math.PI / 30)),
      distance: 420,
      velocity: '7.66 km/s',
      nextPass: getNextPassTime(date, 93),
      type: 'Space Station'
    },
    {
      name: 'Hubble Space Telescope',
      azimuth: (baseAzimuth + 90) % 360,
      altitude: Math.max(-10, 60 * Math.sin((minute + 15) * Math.PI / 30)),
      distance: 540,
      velocity: '7.59 km/s',
      nextPass: getNextPassTime(date, 97),
      type: 'Observatory'
    },
    {
      name: 'Tiangong Space Station',
      azimuth: (baseAzimuth + 180) % 360,
      altitude: Math.max(-10, 65 * Math.sin((minute + 30) * Math.PI / 30)),
      distance: 390,
      velocity: '7.68 km/s',
      nextPass: getNextPassTime(date, 91),
      type: 'Space Station'
    }
  ];
}

function getNextPassTime(currentDate, orbitalPeriod) {
  const nextPass = new Date(currentDate.getTime() + orbitalPeriod * 60000);
  return nextPass.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}