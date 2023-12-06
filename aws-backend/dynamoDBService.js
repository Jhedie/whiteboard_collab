const AWS = require("aws-sdk");
AWS.config.update({ region: "YOUR_REGION" });
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const tableName = "cloudMessagesV2";

const saveBoardState = async (boardId, boardState) => {
  const params = {
    TableName: tableName,
    Item: {
      boardId,
      boardState,
      lastUpdated: new Date().toISOString(),
    },
  };
  return dynamoDB.put(params).promise();
};

module.exports = { saveBoardState };
