const connectDB = require("./startup/db");
const express = require("express");
const app = express();
const collections = require("./routes/collections");
const flashcards = require("./routes/flashcards");
const errorHandler = require("./errorHandler");

connectDB();

app.use(express.json());
app.use("/api/collections", collections);
app.use("/api/collections/", flashcards);
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
