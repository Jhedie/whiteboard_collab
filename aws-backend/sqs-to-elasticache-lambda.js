const Redis = require("ioredis");

exports.handler = async (event) => {
  const redis = new Redis({
    host: "your-elasticache-host",
    port: your - elasticache - port,
  });

  for (const record of event.Records) {
    const messageBody = JSON.parse(record.body);
    // Process message and update ElastiCache
    await redis.set(`your-key`, JSON.stringify(messageBody));
  }

  return `Successfully processed ${event.Records.length} messages.`;
};

// const Redis = require("ioredis");
// const { SQSEvent } = require("aws-lambda");

// // Configure Redis connection parameters
// const redisOptions = {
//   host: process.env.ELASTICACHE_REDIS_HOST,
//   port: process.env.ELASTICACHE_REDIS_PORT || 6379,
//   // Include other options as necessary, like security or connection settings
// };

// // Create a Redis client
// const redisClient = new Redis(redisOptions);

// // AWS Lambda handler function
// exports.handler = async (event) => {
//   console.log(`Received event: ${JSON.stringify(event)}`);

//   // Process each message in the event
//   for (const record of event.Records) {
//     try {
//       // Parse the message body
//       const messageBody = JSON.parse(record.body);

//       // Define a Redis key for the message (modify as needed)
//       const redisKey = `sqs_message:${messageBody.id}`;

//       // Save the message body to Redis
//       await redisClient.set(redisKey, JSON.stringify(messageBody));

//       console.log(`Message saved to Redis with key: ${redisKey}`);
//     } catch (error) {
//       console.error(`Error processing message: ${error.message}`);
//       // Handle the error as needed (e.g., retry, log, etc.)
//     }
//   }

//   console.log(`Successfully processed ${event.Records.length} messages`);
//   // Optionally, close Redis connection if not needed anymore
//   // await redisClient.quit();
// };
