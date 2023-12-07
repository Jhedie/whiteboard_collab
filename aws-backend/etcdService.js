const { Etcd3 } = require("etcd3");
const client = new Etcd3({
  hosts: "http://Etcd:2379",
});
async function saveBoard(boards, boardId) {
  console.log("saving board to etcd");
  await client.put(boardId).value(JSON.stringify(boards[boardId]));
}

async function load() {
  console.log("loading from etcd");
  const prefix = "board-";
  const keys = await client.getAll().prefix(prefix).keys();
  const boards = {};
  for (const key of keys) {
    const boardId = key.replace(prefix, "");
    const boardData = JSON.parse(await client.get(key));
    boards[boardId] = boardData;
    console.log("load", { boardId });
  }
  return boards;
}

async function fetchAllFromEtcd() {
  const keys = await client.getAll().keys();
  const data = {};
  for (const key of keys) {
    const value = await etcdClient.get(key).string();
    data[key] = JSON.parse(value);
  }
  return data;
}

module.exports = { saveBoard, load };
