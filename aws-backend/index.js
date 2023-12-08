const express = require("express");
const { saveBoard, load } = require("./etcdService");
const cors = require("cors");

const bodyParser = require("body-parser");

const boards = {};
const app = express();
app.use(
  cors({
    origin: "http://frontendService:3000",
  })
);
//
// parse the json object
app.use(bodyParser.json());

app.get("/load", (req, res) => {
  console.log("Incoming load");
  load().then((boardsFromEtcd) => {
    boards = boardsFromEtcd;
  });
  res.send(boards);
});

app.post("/saveBoard", async (req, res) => {
  console.log("Incoming saveBoard");
  const boardState = req.body;
  const boardId = boardState.Item.boardId;
  if (!boardId || !boards[boardId]) return;
  else {
    saveBoard(boards, boardState);
  }
  res.send("Saved");
});
const port = 3002;
app.listen(port, () => console.log(`Server running on port ${port}`));
