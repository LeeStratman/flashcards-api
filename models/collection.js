const mongoose = require("mongoose");
const { schema } = require("./flashcard");

const collectionSchema = mongoose.Schema({
  name: { type: String, required: true },
  flashcards: [schema],
});

const Collection = mongoose.model("Collection", collectionSchema);

module.exports = Collection;
