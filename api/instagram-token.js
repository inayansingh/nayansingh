// Vercel Serverless Function — Instagram Token Exchange
// POST /api/instagram-token
// Body: { code, redirectUri }
// Returns: { accessToken, expiresIn }
//
// Required env vars in Vercel dashboard:
//   INSTAGRAM_APP_ID      → Facebook App ID
//   INSTAGRAM_APP_SECRET  → Facebook App Secret

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { code, redirectUri } = req.body || {};
  if (!code || !redirectUri) {
    return res.status(400).json({ error: 'Missing code or redirectUri' });
  }

  const APP_ID     = process.env.INSTAGRAM_APP_ID;
  const APP_SECRET = process.env.INSTAGRAM_APP_SECRET;

  if (!APP_ID || !APP_SECRET) {
    return res.status(500).json({
      error: 'Instagram App credentials not configured. Add INSTAGRAM_APP_ID and INSTAGRAM_APP_SECRET to Vercel environment variables.'
    });
  }

  try {
    // Step 1: Exchange code for short-lived token
    const tokenRes = await fetch(
      `https://graph.facebook.com/v21.0/oauth/access_token` +
      `?client_id=${APP_ID}` +
      `&client_secret=${APP_SECRET}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&code=${code}`
    );
    const tokenData = await tokenRes.json();
    if (tokenData.error) throw new Error(tokenData.error.message);

    // Step 2: Exchange for long-lived token (60 days)
    const longTokenRes = await fetch(
      `https://graph.facebook.com/v21.0/oauth/access_token` +
      `?grant_type=fb_exchange_token` +
      `&client_id=${APP_ID}` +
      `&client_secret=${APP_SECRET}` +
      `&fb_exchange_token=${tokenData.access_token}`
    );
    const longToken = await longTokenRes.json();
    if (longToken.error) throw new Error(longToken.error.message);

    return res.status(200).json({
      accessToken: longToken.access_token,
      expiresIn: longToken.expires_in,  // seconds
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
