const { Etcd3 } = require("etcd3");
const client = new Etcd3();

async function saveBoard() {
  console.log("saveBoard to etcd");
  await client.put("foo").value("bar");

  const fooValue = await client.get("foo").string();
  console.log("foo was:", fooValue);

  const allFValues = await client.getAll().prefix("f").keys();
  console.log('all our keys starting with "f":', allFValues);

  await client.delete().all();

  const allF2Values = await client.getAll().prefix("f").keys();
  console.log('all our keys starting with "f":', allF2Values);

  // if (!boardId || !boards[boardId]) return;

  // await client.put(boardId).value(JSON.stringify(boards[boardId]));

  // console.log("saveBoard", { boardId });
}

module.exports = { saveBoard };
