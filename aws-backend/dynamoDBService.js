const cron = require("node-cron");
const { load } = require("./etcdService");

const AWS = require("aws-sdk");

// Configure AWS with credentials from environment variables
AWS.config.update({
  accessKeyId: process.env.DYNAMODB_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.DYNAMODB_AWS_SECRET_ACCESS_KEY,
  region: process.env.DYNAMODB_AWS_REGION,
});

const dynamoDB = new AWStest.DynamoDB.DocumentClient();
const tableName = "cloudMessagesV2";

async function writeToDynamoDB(data) {
  await dynamoDB.put(data).promise();
}

async function fetchAllFromDynamoDB() {
  const params = {
    TableName: tableName,
  };
  const data = await dynamoDB.scan(params).promise();
  return data.Items.reduce((acc, item) => {
    acc[item.boardId] = item.boardState;
    return acc;
  }, {});
}

async function writeToEtcd(data) {
  for (const key in data) {
    await etcdClient.put(key).value(JSON.stringify(data[key]));
  }
}

// Schedule the backup process to run every hour
cron.schedule("0 * * * *", async () => {
  const data = await load();
  await writeToDynamoDB(data);
});

// Schedule the restoration process to run every day at 3 AM
cron.schedule("0 3 * * *", async () => {
  const data = await fetchAllFromDynamoDB();
  await writeToEtcd(data);
});
