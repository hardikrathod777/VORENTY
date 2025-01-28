const Redis = require('ioredis');

const redis = new Redis({
    host: 'redis-11577.c330.asia-south1-1.gce.redns.redis-cloud.com',
    port: 11577,
    password: 'yixFfHbZBUduULhgkoqNYGucin9R1Mhf',
});

redis.on('connect', () => {
    console.log("Redis connected");
});

redis.on('error', (err) => {
    console.error('Redis connection error:', err);
});

module.exports = redis;