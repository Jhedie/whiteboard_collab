const Redis = require("ioredis");
const redisConfig = require("./config/redisConfig"); // Assuming you have a config file for Redis

// Initialize Redis client
const redis = new Redis(redisConfig);

const storeMessage = async (key, message) => {
  try {
    await redis.set(key, JSON.stringify(message));
    console.log(`Message stored in Redis with key: ${key}`);
  } catch (err) {
    console.error("Error storing message in Redis:", err);
    throw err; // Rethrow the error for caller to handle
  }
};

const getMessage = async (key) => {
  try {
    const message = await redis.get(key);
    return message ? JSON.parse(message) : null;
  } catch (err) {
    console.error("Error retrieving message from Redis:", err);
    throw err;
  }
};

module.exports = { storeMessage, getMessage };
