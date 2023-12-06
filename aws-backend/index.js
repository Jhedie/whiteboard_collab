const express = require("express");
const { saveBoard } = require("./etcdService");
const cors = require("cors");

const bodyParser = require("body-parser");

const app = express();
app.use(
  cors({
    origin: "http://Frontend:3000",
  })
); // Add this line
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
