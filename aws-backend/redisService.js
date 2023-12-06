const Redis = require("ioredis");
const redisConfig = require("./redisConfig");
const host = "whiteboardcache-q7d88o.serverless.use1.cache.amazonaws.com";
const port = 6379;
// Initialize Redis client
const redisClient = new Redis({ host, port });

const storeMessageInRedis = async (key, message) => {
  try {
    await redis.set(key, JSON.stringify(message));
    console.log(`Message stored in Redis with key: ${key}`);
  } catch (err) {
    console.error("Error storing message in Redis:", err);
    throw err; // Rethrow the error for caller to handle
  }
};

//this is the function that gets the message from redis
const getMessageFromRedis = async (key) => {
  try {
    const message = await redis.get(key);
    return message ? JSON.parse(message) : null;
  } catch (err) {
    console.error("Error retrieving message from Redis:", err);
    throw err;
  }
};

module.exports = { storeMessageInRedis, getMessageFromRedis };
