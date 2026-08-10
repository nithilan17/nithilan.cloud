export default async function handler(req, res) {
  try {
    const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;

    // Exchange the long-lived refresh token for a short-lived access token
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' + Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64'),
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: SPOTIFY_REFRESH_TOKEN,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      return res.status(500).json({ error: 'Failed to refresh token', details: tokenData });
    }

    const { access_token } = tokenData;

    // Fetch the most recently played track
    const recentResponse = await fetch(
      'https://api.spotify.com/v1/me/player/recently-played?limit=1',
      { headers: { Authorization: `Bearer ${access_token}` } }
    );

    const recentData = await recentResponse.json();

    if (!recentResponse.ok) {
      return res.status(500).json({ error: 'Failed to fetch recently played', details: recentData });
    }

    const item = recentData.items?.[0];

    if (!item) {
      return res.status(200).json({ track: null });
    }

    const track = {
      name: item.track.name,
      artist: item.track.artists.map((a) => a.name).join(', '),
      albumArt: item.track.album.images?.[0]?.url || null,
      url: item.track.external_urls.spotify,
      playedAt: item.played_at,
    };

    // Cache at the edge for 60s so you don't hammer Spotify's API on every visitor
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
    return res.status(200).json({ track });
  } catch (err) {
    return res.status(500).json({ error: 'Server error', details: err.message });
  }
}
