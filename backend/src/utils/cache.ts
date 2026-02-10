import { createClient } from 'redis';

let redisClient: any = null;

try {
    redisClient = createClient({
        url: process.env.REDIS_URL || 'redis://localhost:6379'
    });

    redisClient.on('error', (err: any) =>
        console.log('Redis Error (ignored):', err.message)
    );

    redisClient.connect()
        .then(() => console.log('Redis connected'))
        .catch(() => console.log('Redis not available, running without cache'));
} catch {
    console.log('Redis disabled');
}

export default redisClient;
