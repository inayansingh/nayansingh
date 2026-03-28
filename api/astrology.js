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

    // 2. Fetch Token from Prokerala Sandbox/Prod
    const clientId = '1655852a-e88d-4bfe-954e-95c13530fb9f';
    const clientSecret = '0LLP8RIAw0BWq5Qtcwk6xQWacI9KqbUbNg3YhAOW';
    
    const tokenBody = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret
    });

    const tokenRes = await fetch('https://api.prokerala.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: tokenBody
    });
    
    if (!tokenRes.ok) {
       throw new Error("Prokerala Auth Failed: " + await tokenRes.text());
    }
    const tokenData = await tokenRes.json();
    const token = tokenData.access_token;

    // 3. Fetch Planet Positions from Prokerala API
    // ISO format: 2004-02-12T15:19:21+05:30
    const isoDateTime = birthDate.toISOString().replace('.000Z', '+00:00'); // simplified UTC representation
    const apiUrl = `https://api.prokerala.com/v2/astrology/planet-position?datetime=${encodeURIComponent(isoDateTime)}&coordinates=${lat},${lon}&ayanamsa=1`;
    
    const astroRes = await fetch(apiUrl, {
      method: 'GET',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      }
    });

    let astroContext = {};
    if (astroRes.ok) {
       const astroData = await astroRes.json();
       astroContext = astroData.data || astroData;
    } else {
       console.error("Prokerala Data Fetch Failed", await astroRes.text());
    }

    const ephemerisString = `MATHEMATICAL EPHEMERIS FACTS FOR ${date}:
Please base all astrological predictions strictly on this precise structural planetary data fetched from Prokerala Astrological API:
${JSON.stringify(astroContext, null, 2)}`;

    return res.status(200).json({ ephemeris: ephemerisString });

  } catch (error) {
    console.error("API Ephemeris Error:", error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
