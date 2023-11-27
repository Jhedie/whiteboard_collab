const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const { v1: uuidv1 } = require("uuid");
const PORT = process.env.PORT || 3000;
require('dotenv').config();
app.use(express.static(__dirname + "/public"));
app.get("/board/*", (req, res, next) => {
  res.sendFile(__dirname + "/public/board.html");
});

const AWStest = require('aws-sdk');

// Configure AWS with credentials from environment variables
AWStest.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const dynamoDB = new AWStest.DynamoDB.DocumentClient();
const tableName = 'cloudMessagesV2';

const boards = {};

async function saveBoard(boardId) {
  if (!boardId || !boards[boardId]) return;

  const params = {
    TableName: tableName,
    Item: {
      boardId: boardId,
      data: JSON.stringify(boards[boardId])
    }
  };

  await dynamoDB.put(params).promise();
  console.log('saveBoard', { boardId });
}

async function load() {
  const params = {
    TableName: tableName
  };

  try {
    const data = await dynamoDB.scan(params).promise();
    data.Items.forEach(item => {
      const boardId = item.boardId;
      const boardData = JSON.parse(item.data);
      boards[boardId] = boardData;
      console.log('load', { boardId });
    });
  } catch (err) {
    console.error('Error loading data from DynamoDB:', err);
  }
}
load();

// function for dynamic sorting
function compareValues(key, order = "asc") {
  return function (a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0;
    }

    const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order == "desc" ? comparison * -1 : comparison;
  };
}

function onConnection(socket) {
  const { boardId } = socket.handshake.query;
  let lineHist = [];
  let noteList = {};
  if (boardId && boards[boardId]) {
    lineHist = boards[boardId].lineHist;
    noteList = boards[boardId].noteList;
  }
  socket.join(boardId);
  console.log("onConnection", { id: socket.id, boardId });

  socket.on("createBoard", (data, ack) => {
    const boardId = uuidv1();
    boards[boardId] = {
      lineHist: [],
      noteList: {},
      createdTimestamp: new Date().getTime(),
      boardId,
    };
    ack({ boardId });
    saveBoard(boardId);
  });

  socket.on("load", (data, ack) => {
    if (!boardId || !boards[boardId]) {
      ack({ status: "NOT_FOUND" });
    }
    ack({ status: "OK", ...boards[boardId] });
  });

  socket.on("drawLine", (data) => {
    lineHist.push(data);
    socket.broadcast.to(boardId).emit("drawLine", data);
    saveBoard(boardId);
  });

  socket.on("hideLine", (data) => {
    for (const line of lineHist) {
      if (line.id === data.id) {
        line.hidden = data.hidden;
      }
    }
    io.to(boardId).emit("redraw", boards[boardId]);
    saveBoard(boardId);
  });

  socket.on("updateNote", (data) => {
    noteList[data.id] = { ...noteList[data.id], ...data };
    socket.broadcast.to(boardId).emit("updateNote", noteList[data.id]);
    saveBoard(boardId);
  });

  socket.on("hideNote", (data) => {
    noteList[data.id].hidden = data.hidden;
    io.to(boardId).emit("hideNote", data);
    saveBoard(boardId);
  });

  socket.on("clearBoard", (data, ack) => {
    boards[boardId] = { lineHist: [], noteList: {} };
    ack({ status: "OK" });
    socket.broadcast.to(boardId).emit("clearBoard");
    saveBoard(boardId);
  });

  socket.on("recentBoards", (data, ack) => {
    const list = Object.values(boards);
    ack(
      list
        .filter((b) => b.createdTimestamp)
        .sort(compareValues("createdTimestamp", "desc"))
        .slice(0, 9)
    );
  });
}
io.on("connection", onConnection);

http.listen(PORT, () => console.log("listening on port " + PORT));
