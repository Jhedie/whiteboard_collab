const { Etcd3 } = require("etcd3");
const client = new Etcd3({
  hosts: "http://Etcd:2379",
});
async function saveBoard(boards, boardId) {
  console.log("saveBoard to etcd");
  // await client.put("foo").d("bar");

  // const fooValue = await client.get("foo").string();
  // console.log("foo was:", fooValue);

  // const allFValues = await client.getAll().prefix("f").keys();
  // console.log('all our keys starting with "f":', allFValues);

  // await client.delete().all();

  // const allF2Values = await client.getAll().prefix("f").keys();
  // console.log('all our keys starting with "f":', allF2Values);

  await client.put(boardId).value(JSON.stringify(boards[boardId]));

  // console.log("saveBoard", { boardId });
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

module.exports = { saveBoard, load };
