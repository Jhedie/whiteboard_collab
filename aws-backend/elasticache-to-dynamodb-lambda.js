const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const Redis = require("ioredis");

exports.handler = async () => {
  const redis = new Redis({
    host: "your-elasticache-host",
    port: your - elasticache - port,
  });

  // Retrieve data from ElastiCache
  const cachedData = await redis.get("your-key");
  if (!cachedData) return;

  // Update DynamoDB
  await dynamoDb
    .put({
      TableName: "YourDynamoDBTable",
      Item: JSON.parse(cachedData),
    })
    .promise();

  return "Data synced to DynamoDB";
};
