const AWS = require("aws-sdk");

// Set the region
AWS.config.update({ region: "us-east-1" });

// Create an SQS service object
const sqs = new AWS.SQS({});

// URL of the queue
const queueUrl =
  "https://sqs.us-east-1.amazonaws.com/274813639254/WhiteboardMessagingQueue.fifo";

const boards = {};

// function to send messages to the queue
async function sendBoardStateToSQS(boardState) {
  if (!boardState || !boards[boardState]) return;
  const params = {
    QueueUrl: queueUrl,
    MessageBody: JSON.stringify(boardState),
  };

  sqs.sendMessage(params, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.MessageId);
    }
  });
}
module.exports = { sendBoardStateToSQS };
