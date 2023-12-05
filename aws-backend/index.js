const express = require("express");
const { sendBoardStateToSQS } = require("./sqsClient");
const bodyParser = require("body-parser");

const app = express();
// parse the json object
app.use(bodyParser.json());

app.get("/load", (req, res) => {
  //print out contents of the data from req
  console.log(req.params);
  res.send("Hello from Express!");
});

app.post("/update-whiteboard", async (req, res) => {
  const whiteboardData = req.body; // Assume this contains whiteboard state
  await sendMessageToSQS(whiteboardData); // Function defined earlier
  res.send("Update sent to SQS");
});

app.post("/saveBoard", async (req, res) => {
  const whiteboardData = req.body; // Assume this contains whiteboard state
  console.log("saveBoard", whiteboardData);
  // save whiteboard state in sqs
  await sendBoardStateToSQS(whiteboardData); // Function defined earlier
  res.send("Update saved to DynamoDB");
});
const port = 3002;
app.listen(port, () => console.log(`Server running on port ${port}`));
