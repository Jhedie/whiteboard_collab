const express = require("express");
const { sendMessageToQueue } = require("./sqsClient");
const { storeMessageInRedis } = require("./redisService");

const bodyParser = require("body-parser");

const app = express();
// parse the json object
app.use(bodyParser.json());

app.get("/load", (req, res) => {
  storeMessageInRedis("boardState", { boardState: "test" });
  // getting board state from redis
  // boardStateFromRedis = getMessageFromRedis();
  res.send(boardStateFromRedis);
});

app.post("/update-whiteboard", async (req, res) => {
  // const whiteboardData = req.body; // Assume this contains whiteboard state
  // await sendMessageToSQS(whiteboardData); // Function defined earlier
  // res.send("Update sent to SQS");
});

app.post("/saveBoard", async (req, res) => {
  // const whiteboardData = req.body; // Assume this contains whiteboard state
  // console.log("Incoming saveBoard", whiteboardData);
  console.log("Incoming saveBoard");
  storeMessageInRedis();
  // await sendMessageToQueue(whiteboardData);
  // // Function defined earlier
  // res.send("Update saved to DynamoDB");
});
const port = 3002;
app.listen(port, () => console.log(`Server running on port ${port}`));
