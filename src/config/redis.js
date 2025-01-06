import redis from 'redis';
import { REDIS_HOST, REDIS_PORT } from './env.js'; 

const client = redis.createClient({
    host: REDIS_HOST,  
    port: REDIS_PORT,         
});

client.on('error', (err) => {
    console.log('Redis error: ', err);
});

export default client;
