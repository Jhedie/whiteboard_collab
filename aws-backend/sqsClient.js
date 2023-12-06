const { SQSClient, SendMessageCommand } = require("@aws-sdk/client-sqs");
const { configObject } = require("./credentials");

// Create an SQS service object
const sqsClient = new SQSClient(configObject);

// URL of the queue
const queueUrl =
  "https://sqs.us-east-1.amazonaws.com/274813639254/WhiteboardMessagingQueue.fifo";

const sendMessageToQueue = async (body) => {
  // const params = {
  //   MessageBody: {body},
  //   QueueUrl: queueUrl,
  // };
  try {
    const command = new SendMessageCommand({
      MessageBody: body,
      QueueUrl: queueUrl,
      MessageGroupId: "messageGroup2", // Add this line
      MessageDeduplicationId: Math.random().toString(36).substring(2, 15), // Add this line
      MessageAttributes: {
        OrderdID: { DataType: "String", StringValue: "4421x" },
      },
    });
    const result = await sqsClient.send(command);
    console.log("Success", result.MessageId);
  } catch (err) {
    console.log("Error", err);
  }
};

// Set the region
//AWS.config.update({ region: "us-east-1" });

const boards = {};

// function to send messages to the queue
// async function sendBoardStateToSQS(boardState) {
//   if (!boardState || !boards[boardState]) return;
//   const params = {
//     QueueUrl: queueUrl,
//     MessageBody: JSON.stringify(boardState),
//   };

//   sqs.sendMessage(params, function (err, data) {
//     if (err) {
//       console.log("Error", err);
//     } else {
//       console.log("Success");
//     }
//   });
// }

module.exports = { sendMessageToQueue };
