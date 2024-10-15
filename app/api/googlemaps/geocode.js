export default async function handler(req, res) {
  const { address } = req.query;
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  
  if (!apiKey) {
    console.error('Google Maps API key is missing');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      console.error('Google Maps API error:', data);
      return res.status(response.status).json({ error: 'Error from Google Maps API', details: data });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching geocode data:', error);
    res.status(500).json({ error: 'Error fetching geocode data' });
  }
}