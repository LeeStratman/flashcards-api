const mongoose = require("mongoose");
const config = require("config");

async function clearDB(connection) {
  for (const hash in connection.collections) {
    await connection.collections[hash].deleteMany();
  }
}

const isDisconnected = (connection) => {
  return connection.readyState === 0 ? true : false;
};

/**
 * Runs a function before each of the tests in a file runs.
 */
beforeEach(async (done) => {
  if (isDisconnected(mongoose.connection)) {
    try {
      await mongoose.connect(config.get("mongoURI"), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      });
      await clearDB(mongoose.connection);
    } catch (e) {
      console.log("connection error");
      console.error(e);
      throw e;
    }
  } else {
    await clearDB(mongoose.connection);
  }
  done();
});

afterEach(async (done) => {
  await clearDB(mongoose.connection);
  await mongoose.disconnect();
  return done();
});

afterAll((done) => {
  return done();
});
