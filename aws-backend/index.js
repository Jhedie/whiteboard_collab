const express = require("express");
const { saveBoard } = require("./etcdService");

const bodyParser = require("body-parser");

const app = express();
// parse the json object
app.use(bodyParser.json());

app.get("/load", (req, res) => {
  console.log("Incoming load");
});

app.post("/saveBoard", async (req, res) => {
  console.log("Incoming saveBoard");
  saveBoard();
});
const port = 3002;
app.listen(port, () => console.log(`Server running on port ${port}`));
