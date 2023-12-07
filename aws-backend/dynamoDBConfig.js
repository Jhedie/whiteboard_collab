const dynamoDBConfig = {
  accessKeyId: process.env.DYNAMODB_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.DYNAMODB_AWS_SECRET_ACCESS_KEY,
  region: process.env.DYNAMODB_AWS_REGION,
}; // Default Redis port is 6379
//   password: process.env.ELASTICACHE_REDIS_PASSWORD, // Password, if your ElastiCache Redis is password-protected
// Add other configuration parameters as needed
module.exports = dynamoDBConfig;
