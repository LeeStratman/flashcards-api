const mongoose = require("mongoose");
const config = require("config");

function clearDB() {
  for (var i in mongoose.connection.collections) {
    mongoose.connection.collections[i].deleteMany(function () {});
  }
}

beforeEach(async (done) => {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(config.get("mongoURI"), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      clearDB();
    } catch (e) {
      console.log("connection error");
      console.error(e);
      throw e;
    }
  } else {
    clearDB();
  }
  done();
});

afterEach(async (done) => {
  clearDB();
  await mongoose.disconnect();
  return done();
});

afterAll((done) => {
  return done();
});
