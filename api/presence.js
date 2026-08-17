import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();
const HEARTBEAT_WINDOW_SECONDS = 30; // "active" if pinged in the last 30s

export default async function handler(req, res) {
  try {
    const visitorId = req.body?.visitorId || req.query?.visitorId;
    if (!visitorId) {
      return res.status(400).json({ error: 'Missing visitorId' });
    }

    const now = Date.now();
    const cutoff = now - HEARTBEAT_WINDOW_SECONDS * 1000;

    await redis.zadd('active_visitors', { score: now, member: visitorId });
    await redis.zremrangebyscore('active_visitors', 0, cutoff);
    const count = await redis.zcard('active_visitors');

    return res.status(200).json({ count });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to update presence' });
  }
}