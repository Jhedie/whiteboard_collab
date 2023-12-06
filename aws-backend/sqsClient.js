const { SQSClient, SendMessageCommand } = require("@aws-sdk/client-sqs");
const { configObject } = require("./credentials");

// Create an SQS service object
const sqsClient = new SQSClient(configObject);

// URL of the queue
const queueUrl =
  "https://sqs.us-east-1.amazonaws.com/274813639254/WhiteboardMessagingQueue.fifo";

const sendMessageToQueue = async (boardState) => {
  try {
    const command = new SendMessageCommand({
      MessageBody: JSON.stringify(boardState),
      QueueUrl: queueUrl,
      MessageGroupId: "messageDefaultGroup", // Add this line
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

exports.handler = async (event) => {
  const boardState = JSON.parse(event.body);
  await sendMessageToQueue(boardState);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Message sent to SQS" }),
  };
};
