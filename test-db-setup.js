const mongoose = require("mongoose");
const config = require("config");
const { Collection } = require("./models/collection");

async function clearDB(connection) {
  for (const hash in connection.collections) {
    await connection.collections[hash].deleteMany();
  }
}

const isDisconnected = (connection) => {
  return connection.readyState === 0 ? true : false;
};

beforeAll(async () => {
  if (isDisconnected(mongoose.connection)) {
    try {
      await mongoose.connect(config.get("mongoURI"), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      });
    } catch (e) {
      console.log("connection error");
      console.error(e);
      throw e;
    }
  }
  return await clearDB(mongoose.connection);
});

afterAll(async () => {
  return await mongoose.disconnect();
});

module.exports = clearDB;
