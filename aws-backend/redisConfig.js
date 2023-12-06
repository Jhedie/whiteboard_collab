const redisConfig = {
  host: process.env.ELASTICACHE_REDIS_ENDPOINT, // Your ElastiCache Redis endpoint
  port: process.env.ELASTICACHE_REDIS_PORT || 6379, // Default Redis port is 6379
  password: process.env.ELASTICACHE_REDIS_PASSWORD, // Password, if your ElastiCache Redis is password-protected
  // Add other configuration parameters as needed
};
