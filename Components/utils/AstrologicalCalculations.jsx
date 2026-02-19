// Astrological calculation utilities

export function calculatePlanetaryPositions(latitude, longitude, date) {
  // Simplified planetary position calculations
  // In production, would use Swiss Ephemeris or similar library
  
  const daysSinceEpoch = (date - new Date(2000, 0, 1)) / 86400000;
  
  const nakshatras = [
    'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
    'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni',
    'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha',
    'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha', 'Uttara Ashadha',
    'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada',
    'Uttara Bhadrapada', 'Revati'
  ];

  const planets = [
    {
      name: 'Sun',
      sanskrit: 'Surya',
      symbol: '☉',
      color: '#FFD700',
      meanMotion: 0.9856, // degrees per day
      epoch: 280.0
    },
    {
      name: 'Moon',
      sanskrit: 'Chandra',
      symbol: '☽',
      color: '#F0F0F0',
      meanMotion: 13.176, // degrees per day
      epoch: 125.0
    },
    {
      name: 'Mars',
      sanskrit: 'Mangala',
      symbol: '♂',
      color: '#FF4500',
      meanMotion: 0.524,
      epoch: 355.0
    },
    {
      name: 'Mercury',
      sanskrit: 'Budha',
      symbol: '☿',
      color: '#BDBDBD',
      meanMotion: 1.383,
      epoch: 252.0
    },
    {
      name: 'Jupiter',
      sanskrit: 'Guru',
      symbol: '♃',
      color: '#D2B48C',
      meanMotion: 0.083,
      epoch: 34.0
    },
    {
      name: 'Venus',
      sanskrit: 'Shukra',
      symbol: '♀',
      color: '#F0E68C',
      meanMotion: 1.602,
      epoch: 181.0
    },
    {
      name: 'Saturn',
      sanskrit: 'Shani',
      symbol: '♄',
      color: '#F5DEB3',
      meanMotion: 0.033,
      epoch: 50.0
    }
  ];

  return planets.map(planet => {
    // Calculate ecliptic longitude (simplified)
    let longitude = (planet.epoch + planet.meanMotion * daysSinceEpoch) % 360;
    if (longitude < 0) longitude += 360;

    // Calculate Nakshatra
    const nakshatraIndex = Math.floor((longitude / 360) * 27);
    const nakshatra = nakshatras[nakshatraIndex];

    return {
      ...planet,
      longitude,
      nakshatra,
      retrograde: false // Would need proper calculation
    };
  });
}

export function calculateAscendant(latitude, longitude, date) {
  // Simplified ascendant calculation
  // In reality, needs sidereal time and proper obliquity calculations
  
  const hours = date.getHours() + date.getMinutes() / 60;
  const lst = (hours + longitude / 15) % 24; // Local Sidereal Time approximation
  
  const ascendantDegree = (lst * 15) % 360;
  const sign = Math.floor(ascendantDegree / 30);
  
  const signs = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];

  return {
    sign: signs[sign],
    degree: ascendantDegree % 30
  };
}

export function calculateHouses(latitude, longitude, date, ascendant) {
  // Simplified house calculation using Placidus system
  const houses = [];
  
  for (let i = 0; i < 12; i++) {
    const houseCusp = (ascendant + i * 30) % 360;
    houses.push({
      number: i + 1,
      cusp: houseCusp,
      sign: Math.floor(houseCusp / 30)
    });
  }

  return houses;
}