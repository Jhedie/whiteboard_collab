const Redis = require("ioredis");

const client = new Redis({
  host: "whiteboardstore-q7d88o.serverless.use1.cache.amazonaws.com",
  port: 6379,
  connectTimeout: 2000,
  lazyConnect: true,
  maxRetriesPerRequest: 2,
  reconnectOnError: function (err) {
    if (err.message.startsWith("READONLY")) {
      return true;
    }
  },
  retryStrategy: (times) => 2000,
});

// client
//   .on("error", (e) => {
//     console.log(e);
//     client.disconnect();
//   })
//   .on("close", () => {
//     client.disconnect();
//   });

const getCachedDataByKey = async () => {
  console.log("object");
  let cachedData = null;
  if (client.status !== "ready" && client.status !== "wait") {
    try {
      await client.connect();
      await client.set(key, JSON.stringify(value), "EX", EX);
      console.log("setDataToCache TRY Done");
    } catch (error) {
      console.log("getCachedDataByKey CATCH CONNECT");
      console.log(error);
    }
  }

  //   if (client.status === "ready" || client.status === "wait") {
  //     try {
  //       cachedData = await client.get(key);
  //     } catch (error) {
  //       console.log("getCachedDataByKey CATCH GET");
  //       console.log(error);
  //     }
  //   }

  return JSON.parse(cachedData);
};

// const setDataToCache = async (key, value, EX = 24 * 60 * 60) => {
//   if (client.status !== "ready" && client.status !== "wait") {
//     try {
//       await client.connect();
//     } catch (error) {
//       console.log("setDataToCache CATCH CONNECT");
//       console.log(error);
//     }
//   }

//   if (client.status === "ready" || client.status === "wait") {
//     try {
//       await client.set(key, JSON.stringify(value), "EX", EX);
//       console.log("setDataToCache TRY Done");
//     } catch (error) {
//       console.log("setDataToCache CATCH");
//       console.log(error);
//     }
//   }
// };

module.exports = {
  getCachedDataByKey,
};
