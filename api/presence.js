import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();
const HEARTBEAT_WINDOW_SECONDS = 30; // "active" if pinged in the last 30s

export default async function handler(req, res) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const visitorId = req.body?.visitorId || req.query?.visitorId;
    if (
      typeof visitorId !== 'string' ||
      !/^[a-zA-Z0-9_-]{1,128}$/.test(visitorId)
    ) {
      return res.status(400).json({ error: 'Invalid visitorId' });
    }

    const now = Date.now();
    const cutoff = now - HEARTBEAT_WINDOW_SECONDS * 1000;

    await redis.zadd('active_visitors', { score: now, member: visitorId });
    await redis.zremrangebyscore('active_visitors', 0, cutoff);
    const count = await redis.zcard('active_visitors');

    return res.status(200).json({ count });
  } catch (err) {
    console.error('Failed to update presence', err);
    return res.status(500).json({ error: 'Failed to update presence' });
  }
}
