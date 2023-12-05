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
