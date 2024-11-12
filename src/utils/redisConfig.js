const { createClient } = require('redis');

console.log('REDIS URL is ->', process.env.REDIS_HOST);

// Initialize Redis client
const redisClient = createClient({
  password: process.env.REDIS_SECRET,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

// Connect to Redis
redisClient
  .connect(() => console.log('Connected to our redis instance!'))
  .catch((error) => console.error('Redis connection error:', error));

module.exports = redisClient;