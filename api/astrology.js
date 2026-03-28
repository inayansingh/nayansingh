export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { date, time, city } = req.body;
    
    // We expect date as YYYY-MM-DD and time as HH:MM
    let datetimeString = `${date}T${time}:00+05:30`;
    let birthDate = new Date(datetimeString);
    if (isNaN(birthDate.getTime())) {
       birthDate = new Date(); // fallback to now if invalid
    }

    // 1. Convert City String to Coordinates (using free Nominatim API)
    let lat = 28.6139;
    let lon = 77.2090; // Default to New Delhi
    if (city) {
      try {
        const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&limit=1`, {
          headers: { 'User-Agent': 'PrekshaAstrologyApp/1.0' }
        });
        const geoData = await geoRes.json();
        if (geoData && geoData.length > 0) {
          lat = parseFloat(geoData[0].lat);
          lon = parseFloat(geoData[0].lon);
        }
      } catch (e) {
        console.error("Geocoding failed, falling back to Delhi", e);
      }
    }

    // Dynamic import to avoid breaking standard environments if module lacks common js
    const { generateRasiChart, getCompactAnalysisContext } = await import('vedic-calc');

    // 2. Calculate accurate local ephemeris using Swiss Ephemeris wrapper
    const chart = generateRasiChart(birthDate, lat, lon, "Asia/Kolkata");
    
    // 3. Generate an AI ready context with Dashas, Transits, Yogas
    // We pass today's date so it calculates the *current active* transits and dashas
    const compactContext = getCompactAnalysisContext(chart, new Date(), {
      transitPlanets: ["Saturn", "Jupiter", "Rahu", "Ketu", "Sun", "Moon"],
      maxBeneficYogas: 3,
      maxChallengingYogas: 2,
      includeBirthLocation: false
    });

    const ephemerisString = `MATHEMATICAL EPHEMERIS FACTS FOR ${date}:
Please base all astrological predictions strictly on this precise structural data:
${JSON.stringify(compactContext, null, 2)}`;

    return res.status(200).json({ ephemeris: ephemerisString });

  } catch (error) {
    console.error("Local Ephemeris Error:", error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
